
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NewBotPage() {
  return (
    <main>
      <Section>
        <PageHeader title="Create New Bot" />
        <Card>
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="bot-name" className="block text-sm font-medium text-slate-300">
                  Bot Name
                </label>
                <input
                  type="text"
                  id="bot-name"
                  name="bot-name"
                  className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="bot-description" className="block text-sm font-medium text-slate-300">
                  Description
                </label>
                <textarea
                  id="bot-description"
                  name="bot-description"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="welcome-message" className="block text-sm font-medium text-slate-300">
                  Welcome Message
                </label>
                <input
                  type="text"
                  id="welcome-message"
                  name="welcome-message"
                  className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="bg-emerald-600 shadow-emerald-600/30">
                Create Bot
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  );
}
