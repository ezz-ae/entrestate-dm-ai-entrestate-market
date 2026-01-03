
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const metrics = [
  { name: "Total Leads", value: "1,234" },
  { name: "Conversion Rate", value: "12.3%" },
  { name: "Active Bots", value: "3" }
];

const recentActivity = [
  { lead: "John Doe", status: "Contacted", bot: "Dubai Marina Bot" },
  { lead: "Jane Smith", status: "New", bot: "Downtown Dubai Bot" },
  { lead: "Sam Wilson", status: "Closed", bot: "Palm Jumeirah Bot" }
];

export default function DashboardPage() {
  return (
    <main>
      <Section>
        <div className="flex items-center justify-between">
          <PageHeader title="Dashboard" />
          <Button href="/bots/new" className="bg-emerald-600 shadow-emerald-600/30">
            Create New Bot
          </Button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <Card key={metric.name}>
              <p className="text-sm text-slate-400">{metric.name}</p>
              <p className="text-3xl font-bold text-white">{metric.value}</p>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
          <Card className="mt-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-4 text-sm font-semibold text-slate-300">Lead</th>
                  <th className="p-4 text-sm font-semibold text-slate-300">Status</th>
                  <th className="p-4 text-sm font-semibold text-slate-300">Bot</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map((activity) => (
                  <tr key={activity.lead} className="border-b border-slate-800 last:border-b-0">
                    <td className="p-4 text-slate-300">{activity.lead}</td>
                    <td className="p-4 text-slate-300">{activity.status}</td>
                    <td className="p-4 text-slate-300">{activity.bot}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </Section>
    </main>
  );
}
