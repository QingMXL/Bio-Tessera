import React, { useState, useEffect } from 'react';
import { MonitoringPoint } from '../types';
import { Search, ZoomIn, ZoomOut, Layers, Maximize2 } from 'lucide-react';
import { mapStore } from '../mapStore';

interface Props {
  points: MonitoringPoint[];
}

export default function Mapping({ points }: Props) {
  const [zoom, setZoom] = useState(1);
  const [background, setBackground] = useState<string | null>(mapStore.getBackground());

  useEffect(() => {
    const unsubscribe = mapStore.subscribe(setBackground);
    mapStore.loadBackground();
    return unsubscribe;
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 min-h-0 flex flex-col flex-1">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 shrink-0">
        <div className="flex items-center gap-3 bg-white px-3 py-2.5 sm:px-4 rounded-xl border border-black/5 flex-1 min-w-0">
          <Search size={18} className="text-black/40 shrink-0" />
          <input type="text" placeholder="Search grid or sector..." className="text-sm outline-none bg-transparent w-full min-w-0" />
        </div>
        <div className="flex items-center gap-1 sm:gap-2 bg-white p-1 rounded-xl border border-black/5 w-full sm:w-auto justify-center sm:justify-end">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2.5 sm:p-2 touch-manipulation hover:bg-black/5 rounded-lg"><ZoomOut size={18} /></button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2.5 sm:p-2 touch-manipulation hover:bg-black/5 rounded-lg"><ZoomIn size={18} /></button>
          <div className="w-px h-4 bg-black/10 mx-1" />
          <button className="p-2.5 sm:p-2 touch-manipulation hover:bg-black/5 rounded-lg" aria-label="Layers"><Layers size={18} /></button>
          <button className="p-2.5 sm:p-2 touch-manipulation hover:bg-black/5 rounded-lg" aria-label="Fullscreen"><Maximize2 size={18} /></button>
        </div>
      </div>

      <div className="flex-1 min-h-[240px] sm:min-h-[320px] bg-[#141414] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-white/10">
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #A3B18A 1px, transparent 1px)', 
            backgroundSize: `${40 * zoom}px ${40 * zoom}px` 
          }} 
        />

        {/* Facade Visualization */}
        <div 
          className="absolute inset-0 flex items-center justify-center p-2 transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="relative w-full h-full max-w-[1000px] max-h-[650px] bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl overflow-hidden aspect-[1000/650] min-h-0">
            {/* Aerial Site Map Image */}
            {background && (
              <img 
                src={background} 
                alt="Aerial Site Map" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />
            )}
            
            {/* Simulated Grid Overlay */}
            <div className="grid grid-cols-6 grid-rows-4 w-full h-full p-4 sm:p-8 gap-2 sm:gap-4 relative z-10">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-white/10 rounded bg-white/5 relative group hover:bg-white/20 transition-colors min-h-0">
                  <span className="absolute top-1 left-1 text-[8px] opacity-50 font-mono text-white">S-{i+1}</span>
                </div>
              ))}
            </div>

            {/* Aging Points Mapping */}
            {points.map((p) => (
              <div 
                key={p.id}
                className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer animate-pulse ${
                  p.status === 'critical' ? 'bg-red-500' : 'bg-yellow-500'
                }`}
                style={{ 
                  left: `${p.x}%`, 
                  top: `${p.y}%` 
                }}
              >
                <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white text-[#141414] px-2 py-1 rounded text-[8px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none shadow-xl">
                  {p.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-black/60 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white space-y-2 sm:space-y-3 max-w-[45%]">
          <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Facade Legend</h5>
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>Critical</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-yellow-500 shrink-0" />
              <span>Degradation</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
              <span>Healthy</span>
            </div>
          </div>
        </div>

        {/* Mini Map - hide on very small screens to save space */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6 w-20 h-20 sm:w-32 sm:h-32 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-1.5 sm:p-2">
          <div className="w-full h-full border border-white/20 rounded relative overflow-hidden">
            {background && (
              <img 
                src={background} 
                alt="Mini Map" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            )}
            <div className="absolute w-8 h-6 border border-[#A3B18A] bg-[#A3B18A]/20 z-10" style={{ left: '40%', top: '35%' }} />
          </div>
          <p className="text-[8px] text-center mt-0.5 sm:mt-1 opacity-50 uppercase tracking-widest hidden sm:block">Viewport</p>
        </div>
      </div>
    </div>
  );
}
