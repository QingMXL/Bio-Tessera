export type UserRole = 'RESIDENT' | 'MANAGER' | 'ARCHITECT';

export interface Detection {
  id: string;
  label: 'crack' | 'erosion' | 'browning' | 'peeling' | 'perforation';
  severity: 'low' | 'medium' | 'high';
  x: number; // percentage
  y: number; // percentage
  width: number;
  height: number;
}

export interface MonitoringPoint {
  id: string;
  name: string;
  location: string;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdate: string;
  riskLevel: number; // 0-100
  thumbnail: string | null;
  x: number; // percentage
  y: number; // percentage
}

export interface Alert {
  id: string;
  pointId: string;
  severity: 'low' | 'medium' | 'high';
  type: string;
  timestamp: string;
  status: 'pending' | 'processing' | 'resolved';
  description: string;
}

export interface MaintenanceTask {
  id: string;
  alertId: string;
  status: 'scheduled' | 'in_progress' | 'completed';
  materialBatchId: string;
  assignedTo: string;
  createdAt: string;
}

export interface DesignProposal {
  id: string;
  alertId: string;
  architectId: string;
  residentId: string;
  restoreOption: { title: string; description: string };
  redesignOption: { title: string; description: string };
  selectedOption?: 'restore' | 'redesign';
  status: 'draft' | 'proposed' | 'accepted' | 'implemented';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface MaterialBatch {
  id: string;
  strain: string;
  growthStart: string;
  status: 'incubating' | 'ready' | 'used';
  qualityScore: number;
}
