import type { SensorReading, Alarm, Prediction, DataSource } from '@/types';
import { mockSensorReadings, mockAlarms, mockPredictions } from '@/mocks/simulation';

// Simulated latency in ms
const SIMULATION_DELAY = 800;

function delay<T>(data: T, latency = SIMULATION_DELAY, errorRate = 0): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < errorRate) {
        reject(new Error('Network error: Simulasi gagal mengambil data dari server.'));
      } else {
        resolve(data);
      }
    }, latency);
  });
}

export const api = {
  fetchSensorData: async (source: DataSource = 'simulation'): Promise<SensorReading[]> => {
    // Return mock data for now, filtered by source
    return delay(mockSensorReadings.filter(s => s.source === source));
  },

  fetchPredictions: async (source: DataSource = 'simulation'): Promise<Prediction[]> => {
    return delay(mockPredictions.filter(p => p.source === source));
  },

  fetchAlarms: async (): Promise<Alarm[]> => {
    return delay(mockAlarms);
  },

  updateThreshold: async (_sensorId: string, _min: number, _max: number): Promise<boolean> => {
    // Simulasi update ke backend
    return delay(true, 500, 0.05); // 5% chance of failure
  },

  exportHistoryCSV: async (data: any[], filename = 'history_export.csv') => {
    return delay(true, 300).then(() => {
      if (!data.length) return false;
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => 
        Object.values(row).map(val => `"${val}"`).join(',')
      ).join('\n');
      
      const csvContent = `data:text/csv;charset=utf-8,${headers}\n${rows}`;
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    });
  }
};
