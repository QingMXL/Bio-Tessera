import React, { useState, useEffect } from 'react';
import { UserRole, MonitoringPoint, Alert, MaintenanceTask } from '../types';
import { Activity, AlertTriangle, CheckCircle2, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cameraStore } from '../cameraStore';

interface Props {
  role: UserRole;
  points: MonitoringPoint[];
  alerts: Alert[];
  tasks: MaintenanceTask[];
}

export default function Dashboard({ role, points, alerts, tasks }: Props) {
  const [feeds, setFeeds] = useState<Record<string, string | null>>(cameraStore.getFeeds());

  useEffect(() => {
    const unsubscribe = cameraStore.subscribe(setFeeds);
    // Ensure feeds are loading if not already
    cameraStore.loadAll();
    return unsubscribe;
  }, []);

  const stats = [
    { label: 'Overall Health', value: '92%', icon: Activity, trend: '+2.4%', up: true },
    { label: 'Active Alerts', value: alerts.filter(a => a.status !== 'resolved').length.toString(), icon: AlertTriangle, trend: '-1', up: false },
    { label: 'Pending Tasks', value: tasks.filter(t => t.status !== 'completed').length.toString(), icon: CheckCircle2, trend: '0', up: true },
    { label: 'Aging Trend', value: 'Stable', icon: TrendingUp, trend: 'Low Risk', up: true },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-sm border border-black/5">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#F5F2ED] rounded-lg">
                <stat.icon size={20} className="text-[#A3B18A]" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${stat.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-xl sm:text-2xl font-bold tracking-tight">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-black/40 uppercase tracking-wider font-medium mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Monitoring Points */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-medium">Critical Monitoring Points</h3>
            <button className="text-xs text-[#A3B18A] font-bold uppercase tracking-widest hover:underline touch-manipulation py-1">View All</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.slice(0, 2).map(point => (
              <div key={point.id} className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-black/5 group cursor-pointer">
                <div className="h-36 sm:h-40 overflow-hidden relative bg-[#141414] flex items-center justify-center">
                  {feeds[point.id] ? (
                    <img src={feeds[point.id]!} alt={point.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-white/20 text-[8px] uppercase tracking-widest">Establishing Link...</div>
                  )}
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    point.status === 'critical' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {point.status}
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h4 className="font-medium text-sm sm:text-base">{point.name}</h4>
                  <p className="text-xs text-black/40 mb-3">{point.location}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-black/5 rounded-full overflow-hidden">
                        <div className="h-full bg-[#A3B18A]" style={{ width: `${point.riskLevel}%` }} />
                      </div>
                      <span className="text-[10px] font-bold">{point.riskLevel}% Risk</span>
                    </div>
                    <span className="text-[10px] opacity-40">{point.lastUpdate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-4 sm:space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base sm:text-lg font-medium">Recent Alerts</h3>
            <button className="text-xs text-[#A3B18A] font-bold uppercase tracking-widest hover:underline touch-manipulation py-1">History</button>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {alerts.slice(0, 3).map(alert => (
              <div key={alert.id} className="bg-white p-3 sm:p-4 rounded-xl border border-black/5 flex gap-3 sm:gap-4 items-start">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h5 className="text-sm font-medium">{alert.type}</h5>
                    <span className="text-[10px] opacity-40">{alert.timestamp}</span>
                  </div>
                  <p className="text-xs text-black/60 line-clamp-2">{alert.description}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 sm:py-1.5 bg-[#141414] text-white rounded touch-manipulation">Inspect</button>
                    <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-2 sm:py-1.5 border border-black/10 rounded touch-manipulation">Dismiss</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
