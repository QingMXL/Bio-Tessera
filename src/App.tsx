import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Camera, 
  Map as MapIcon, 
  Activity, 
  Bell, 
  Wrench, 
  MessageSquare, 
  FileText, 
  FlaskConical, 
  User,
  Upload,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserRole, MonitoringPoint, Alert, MaintenanceTask, MaterialBatch } from './types';
import { MOCK_POINTS, MOCK_ALERTS, MOCK_BATCHES, MOCK_TASKS } from './mockData';

// Pages
import Dashboard from './pages/Dashboard';
import Capture from './pages/Capture';
import CameraList from './pages/CameraList';
import Mapping from './pages/Mapping';
import Evaluation from './pages/Evaluation';
import AlertCenter from './pages/AlertCenter';
import Maintenance from './pages/Maintenance';
import Dialogue from './pages/Dialogue';
import DesignProposalPage from './pages/DesignProposalPage';
import MaterialLab from './pages/MaterialLab';

export default function App() {
  const [role, setRole] = useState<UserRole>('MANAGER');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [points, setPoints] = useState(MOCK_POINTS);
  const [alerts, setAlerts] = useState(MOCK_ALERTS);
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [batches, setBatches] = useState(MOCK_BATCHES);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['RESIDENT', 'MANAGER', 'ARCHITECT'] },
    { id: 'capture', label: 'Capture & Upload', icon: Upload, roles: ['MANAGER'] },
    { id: 'cameras', label: 'Camera List', icon: Camera, roles: ['MANAGER', 'ARCHITECT'] },
    { id: 'mapping', label: 'Mapping', icon: MapIcon, roles: ['RESIDENT', 'MANAGER', 'ARCHITECT'] },
    { id: 'evaluation', label: 'Evaluation', icon: Activity, roles: ['MANAGER', 'ARCHITECT'] },
    { id: 'alerts', label: 'Alert Center', icon: Bell, roles: ['RESIDENT', 'MANAGER', 'ARCHITECT'] },
    { id: 'maintenance', label: 'Maintenance', icon: Wrench, roles: ['MANAGER'] },
    { id: 'dialogue', label: 'Dialogue', icon: MessageSquare, roles: ['RESIDENT', 'ARCHITECT'] },
    { id: 'proposals', label: 'Design Proposals', icon: FileText, roles: ['RESIDENT', 'ARCHITECT'] },
    { id: 'lab', label: 'Material Lab', icon: FlaskConical, roles: ['MANAGER'] },
  ];

  const filteredNav = navItems.filter(item => item.roles.includes(role));

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard role={role} points={points} alerts={alerts} tasks={tasks} />;
      case 'capture': return <Capture onAnalysisComplete={() => {}} />;
      case 'cameras': return <CameraList points={points} />;
      case 'mapping': return <Mapping points={points} />;
      case 'evaluation': return <Evaluation points={points} />;
      case 'alerts': return <AlertCenter alerts={alerts} onResolve={(id) => setAlerts(prev => prev.map(a => a.id === id ? {...a, status: 'resolved'} : a))} />;
      case 'maintenance': return <Maintenance tasks={tasks} batches={batches} />;
      case 'dialogue': return <Dialogue role={role} />;
      case 'proposals': return <DesignProposalPage role={role} />;
      case 'lab': return <MaterialLab batches={batches} />;
      default: return <Dashboard role={role} points={points} alerts={alerts} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F5F2ED] text-[#141414] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] text-white flex flex-col border-r border-white/10 shrink-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-[#A3B18A] rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
            </div>
            BIO-TESSERA
          </h1>
          <p className="text-[10px] uppercase tracking-widest opacity-50 mt-2">Mycelium Management System</p>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm ${
                activeTab === item.id 
                  ? 'bg-[#A3B18A] text-[#141414] font-medium' 
                  : 'hover:bg-white/5 text-white/70'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[#D4A373] rounded-full flex items-center justify-center text-[#141414]">
                <User size={16} />
              </div>
              <div>
                <p className="text-xs font-medium">{role}</p>
                <p className="text-[10px] opacity-50">Active Session</p>
              </div>
            </div>
            <select 
              value={role} 
              onChange={(e) => {
                const newRole = e.target.value as UserRole;
                setRole(newRole);
                if (!navItems.find(n => n.id === activeTab)?.roles.includes(newRole)) {
                  setActiveTab('dashboard');
                }
              }}
              className="w-full bg-[#141414] border border-white/20 rounded-md text-[10px] p-2 outline-none"
            >
              <option value="RESIDENT">Resident</option>
              <option value="MANAGER">Manager / Researcher</option>
              <option value="ARCHITECT">Architect</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-[#F5F2ED]/80 backdrop-blur-md border-b border-black/5 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-medium capitalize">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs opacity-60">
              <Clock size={14} />
              {new Date().toLocaleTimeString()}
            </div>
            <button className="p-2 hover:bg-black/5 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F5F2ED]" />
            </button>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
