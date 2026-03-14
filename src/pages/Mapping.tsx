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
    <div className="space-y-6 h-[calc(100vh-180px)] flex flex-col">
      <div className="flex justify-between items-center shrink-0">
        <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl border border-black/5">
          <Search size={16} className="text-black/40" />
          <input type="text" placeholder="Search grid or sector..." className="text-sm outline-none bg-transparent w-48" />
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-black/5">
          <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-black/5 rounded-lg"><ZoomOut size={16} /></button>
          <span className="text-xs font-mono w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button onClick={() => setZoom(z => Math.min(2, z + 0.1))} className="p-2 hover:bg-black/5 rounded-lg"><ZoomIn size={16} /></button>
          <div className="w-px h-4 bg-black/10 mx-1" />
          <button className="p-2 hover:bg-black/5 rounded-lg"><Layers size={16} /></button>
          <button className="p-2 hover:bg-black/5 rounded-lg"><Maximize2 size={16} /></button>
        </div>
      </div>

      <div className="flex-1 bg-[#141414] rounded-3xl overflow-hidden relative border border-white/10">
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
          className="absolute inset-0 flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="relative w-[1000px] h-[650px] bg-[#1a1a1a] border border-white/20 rounded-lg shadow-2xl overflow-hidden">
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
            <div className="grid grid-cols-6 grid-rows-4 w-full h-full p-8 gap-4 relative z-10">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border border-white/10 rounded bg-white/5 relative group hover:bg-white/20 transition-colors">
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
        <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl text-white space-y-3">
          <h5 className="text-[10px] font-bold uppercase tracking-widest opacity-50">Facade Legend</h5>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span>Critical Aging (Structural)</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span>Surface Degradation</span>
            </div>
            <div className="flex items-center gap-2 text-[10px]">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Healthy Mycelium</span>
            </div>
          </div>
        </div>

        {/* Mini Map */}
        <div className="absolute top-6 right-6 w-32 h-32 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-2">
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
          <p className="text-[8px] text-center mt-1 opacity-50 uppercase tracking-widest">Viewport</p>
        </div>
      </div>
    </div>
  );
}
