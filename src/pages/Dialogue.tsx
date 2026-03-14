import React, { useState, useRef, useEffect } from 'react';
import { UserRole } from '../types';
import { Send, User, Bot, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getChatResponse } from '../services/geminiService';

interface Props {
  role: UserRole;
}

export default function Dialogue({ role }: Props) {
  const [messages, setMessages] = useState([
    { id: '1', sender: 'ARCHITECT', content: 'Hello! I have reviewed the structural report for your guest room. The perforation in the north panel is significant.', timestamp: '10:00 AM' },
    { id: '2', sender: 'RESIDENT', content: 'Yes, I noticed some light coming through. Is it dangerous?', timestamp: '10:05 AM' },
    { id: '3', sender: 'ARCHITECT', content: 'Not dangerous yet, but we need to act. I am preparing two options: a full restoration or a redesign into an open balcony. What are your thoughts?', timestamp: '10:10 AM' },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsgContent = input;
    const newMessage = {
      id: Date.now().toString(),
      sender: role,
      content: userMsgContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getChatResponse(updatedMessages, role);
      
      const replyMessage = {
        id: (Date.now() + 1).toString(),
        sender: role === 'RESIDENT' ? 'ARCHITECT' : 'RESIDENT',
        content: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, replyMessage]);
    } catch (error) {
      console.error("Failed to get reply:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-black/5 flex justify-between items-center bg-[#F5F2ED]/30">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#141414] text-white rounded-full flex items-center justify-center">
            {role === 'RESIDENT' ? <User size={20} /> : <Bot size={20} />}
          </div>
          <div>
            <h3 className="font-medium">{role === 'RESIDENT' ? 'Architect Sarah' : 'Resident John'}</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-40">Active Consultation - Sector A</p>
          </div>
        </div>
        <button className="text-xs font-bold uppercase tracking-widest text-[#A3B18A] hover:underline">View Case File</button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F5F2ED]/10 scroll-smooth">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.sender === role ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            key={msg.id} 
            className={`flex ${msg.sender === role ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] space-y-1 ${msg.sender === role ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-sm ${
                msg.sender === role 
                  ? 'bg-[#141414] text-white rounded-tr-none' 
                  : 'bg-white border border-black/5 rounded-tl-none shadow-sm'
              }`}>
                {msg.content}
              </div>
              <p className="text-[8px] uppercase tracking-widest opacity-30 px-1">{msg.timestamp} • {msg.sender}</p>
            </div>
          </motion.div>
        ))}
        
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-black/5 rounded-2xl rounded-tl-none p-4 shadow-sm">
                <div className="flex gap-1">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#A3B18A] rounded-full" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-black/5 bg-white">
        <div className="flex gap-4">
          <input 
            type="text" 
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isTyping ? "Waiting for response..." : "Type your message..."} 
            className="flex-1 bg-[#F5F2ED] border-none rounded-xl px-6 py-4 text-sm outline-none focus:ring-2 ring-[#A3B18A]/20 disabled:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-[#A3B18A] text-[#141414] p-4 rounded-xl hover:bg-[#92a078] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
