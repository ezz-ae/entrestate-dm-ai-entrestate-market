
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";

export default function PrivacyPage() {
  return (
    <main>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <PageHeader
            title="Privacy Policy"
            description="Your privacy is important to us. This policy explains how we collect, use, and protect your personal information."
            eyebrow="LEGAL"
          />

          <div className="space-y-8 text-apple-gray-500 text-lg leading-relaxed">
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us when you use our services, such as your name, email address, and any other information you choose to provide. We also collect usage data automatically as you interact with our platform.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to provide, maintain, and improve our services, to process transactions, and to send you related information, including confirmations and invoices. We may also use your information to communicate with you about products, services, offers, and events offered by Entrestate and others, and provide news and information we think will be of interest to you.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">3. Sharing of Information</h2>
              <p>We may share information about you with third-party vendors, consultants, and other service providers who need access to such information to carry out work on our behalf. We may also share information in response to a request for information if we believe disclosure is in accordance with, or required by, any applicable law, regulation, or legal process.</p>
            </Card>
            <Card>
              <h2 className="text-xl font-semibold text-apple-gray-600 mb-4">4. Your Choices</h2>
              <p>You may review, correct, or change the information in your account at any time by logging into your account and editing your profile. You may opt out of receiving promotional communications from Entrestate by following the instructions in those communications.</p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
