import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund Policy | Premium Gaming',
  description:
    'Learn about our refund policy and how to request a refund for services purchased at Premium Gaming.',
};

const RefundPolicyPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl mb-6">Refund Policy</h1>
<p className="mb-4">
  <a href="/" className="text-blue-400 hover:underline">
    Go to home
  </a>
</p>
      <p className="mb-4">Effective Date: 16/06/2025</p>
      <p className="mb-6">
        At Premium Gaming, we strive to provide high-quality services and ensure customer satisfaction. If you are not satisfied with your purchase, you may be eligible for a refund under the terms outlined below.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">1. Eligibility for Refunds</h2>
        <p className="mb-2">
          Refunds may be issued at our discretion in the following circumstances:
        </p>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li>The service was not delivered as described.</li>
          <li>There was a technical issue that prevented successful completion of the service.</li>
          <li>You canceled your order before any work was initiated.</li>
        </ul>
        <p>
          We do not offer refunds for services already completed unless there is a clear breach of service agreement or failure to meet the agreed-upon outcome.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">2. Timeframe for Refund Requests</h2>
        <p>
          To be eligible for a refund, you must submit your request within 3 days of the approval date of the service or delivery confirmation. Requests submitted after this period will not be considered.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">3. How to Request a Refund</h2>
        <p className="mb-2">
          If you believe you qualify for a refund, please follow these steps:
        </p>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Contact us via email at [Insert Contact Email] with the subject line “Refund Request”.</li>
          <li>Include your order number, a detailed explanation of your request, and any supporting evidence (e.g., screenshots).</li>
          <li>We will review your case and respond within 3 business days.</li>
        </ol>
        <p className="mt-4">
          All refund decisions are made at the sole discretion of Premium Gaming based on the information provided and our internal policies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">4. Processing Refunds</h2>
        <p>
          Approved refunds will be processed using the original payment method. Please allow up to 5–10 business days for the funds to reflect in your account, depending on your financial institution and payment method used (e.g., PayPal).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">5. Non-Refundable Services</h2>
        <p>
          Certain services may be non-refundable due to their nature or specific terms agreed upon during purchase. These will be clearly marked at the time of checkout.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">6. Contact Us</h2>
        <p>If you have any questions regarding our refund policy, please contact us:</p>
        <p className="mt-2">Email: <a href="mailto:premiumgaming696@gmail.com"  className="text-blue-400 hover:underline">
            premiumgaming696@gmail.com 
          </a></p>
        <p className="mt-1">
          Website:{' '}
          <a href="https://www.premiumgamings.com"  className="text-blue-400 hover:underline">
            https://www.premiumgamings.com 
          </a>
        </p>
      </section>
    </main>
  );
};

export default RefundPolicyPage;