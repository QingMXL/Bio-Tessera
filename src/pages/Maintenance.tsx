import React from 'react';
import { MaintenanceTask, MaterialBatch } from '../types';
import { Wrench, Clock, User, Package, CheckCircle2, FlaskConical } from 'lucide-react';

interface Props {
  tasks: MaintenanceTask[];
  batches: MaterialBatch[];
}

export default function Maintenance({ tasks, batches }: Props) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Active Maintenance Tasks</h3>
            <button className="bg-[#141414] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest">New Task</button>
          </div>
          
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-[#A3B18A]/10 rounded-2xl text-[#A3B18A]">
                      <Wrench size={24} />
                    </div>
                    <div>
                      <h4 className="font-medium">Task #{task.id}</h4>
                      <p className="text-xs text-black/40">Linked to Alert {task.alertId}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 flex items-center gap-1">
                      <User size={10} /> Assigned To
                    </p>
                    <p className="text-sm font-medium">{task.assignedTo}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 flex items-center gap-1">
                      <Package size={10} /> Material Batch
                    </p>
                    <p className="text-sm font-medium">{task.materialBatchId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase tracking-widest opacity-40 flex items-center gap-1">
                      <Clock size={10} /> Created At
                    </p>
                    <p className="text-sm font-medium">{task.createdAt}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-black/5">
                  <div className="flex -space-x-2">
                    {[1, 2].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-[#D4A373] flex items-center justify-center text-[10px] font-bold">
                        {i === 1 ? 'MC' : 'JS'}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="text-xs font-bold uppercase tracking-widest border border-black/10 px-4 py-2 rounded-lg hover:bg-black/5">Update Progress</button>
                    <button className="bg-[#A3B18A] text-[#141414] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-[#92a078]">Mark Complete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Material Inventory Quick View */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Material Inventory</h3>
          <div className="space-y-4">
            {batches.filter(b => b.status === 'ready').map(batch => (
              <div key={batch.id} className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-[#D4A373]/10 rounded-lg text-[#D4A373]">
                    <FlaskConical size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">Ready</span>
                </div>
                <h5 className="text-sm font-medium mb-1">{batch.strain}</h5>
                <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest mb-4">ID: {batch.id}</p>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                  <span className="opacity-40">Quality Score</span>
                  <span className="text-[#A3B18A]">{batch.qualityScore}%</span>
                </div>
                <div className="w-full h-1 bg-black/5 rounded-full mt-1">
                  <div className="h-full bg-[#A3B18A]" style={{ width: `${batch.qualityScore}%` }} />
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-black/10 rounded-2xl text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:bg-black/5 transition-all">
              Go to Material Lab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
