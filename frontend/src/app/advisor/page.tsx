"use client";
import { useState } from "react";
import { Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdvisorPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello CA Rahul! I'm your CA-Genius assistant, now powered live by Google Gemini 1.5 Flash. How can I help you optimize compliance today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setLoading(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.message }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Error communicating with AI engine. Make sure FastAPI backend is running!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen p-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/20 text-primary rounded-lg shadow-inner">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Tax Advisor</h2>
          <p className="text-sm text-muted-foreground">Live Intelligence trained on IT Act & GST laws</p>
        </div>
      </header>

      <div className="flex-1 glass rounded-2xl border border-[var(--glass-border)] shadow-xl overflow-hidden flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 z-10 w-full">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md grow-0 shrink-0
                ${msg.role === 'assistant' ? 'bg-primary text-white' : 'bg-secondary text-foreground'}`}>
                {msg.role === 'assistant' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className={`max-w-[80%] rounded-2xl p-4 text-sm shadow-sm whitespace-pre-wrap leading-relaxed
                ${msg.role === 'assistant' 
                  ? 'bg-card border border-border text-card-foreground rounded-tl-none' 
                  : 'bg-primary text-primary-foreground rounded-tr-none'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-md grow-0 shrink-0 bg-primary text-white">
                 <Bot size={18} />
               </div>
               <div className="bg-card border border-border text-card-foreground rounded-tl-none rounded-2xl p-4 flex items-center justify-center h-12">
                  <Loader2 className="animate-spin text-muted-foreground h-5 w-5" />
               </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[var(--glass-border)] bg-background/50 backdrop-blur-md z-10">
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-3 relative">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about compliance risks, tax optimization, or specific client data..." 
              className="flex-1 h-12 rounded-xl bg-background border-border shadow-inner focus-visible:ring-primary/50"
              disabled={loading}
            />
            <Button disabled={loading} type="submit" className="h-12 w-12 rounded-xl shadow-md shadow-primary/20 hover:scale-105 transition-transform" size="icon">
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
