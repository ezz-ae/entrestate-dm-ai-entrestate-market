
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PaymentPage() {
  return (
    <main>
      <Section>
        <PageHeader title="Payment Method" />
        <Card>
          <form>
            <div className="space-y-6">
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-slate-300">
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="expiry-date" className="block text-sm font-medium text-slate-300">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    name="expiry-date"
                    className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-slate-300">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder="123"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="name-on-card" className="block text-sm font-medium text-slate-300">
                  Name on Card
                </label>
                <input
                  type="text"
                  id="name-on-card"
                  name="name-on-card"
                  className="mt-1 block w-full rounded-md border-slate-700 bg-slate-800 text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="bg-emerald-600 shadow-emerald-600/30">
                Save Payment Method
              </Button>
            </div>
          </form>
        </Card>
      </Section>
    </main>
  );
}
