import { Uploader } from "@/components/documents/Uploader";

export default function DocumentsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Document Processing</h2>
        <p className="text-muted-foreground mt-1">Upload Bank Statements, Invoices, or Ledgers for AI classification.</p>
      </header>

      <section className="glass rounded-xl p-8 border border-[var(--glass-border)]">
        <Uploader />
      </section>
    </div>
  );
}
