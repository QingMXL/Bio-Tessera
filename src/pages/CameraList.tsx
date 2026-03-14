import React, { useState, useEffect } from 'react';
import { MonitoringPoint } from '../types';
import { Camera, Shield, AlertCircle, RefreshCw, Loader2 } from 'lucide-react';
import { cameraStore } from '../cameraStore';

interface Props {
  points: MonitoringPoint[];
}

export default function CameraList({ points: initialPoints }: Props) {
  const [feeds, setFeeds] = useState<Record<string, string | null>>(cameraStore.getFeeds());

  useEffect(() => {
    const unsubscribe = cameraStore.subscribe(setFeeds);
    cameraStore.loadAll();
    return unsubscribe;
  }, []);

  const handleRefresh = (id: string, name: string) => {
    // Clear and reload
    // Note: In a real store we might have a force reload method
    cameraStore.loadFeed(id, name);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-black/40">{initialPoints.length} Active Monitoring Nodes</p>
        <button 
          onClick={() => cameraStore.loadAll()}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest border border-black/10 px-4 py-2 rounded-lg hover:bg-black/5"
        >
          <RefreshCw size={14} />
          Sync All Feeds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialPoints.map(point => (
          <div key={point.id} className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm group">
            <div className="relative aspect-video bg-[#141414] flex items-center justify-center">
              {feeds[point.id] ? (
                <>
                  <img src={feeds[point.id]!} alt={point.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-white/40">
                  <Loader2 size={32} className="animate-spin" />
                  <span className="text-[10px] uppercase tracking-widest">Establishing Link...</span>
                </div>
              )}
              
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${point.status === 'healthy' ? 'bg-green-500' : point.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`} />
                Live Feed
              </div>
              
              <button 
                onClick={() => cameraStore.loadFeed(point.id, point.name)}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/30">
                  <RefreshCw size={24} />
                </div>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium text-lg">{point.name}</h4>
                  <p className="text-xs text-black/40">{point.location}</p>
                </div>
                <div className={`p-2 rounded-xl ${
                  point.status === 'healthy' ? 'bg-green-50 text-green-600' : point.status === 'warning' ? 'bg-yellow-50 text-yellow-600' : 'bg-red-50 text-red-600'
                }`}>
                  {point.status === 'healthy' ? <Shield size={20} /> : <AlertCircle size={20} />}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                  <span>Risk Level</span>
                  <span>{point.riskLevel}%</span>
                </div>
                <div className="w-full h-1 bg-black/5 rounded-full overflow-hidden">
                  <div className={`h-full transition-all duration-1000 ${
                    point.riskLevel > 70 ? 'bg-red-500' : point.riskLevel > 30 ? 'bg-yellow-500' : 'bg-green-500'
                  }`} style={{ width: `${point.riskLevel}%` }} />
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] opacity-40">Last Scan: {point.lastUpdate}</span>
                  <button className="text-[10px] font-bold uppercase tracking-widest text-[#A3B18A] hover:underline">
                    Detailed Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
