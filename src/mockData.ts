import { MonitoringPoint, Alert, MaterialBatch, MaintenanceTask } from './types';

export const MOCK_POINTS: MonitoringPoint[] = [
  {
    id: 'P1',
    name: 'North Facade - Sector A',
    location: 'Grid 42-B',
    status: 'critical',
    lastUpdate: '2026-03-11 14:30',
    riskLevel: 85,
    thumbnail: '/assets/camera_p1_north_facade.jpg',
    x: 25,
    y: 35
  },
  {
    id: 'P2',
    name: 'Strategic Roof Garden',
    location: 'Grid 12-C',
    status: 'healthy',
    lastUpdate: '2026-03-12 08:00',
    riskLevel: 12,
    thumbnail: '/assets/camera_p2_roof_garden.jpg',
    x: 65,
    y: 25
  },
  {
    id: 'P3',
    name: 'Fortified East Entrance',
    location: 'Grid 05-A',
    status: 'warning',
    lastUpdate: '2026-03-12 09:15',
    riskLevel: 45,
    thumbnail: '/assets/camera_p3_east_entrance.jpg',
    x: 45,
    y: 75
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'A1',
    pointId: 'P1',
    severity: 'high',
    type: 'Structural Perforation',
    timestamp: '2026-03-11 14:35',
    status: 'pending',
    description: 'Significant perforation detected in the load-bearing mycelium panel.'
  },
  {
    id: 'A2',
    pointId: 'P3',
    severity: 'medium',
    type: 'Surface Erosion',
    timestamp: '2026-03-12 09:20',
    status: 'processing',
    description: 'Minor erosion observed on the outer skin of the entrance arch.'
  }
];

export const MOCK_BATCHES: MaterialBatch[] = [
  {
    id: 'B-2026-001',
    strain: 'Pleurotus Ostreatus - Hybrid X',
    growthStart: '2026-03-01',
    status: 'ready',
    qualityScore: 94
  },
  {
    id: 'B-2026-002',
    strain: 'Ganoderma Lucidum - Reinforced',
    growthStart: '2026-03-05',
    status: 'incubating',
    qualityScore: 88
  }
];

export const MOCK_TASKS: MaintenanceTask[] = [
  {
    id: 'T1',
    alertId: 'A2',
    status: 'in_progress',
    materialBatchId: 'B-2026-001',
    assignedTo: 'Researcher Chen',
    createdAt: '2026-03-12 10:00'
  }
];
