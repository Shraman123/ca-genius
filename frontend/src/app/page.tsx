import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, FileText, CheckCircle2, AlertCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, CA Rahul 👋</h2>
          <p className="text-muted-foreground mt-1">Here is the big picture of your practice today.</p>
        </div>
        <Button className="glass bg-primary/20 hover:bg-primary/30 text-primary border-primary/20">
          + Add Client
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard 
          title="Total Clients" 
          value="42" 
          trend="+12%" 
          trendUp={true} 
          icon={<Users className="text-blue-500" />} 
        />
        <MetricCard 
          title="Pending GST Returns" 
          value="18" 
          trend="Action Needed" 
          trendUp={false} 
          icon={<AlertCircle className="text-orange-500" />} 
        />
        <MetricCard 
          title="Documents Processed" 
          value="1,204" 
          trend="+300 this week" 
          trendUp={true} 
          icon={<FileText className="text-green-500" />} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
          <CardHeader>
            <CardTitle>Recent Client Uploads</CardTitle>
            <CardDescription>Documents awaiting AI classification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-[var(--glass-border)] bg-background/50 transition-colors hover:bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary rounded-md">
                    <FileText size={16} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">HDFC_Bank_Statement.pdf</p>
                    <p className="text-xs text-muted-foreground">TechNova Solutions Private Ltd</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Analyze</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle>AI Advisory Updates</CardTitle>
            <CardDescription>Smart insights generated for your clients</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-start p-3 bg-primary/5 rounded-lg border border-primary/10">
              <CheckCircle2 className="text-primary mt-1 shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium">Tax Saving Opportunity Identified</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Client 'VentureX' can claim an additional ₹2,40,000 under Section 32AD for new machinery installed based on their latest invoice upload.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-3 bg-destructive/5 rounded-lg border border-destructive/10">
              <AlertCircle className="text-destructive mt-1 shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium">GST Mismatch Warning</p>
                <p className="text-xs text-muted-foreground mt-1">
                  GSTR-2B vs Purchase Register shows a variance of ₹45,000 for client 'Delta Corp'. This requires manual review.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <Card className="glass group hover:border-primary/50 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="p-2 bg-secondary rounded-xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className={`text-xs mt-2 flex items-center gap-1 ${trendUp ? 'text-green-500' : 'text-orange-500'}`}>
          {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {trend}
        </p>
      </CardContent>
    </Card>
  );
}
