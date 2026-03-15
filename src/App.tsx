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
  Menu,
  X,
  MoreHorizontal,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const PAGE_SEO: Record<string, { title: string; description: string; keywords: string }> = {
    dashboard: { title: 'Dashboard', description: 'Overview of mycelium structural health, active alerts, and critical monitoring points.', keywords: 'dashboard, mycelium health, monitoring points, alerts' },
    capture: { title: 'Capture & Upload', description: 'Upload photos of mycelium surfaces for AI-powered aging and damage analysis.', keywords: 'upload, photo analysis, surface inspection, AI' },
    cameras: { title: 'Camera List', description: 'List of monitoring cameras and live feeds for mycelium façade sectors.', keywords: 'cameras, live feed, monitoring, façade' },
    mapping: { title: 'Mapping', description: 'Interactive site map showing monitoring locations and risk zones for mycelium structures.', keywords: 'site map, mapping, risk zones, spatial' },
    evaluation: { title: 'Evaluation', description: 'Structural health evaluation and aging assessment for mycelium components.', keywords: 'evaluation, structural health, aging assessment' },
    alerts: { title: 'Alert Center', description: 'Centralized alerts for structural warnings and surface deterioration with severity levels.', keywords: 'alerts, warnings, deterioration, severity' },
    maintenance: { title: 'Maintenance', description: 'Maintenance tasks and workflows for mycelium repair and replacement.', keywords: 'maintenance, tasks, repair, replacement' },
    dialogue: { title: 'Dialogue', description: 'Communication between residents, architects, and managers about mycelium building issues.', keywords: 'dialogue, consultation, architect, resident' },
    proposals: { title: 'Design Proposals', description: 'AI-generated Restore vs. Redesign proposals based on structural evaluation.', keywords: 'design proposals, restore, redesign, options' },
    lab: { title: 'Material Lab', description: 'Track mycelium batch growth cycles and readiness for repair and replacement.', keywords: 'material lab, mycelium batch, growth, incubation' },
  };

  const seo = PAGE_SEO[activeTab] ?? PAGE_SEO.dashboard;
  const fullTitle = `${seo.title} | BIO-TESSERA`;

  useEffect(() => {
    document.title = fullTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', seo.description);
    const kw = document.querySelector('meta[name="keywords"]');
    if (kw) kw.setAttribute('content', seo.keywords);
  }, [fullTitle, seo.description, seo.keywords]);

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

  const NavSidebar = ({ onItemClick }: { onItemClick?: () => void }) => (
    <>
      <div className="p-4 lg:p-6">
        <h1 className="text-xl lg:text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#A3B18A] rounded-full flex items-center justify-center shrink-0">
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
            onClick={() => {
              setActiveTab(item.id);
              onItemClick?.();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm min-h-[44px] touch-manipulation ${
              activeTab === item.id 
                ? 'bg-[#A3B18A] text-[#141414] font-medium' 
                : 'hover:bg-white/5 text-white/70 active:bg-white/10'
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-white/10">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-[#D4A373] rounded-full flex items-center justify-center text-[#141414] shrink-0">
              <User size={16} />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{role}</p>
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
            className="w-full bg-[#141414] border border-white/20 rounded-md text-[10px] p-2.5 outline-none min-h-[40px]"
          >
            <option value="RESIDENT">Resident</option>
            <option value="MANAGER">Manager / Researcher</option>
            <option value="ARCHITECT">Architect</option>
          </select>
        </div>
      </div>
    </>
  );

  const quickNavIds = ['dashboard', 'mapping', 'alerts', 'dialogue'];
  const quickNavItems = filteredNav.filter((item) => quickNavIds.includes(item.id));
  const hasMore = filteredNav.some((item) => !quickNavIds.includes(item.id));

  return (
    <div className="flex h-screen max-h-[100dvh] bg-[#F5F2ED] text-[#141414] font-sans overflow-hidden">
      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] max-w-[85vw] bg-[#141414] text-white flex flex-col z-50 lg:hidden shadow-xl"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-sm font-medium">Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -m-2 touch-manipulation" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>
              <NavSidebar onItemClick={() => setMobileMenuOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#141414] text-white flex-col border-r border-white/10 shrink-0">
        <NavSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden pb-24 lg:pb-0">
        <header className="sticky top-0 z-10 bg-[#F5F2ED]/90 backdrop-blur-md border-b border-black/5 px-4 py-3 lg:px-8 lg:py-4 flex justify-between items-center gap-2 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2 -ml-2 touch-manipulation lg:hidden" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <h2 className="text-base lg:text-xl font-medium capitalize truncate">{activeTab.replace('-', ' ')}</h2>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-2 text-xs opacity-60">
              <Clock size={14} />
              {new Date().toLocaleTimeString()}
            </span>
            <button className="p-2.5 touch-manipulation hover:bg-black/5 rounded-full relative" aria-label="Alerts">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F5F2ED]" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="min-h-0"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom navigation (mobile only) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-black/5 safe-area-pb">
        <div className="flex items-center justify-around h-14 max-h-[calc(2.75rem+env(safe-area-inset-bottom))]">
          {quickNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 touch-manipulation ${
                activeTab === item.id ? 'text-[#A3B18A]' : 'text-black/50'
              }`}
            >
              <item.icon size={22} />
              <span className="text-[10px] font-medium truncate w-full text-center">{item.label.split(' ')[0]}</span>
            </button>
          ))}
          {hasMore && (
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-2 touch-manipulation ${
                mobileMenuOpen ? 'text-[#A3B18A]' : 'text-black/50'
              }`}
            >
              <MoreHorizontal size={22} />
              <span className="text-[10px] font-medium">More</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
