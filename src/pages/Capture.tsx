import React, { useState, useRef } from 'react';
import { Upload, Camera, Scan, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { analyzeAgingImage } from '../services/geminiService';

interface Props {
  onAnalysisComplete: (data: any) => void;
}

export default function Capture({ onAnalysisComplete }: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const compressImage = (base64Str: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const compressed = await compressImage(reader.result as string);
        setImage(compressed);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!image) return;
    setAnalyzing(true);
    const data = await analyzeAgingImage(image);
    setResult(data);
    setAnalyzing(false);
    onAnalysisComplete(data);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-black/10 rounded-2xl p-12 bg-[#F5F2ED]/30">
          {image ? (
            <div className="relative w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-lg">
              <img src={image} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-black/70"
              >
                <AlertCircle size={16} />
              </button>
              {result && result.detections && result.detections.map((d: any, i: number) => (
                <div 
                  key={i}
                  className="absolute border-2 border-red-500 bg-red-500/10 flex items-center justify-center"
                  style={{
                    left: `${Math.random() * 60 + 10}%`,
                    top: `${Math.random() * 60 + 10}%`,
                    width: '60px',
                    height: '60px'
                  }}
                >
                  <span className="bg-red-500 text-white text-[8px] font-bold px-1 absolute -top-4 left-0 uppercase">{d.label}</span>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="p-4 bg-[#A3B18A]/20 rounded-full mb-4">
                <Upload size={32} className="text-[#A3B18A]" />
              </div>
              <h3 className="text-lg font-medium mb-2">Upload Facade Inspection</h3>
              <p className="text-sm text-black/40 mb-6 text-center max-w-xs">Drag and drop or click to select a high-resolution photo of the mycelium surface.</p>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#141414] text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#2a2a2a] transition-colors"
              >
                Select Image
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </>
          )}
        </div>

        {image && !result && (
          <div className="mt-8 flex justify-center">
            <button 
              onClick={startAnalysis}
              disabled={analyzing}
              className="flex items-center gap-2 bg-[#A3B18A] text-[#141414] px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:bg-[#92a078] transition-all disabled:opacity-50"
            >
              {analyzing ? <Loader2 className="animate-spin" size={20} /> : <Scan size={20} />}
              {analyzing ? 'Analyzing with AI...' : 'Run Aging Detection'}
            </button>
          </div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-[#141414] text-white rounded-2xl"
          >
            <div className="flex items-center gap-2 mb-4 text-[#A3B18A]">
              <CheckCircle2 size={20} />
              <h4 className="font-medium uppercase tracking-widest text-sm">Detection Complete</h4>
            </div>
            <p className="text-sm text-white/70 mb-6">{result.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {result.detections.map((d: any, i: number) => (
                <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/10">
                  <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">{d.label}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{d.severity} Severity</span>
                    <span className="text-xs font-mono text-[#A3B18A]">{Math.round(d.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-50">Recommended Action</p>
                <p className="text-sm font-medium text-[#D4A373]">{result.recommendedAction.replace('_', ' ')}</p>
              </div>
              <button className="bg-white text-[#141414] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest">
                Create Task
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
