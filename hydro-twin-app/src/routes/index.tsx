import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '@/app/AppLayout';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { MonitoringPage } from '@/features/monitoring/MonitoringPage';
import { PredictionPage } from '@/features/prediction/PredictionPage';
import { DigitalTwinPage } from '@/features/digital-twin/DigitalTwinPage';
import { AlarmsPage } from '@/features/alarms/AlarmsPage';
import { HistoryPage } from '@/features/history/HistoryPage';
import { ModelEvaluationPage } from '@/features/model-evaluation/ModelEvaluationPage';
import { DevicesPage } from '@/features/devices/DevicesPage';
import { ReportsPage } from '@/features/reports/ReportsPage';
import { SettingsPage } from '@/features/settings/SettingsPage';
import { ComponentsPage } from '@/features/components/ComponentsPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'monitoring', element: <MonitoringPage /> },
      { path: 'prediksi', element: <PredictionPage /> },
      { path: 'digital-twin', element: <DigitalTwinPage /> },
      { path: 'alarm', element: <AlarmsPage /> },
      { path: 'riwayat', element: <HistoryPage /> },
      { path: 'evaluasi', element: <ModelEvaluationPage /> },
      { path: 'perangkat', element: <DevicesPage /> },
      { path: 'laporan', element: <ReportsPage /> },
      { path: 'pengaturan', element: <SettingsPage /> },
      { path: 'components', element: <ComponentsPage /> },
    ],
  },
]);
