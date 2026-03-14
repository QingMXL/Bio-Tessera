import React, { useState } from 'react';
import { UserRole } from '../types';
import { FileText, CheckCircle2, XCircle, ArrowRight, Home, Layout } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  role: UserRole;
}

export default function DesignProposalPage({ role }: Props) {
  const [selected, setSelected] = useState<'restore' | 'redesign' | null>(null);

  const proposals = [
    {
      id: 'PROP-001',
      title: 'Sector A - Guest Room Intervention',
      architect: 'Architect Sarah',
      resident: 'Resident John',
      status: 'proposed',
      options: {
        restore: {
          title: 'Structural Bio-Reinforcement',
          description: 'Injecting high-density mycelium spores into the existing structural grid. This maintains the original guest room function while restoring 95% structural integrity.',
          icon: Home,
          cost: 'Low',
          time: '2 Weeks'
        },
        redesign: {
          title: 'Bio-Balcony Conversion',
          description: 'Removing the heavily aged panels to create a semi-open balcony. This improves ventilation and creates a new "breathing" space for the residence.',
          icon: Layout,
          cost: 'Medium',
          time: '4 Weeks'
        }
      }
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Design Proposals</h3>
        {role === 'ARCHITECT' && (
          <button className="bg-[#141414] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">Create New Proposal</button>
        )}
      </div>

      {proposals.map(prop => (
        <div key={prop.id} className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-black/5 bg-[#F5F2ED]/30 flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} className="text-[#A3B18A]" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{prop.id}</span>
              </div>
              <h4 className="text-xl font-medium">{prop.title}</h4>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-widest opacity-40">Status</p>
              <p className="text-sm font-medium capitalize text-[#D4A373]">{prop.status}</p>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option A: Restore */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selected === 'restore' ? 'border-[#A3B18A] bg-[#A3B18A]/5' : 'border-black/5 hover:border-black/10'
              }`}
              onClick={() => setSelected('restore')}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#F5F2ED] rounded-xl text-[#141414]">
                  <prop.options.restore.icon size={24} />
                </div>
                {selected === 'restore' && <CheckCircle2 className="text-[#A3B18A]" size={24} />}
              </div>
              <h5 className="text-lg font-medium mb-2">{prop.options.restore.title}</h5>
              <p className="text-sm text-black/60 mb-6 leading-relaxed">{prop.options.restore.description}</p>
              
              <div className="flex gap-6 pt-6 border-t border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Complexity</p>
                  <p className="text-xs font-medium">{prop.options.restore.cost}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Timeline</p>
                  <p className="text-xs font-medium">{prop.options.restore.time}</p>
                </div>
              </div>
            </motion.div>

            {/* Option B: Redesign */}
            <motion.div 
              whileHover={{ y: -5 }}
              className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${
                selected === 'redesign' ? 'border-[#D4A373] bg-[#D4A373]/5' : 'border-black/5 hover:border-black/10'
              }`}
              onClick={() => setSelected('redesign')}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-[#F5F2ED] rounded-xl text-[#141414]">
                  <prop.options.redesign.icon size={24} />
                </div>
                {selected === 'redesign' && <CheckCircle2 className="text-[#D4A373]" size={24} />}
              </div>
              <h5 className="text-lg font-medium mb-2">{prop.options.redesign.title}</h5>
              <p className="text-sm text-black/60 mb-6 leading-relaxed">{prop.options.redesign.description}</p>
              
              <div className="flex gap-6 pt-6 border-t border-black/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Complexity</p>
                  <p className="text-xs font-medium">{prop.options.redesign.cost}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40">Timeline</p>
                  <p className="text-xs font-medium">{prop.options.redesign.time}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="p-8 bg-[#F5F2ED]/30 border-t border-black/5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#141414] text-white flex items-center justify-center text-[8px] font-bold">ARC</div>
                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#D4A373] text-[#141414] flex items-center justify-center text-[8px] font-bold">RES</div>
              </div>
              <p className="text-xs text-black/40 italic">Awaiting final confirmation from Resident</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-black/10 hover:bg-black/5">Request Revision</button>
              <button 
                disabled={!selected}
                className="bg-[#141414] text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2a2a2a] disabled:opacity-50 transition-all flex items-center gap-2"
              >
                Confirm Selection
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
