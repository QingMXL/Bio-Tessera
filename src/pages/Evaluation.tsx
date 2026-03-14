import React from 'react';
import { MonitoringPoint } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Info, TrendingUp, AlertTriangle } from 'lucide-react';

interface Props {
  points: MonitoringPoint[];
}

export default function Evaluation({ points }: Props) {
  const data = points.map(p => ({
    name: p.name.split('-')[0],
    risk: p.riskLevel,
    aging: p.riskLevel * 0.8,
    stability: 100 - p.riskLevel
  }));

  const trendData = [
    { month: 'Oct', value: 12 },
    { month: 'Nov', value: 15 },
    { month: 'Dec', value: 22 },
    { month: 'Jan', value: 18 },
    { month: 'Feb', value: 25 },
    { month: 'Mar', value: 32 },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risk Distribution */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-medium">Risk Distribution</h3>
              <p className="text-xs text-black/40">Comparison across sectors</p>
            </div>
            <Info size={18} className="text-black/20" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="risk" fill="#A3B18A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="aging" fill="#D4A373" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Aging Trend */}
        <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-medium">Aging Velocity</h3>
              <p className="text-xs text-black/40">Historical trend (6 months)</p>
            </div>
            <TrendingUp size={18} className="text-[#A3B18A]" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#888' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="value" stroke="#141414" strokeWidth={2} dot={{ fill: '#141414', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-medium">Detailed Material Evaluation</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#F5F2ED]/50 text-[10px] font-bold uppercase tracking-widest text-black/40">
              <th className="px-6 py-4">Component</th>
              <th className="px-6 py-4">Crack Size (Avg)</th>
              <th className="px-6 py-4">Aging %</th>
              <th className="px-6 py-4">Perforation Count</th>
              <th className="px-6 py-4">Risk Level</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {points.map(p => (
              <tr key={p.id} className="text-sm hover:bg-black/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium">{p.name}</td>
                <td className="px-6 py-4 font-mono text-xs">{(p.riskLevel * 0.12).toFixed(2)}mm</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[#D4A373]" style={{ width: `${p.riskLevel * 0.8}%` }} />
                    </div>
                    <span className="text-xs">{(p.riskLevel * 0.8).toFixed(1)}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-mono text-xs">{Math.floor(p.riskLevel / 15)}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    p.status === 'critical' ? 'bg-red-100 text-red-600' : p.status === 'warning' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#A3B18A] hover:underline text-xs font-bold uppercase tracking-widest">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
