import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from './store';
import type { Alarm } from '@/types';

describe('Data and State Logic Rules', () => {
  beforeEach(() => {
    // Reset store before each test if needed
    // Assuming useAppStore uses a simple state that we can overwrite
    useAppStore.setState({
      alarms: [
        {
          id: 'alarm-1',
          createdAt: new Date().toISOString(),
          severity: 'warning',
          parameter: 'Beda Tekanan',
          reason: 'Penyimpangan > 15%',
          durationSeconds: 10,
          qualityFlag: 'valid',
          status: 'unconfirmed',
        },
        {
          id: 'alarm-2',
          createdAt: new Date().toISOString(),
          severity: 'critical',
          parameter: 'Putaran Turbin',
          reason: 'Over-speed terdeteksi',
          durationSeconds: 45,
          qualityFlag: 'valid',
          status: 'unconfirmed',
        },
        {
          id: 'alarm-3',
          createdAt: new Date().toISOString(),
          severity: 'warning',
          parameter: 'Kekeruhan',
          reason: 'Melewati ambang batas',
          durationSeconds: 120,
          qualityFlag: 'drift_suspected',
          status: 'unconfirmed',
        }
      ],
      auditLog: [],
      activeModel: 'Baseline',
    });
  });

  describe('Alarm Persistence & Quality Flag Rule', () => {
    const getRecommendations = (alarm: Alarm) => {
      // Alarm recommendation hanya aktif jika qualityFlag === 'valid' DAN durationSeconds > 30 (persistence window)
      if (alarm.qualityFlag !== 'valid') return null;
      if (alarm.durationSeconds <= 30) return null;
      return 'Periksa komponen terkait segera';
    };

    it('should NOT provide recommendation if duration <= 30s even if valid', () => {
      const state = useAppStore.getState();
      const alarm = state.alarms.find(a => a.id === 'alarm-1')!;
      expect(getRecommendations(alarm)).toBeNull();
    });

    it('should provide recommendation if duration > 30s AND valid', () => {
      const state = useAppStore.getState();
      const alarm = state.alarms.find(a => a.id === 'alarm-2')!;
      expect(getRecommendations(alarm)).toBe('Periksa komponen terkait segera');
    });

    it('should NOT provide recommendation if quality flag is not valid even if duration > 30s', () => {
      const state = useAppStore.getState();
      const alarm = state.alarms.find(a => a.id === 'alarm-3')!;
      expect(getRecommendations(alarm)).toBeNull();
    });
  });

  describe('Audit Log Enforcement', () => {
    it('should add audit log entry when model is changed', () => {
      const { setActiveModel } = useAppStore.getState();
      
      setActiveModel('Hydro-Twin PINN', 'op-test-1');
      
      const { auditLog, activeModel } = useAppStore.getState();
      expect(activeModel).toBe('Hydro-Twin PINN');
      expect(auditLog.length).toBe(1);
      expect(auditLog[0]!.userId).toBe('op-test-1');
      expect(auditLog[0]!.action).toBe('Ubah Model Aktif');
      expect(auditLog[0]!.category).toBe('model');
    });

    it('should add audit log entry when threshold is updated', () => {
      const { updateThreshold } = useAppStore.getState();
      
      updateThreshold('flow', 3.0, 7.0, 'op-test-2');
      
      const { auditLog, thresholds } = useAppStore.getState();
      expect(thresholds.flow!.min).toBe(3.0);
      expect(thresholds.flow!.max).toBe(7.0);
      expect(auditLog.length).toBe(1);
      expect(auditLog[0]!.userId).toBe('op-test-2');
      expect(auditLog[0]!.action).toBe('Ubah Threshold');
      expect(auditLog[0]!.category).toBe('threshold');
    });
  });
});
