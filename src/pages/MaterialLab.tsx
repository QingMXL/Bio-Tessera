import React from 'react';
import { MaterialBatch } from '../types';
import { FlaskConical, Thermometer, Droplets, Wind, Plus, History } from 'lucide-react';

interface Props {
  batches: MaterialBatch[];
}

export default function MaterialLab({ batches }: Props) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Community Material Lab</h3>
          <p className="text-xs text-black/40">Cultivating mycelium strains for local maintenance</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-4 py-2 rounded-xl hover:bg-black/5">
            <History size={14} />
            History
          </button>
          <button className="flex items-center gap-2 bg-[#141414] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a2a]">
            <Plus size={14} />
            New Batch
          </button>
        </div>
      </div>

      {/* Lab Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Temperature', value: '24.5°C', icon: Thermometer, status: 'Optimal' },
          { label: 'Humidity', value: '82%', icon: Droplets, status: 'Optimal' },
          { label: 'CO2 Levels', value: '1200ppm', icon: Wind, status: 'Adjusting' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-[#F5F2ED] rounded-xl text-[#141414]">
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-40">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold">{stat.value}</span>
                <span className="text-[8px] font-bold uppercase text-green-600">{stat.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Batches */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest opacity-40">Active Cultivation</h4>
          <div className="space-y-4">
            {batches.map(batch => (
              <div key={batch.id} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#A3B18A]/10 rounded-xl flex items-center justify-center text-[#A3B18A]">
                      <FlaskConical size={20} />
                    </div>
                    <div>
                      <h5 className="font-medium">{batch.strain}</h5>
                      <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">ID: {batch.id}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest ${
                    batch.status === 'ready' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {batch.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="opacity-40">Growth Progress</span>
                    <span>{batch.status === 'ready' ? '100%' : '65%'}</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${batch.status === 'ready' ? 'bg-[#A3B18A]' : 'bg-blue-400'}`} 
                      style={{ width: batch.status === 'ready' ? '100%' : '65%' }} 
                    />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-[8px] uppercase tracking-widest opacity-40">Started</p>
                        <p className="text-[10px] font-medium">{batch.growthStart}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase tracking-widest opacity-40">Quality</p>
                        <p className="text-[10px] font-medium text-[#A3B18A]">{batch.qualityScore}%</p>
                      </div>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-[#141414] hover:underline">View Sensors</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lab Log */}
        <div className="space-y-6">
          <h4 className="text-sm font-bold uppercase tracking-widest opacity-40">Recent Lab Activity</h4>
          <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
            <div className="divide-y divide-black/5">
              {[
                { time: '09:00 AM', user: 'Researcher Chen', action: 'Adjusted humidity in Incubator 2' },
                { time: 'Yesterday', user: 'System', action: 'Batch B-2026-001 marked as READY' },
                { time: 'Yesterday', user: 'Architect Sarah', action: 'Requested strain analysis for Sector A' },
                { time: '2 days ago', user: 'Researcher Chen', action: 'Inoculated Batch B-2026-002' },
              ].map((log, i) => (
                <div key={i} className="p-4 flex gap-4 items-start hover:bg-black/[0.01] transition-colors">
                  <span className="text-[10px] font-mono opacity-30 whitespace-nowrap pt-0.5">{log.time}</span>
                  <div>
                    <p className="text-xs font-medium">{log.action}</p>
                    <p className="text-[10px] opacity-40">{log.user}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-[#F5F2ED]/50 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all">
              View Full Audit Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
