"use client";
import { UploadCloud, File, CheckCircle2, Loader2, DatabaseZap } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Uploader() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);

    try {
      // 1. Upload to FastAPI
      const res = await fetch("http://localhost:8000/api/documents/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      
      alert(`Backend Success: ${data.message}\nConnecting to Gemini AI for intelligent mapping...`);
      
      // 2. Classify via Gemini AI Endpoint
      const classRes = await fetch("http://localhost:8000/api/ai/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ document_text: data.extracted_text })
      });
      const classData = await classRes.json();
      
      console.log("Classified Data JSON Response:", classData.classified_transactions);
      alert("AI Classification completed via Gemini 1.5!\n\nCheck Developer Console to see the resulting structured JSON ledger ready for database insertion.");
      
      setFile(null);
    } catch (e) {
      alert("Upload pipeline failed. Ensure the FastAPI backend is running on port 8000.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${isDragOver ? 'border-primary bg-primary/10' : 'border-border bg-secondary/30'}
          ${file ? 'border-green-500/50 bg-green-500/5' : ''}`}
      >
        <div className="flex flex-col items-center gap-4">
          {file ? (
            <div className="p-4 bg-green-500/20 rounded-full text-green-500 animate-in zoom-in">
              <CheckCircle2 size={32} />
            </div>
          ) : (
            <div className="p-4 bg-primary/20 rounded-full text-primary">
              <UploadCloud size={32} />
            </div>
          )}
          
          <div>
            {file ? (
              <>
                <p className="text-lg font-semibold">{file.name}</p>
                <p className="text-sm text-muted-foreground mt-1">Ready to be sent to FastAPI Engine</p>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold">Drag & drop your financial documents here</p>
                <p className="text-sm text-muted-foreground mt-1">Supports basic .txt or .csv files for live Gemini classification</p>
              </>
            )}
          </div>

          {!file && (
            <Button variant="secondary" className="mt-4 relative overflow-hidden group">
              <span className="relative z-10 group-hover:text-primary transition-colors">Browse Files instead</span>
              <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </Button>
          )}
        </div>
      </div>

      {file && (
        <div className="flex justify-end gap-3 fade-in slide-in-from-right-4 duration-500 animate-in">
          <Button variant="outline" onClick={() => setFile(null)} disabled={uploading}>Cancel</Button>
          <Button onClick={handleUpload} disabled={uploading} className="shadow-lg shadow-primary/20">
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gemini AI Processing...
              </>
            ) : (
              <>
                <DatabaseZap className="mr-2 h-4 w-4" />
                Upload & Extract Ledgers
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
