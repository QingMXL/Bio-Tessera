import React from 'react';
import { Alert } from '../types';
import { AlertTriangle, Clock, CheckCircle2, ChevronRight, Filter } from 'lucide-react';

interface Props {
  alerts: Alert[];
  onResolve: (id: string) => void;
}

export default function AlertCenter({ alerts, onResolve }: Props) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button className="bg-[#141414] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">All Alerts</button>
          <button className="bg-white border border-black/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/5">Critical Only</button>
        </div>
        <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100">
          <Filter size={14} />
          Filter
        </button>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <div className={`w-2 shrink-0 ${
              alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
            }`} />
            
            <div className="flex-1 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                  }`}>
                    {alert.severity} Priority
                  </span>
                  <span className="text-[10px] opacity-40 flex items-center gap-1">
                    <Clock size={10} />
                    {alert.timestamp}
                  </span>
                </div>
                <h4 className="text-lg font-medium mb-1">{alert.type}</h4>
                <p className="text-sm text-black/60">{alert.description}</p>
                <p className="text-[10px] mt-2 font-mono opacity-40 uppercase tracking-widest">Location: Point {alert.pointId}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-black/5">
                <div className="flex flex-col items-end mr-4">
                  <span className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Status</span>
                  <div className="flex items-center gap-1.5">
                    {alert.status === 'resolved' ? (
                      <CheckCircle2 size={14} className="text-green-500" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                    )}
                    <span className="text-xs font-medium capitalize">{alert.status}</span>
                  </div>
                </div>
                
                {alert.status !== 'resolved' && (
                  <button 
                    onClick={() => onResolve(alert.id)}
                    className="flex-1 md:flex-none bg-[#141414] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2"
                  >
                    Take Action
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
