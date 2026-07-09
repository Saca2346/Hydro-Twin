import { create } from 'zustand';
import type { DataSource, Alarm, AuditLogEntry } from '@/types';
import { seedData, mockAlarms } from '@/mocks/simulation';

interface AppState {
  // Data source
  currentSource: DataSource;
  setCurrentSource: (source: DataSource) => void;

  // Connection
  isConnected: boolean;
  lastSync: Date;
  setConnected: (connected: boolean) => void;

  // Asset
  assetName: string;

  // Sidebar
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  // Alarms
  alarms: Alarm[];
  confirmAlarm: (id: string, operatorId: string, note?: string) => void;
  markFalseAlarm: (id: string, operatorId: string, note?: string) => void;

  // Audit log
  auditLog: AuditLogEntry[];
  addAuditEntry: (entry: Omit<AuditLogEntry, 'id' | 'timestamp'>) => void;

  // Settings
  activeModel: string;
  setActiveModel: (model: string, operatorId: string) => void;
  thresholds: Record<string, { min: number; max: number }>;
  updateThreshold: (sensorId: string, min: number, max: number, operatorId: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentSource: 'simulation',
  setCurrentSource: (source) => set({ currentSource: source }),

  isConnected: true,
  lastSync: new Date(),
  setConnected: (connected) => set({ isConnected: connected }),

  assetName: seedData.asset.name,

  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  alarms: mockAlarms,
  confirmAlarm: (id, operatorId, note) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'confirmed' as const,
              operatorValidation: {
                operatorId,
                validatedAt: new Date().toISOString(),
                note,
              },
            }
          : a
      ),
    })),
  markFalseAlarm: (id, operatorId, note) =>
    set((state) => ({
      alarms: state.alarms.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'false_alarm' as const,
              operatorValidation: {
                operatorId,
                validatedAt: new Date().toISOString(),
                note,
              },
            }
          : a
      ),
    })),

  auditLog: [],
  addAuditEntry: (entry) =>
    set((state) => ({
      auditLog: [
        {
          ...entry,
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
        },
        ...state.auditLog,
      ],
    })),

  activeModel: 'Hydro-Twin PINN',
  setActiveModel: (model, operatorId) =>
    set((state) => {
      const entry: Omit<AuditLogEntry, 'id' | 'timestamp'> = {
        userId: operatorId,
        action: 'Ubah Model Aktif',
        details: `Model diubah dari ${state.activeModel} ke ${model}`,
        category: 'model',
      };
      return {
        activeModel: model,
        auditLog: [
          { ...entry, id: `audit-${Date.now()}`, timestamp: new Date().toISOString() },
          ...state.auditLog,
        ],
      };
    }),

  thresholds: {
    pin: { min: 2.0, max: 3.0 },
    pout: { min: 1.5, max: 2.2 },
    flow: { min: 4.0, max: 6.0 },
    rpm: { min: 1000, max: 1500 },
  },
  updateThreshold: (sensorId, min, max, operatorId) =>
    set((state) => {
      const old = state.thresholds[sensorId];
      const entry: Omit<AuditLogEntry, 'id' | 'timestamp'> = {
        userId: operatorId,
        action: 'Ubah Threshold',
        details: `Threshold ${sensorId} diubah dari [${old?.min}-${old?.max}] ke [${min}-${max}]`,
        category: 'threshold',
      };
      return {
        thresholds: {
          ...state.thresholds,
          [sensorId]: { min, max },
        },
        auditLog: [
          { ...entry, id: `audit-${Date.now()}`, timestamp: new Date().toISOString() },
          ...state.auditLog,
        ],
      };
    }),
}));
