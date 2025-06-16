import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Premium Gaming',
  description:
    'Terms governing the use of our website and services for Premium Gaming.',
};

const TermsAndConditionsPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl mb-6">Terms and Conditions</h1>
<p className="mb-4">
  <a href="/" className="text-blue-400 hover:underline">
    Go to home
  </a>
</p>
      <p className="mb-4">Effective Date: 16/06/2025</p>
      <p className="mb-6">
        These Terms and Conditions govern your access to and use of the website located at{' '}
        <a href="https://www.premiumgamings.com"  className="text-blue-400 hover:underline">
          https://www.premiumgamings.com 
        </a>{' '}
        (the “Site”) and the services offered by Premium Gaming (“we”, “us”, or “our”). By accessing or using our Site or services, you agree to be bound by these Terms.
        If you do not agree with any part of these Terms, you must not access or use our Site or services.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">1. Acceptance of Terms</h2>
        <p>
          By using this Site, placing an order, or otherwise engaging with our services, you confirm that you are at least 18 years old and capable of entering into legally binding agreements.
          If you are under 18, you may only use our services with the consent of a parent or legal guardian.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">2. Description of Services</h2>
        <p>
          Premium Gaming provides gaming-related services including but not limited to boosting, leveling, coaching, and account progression ("Services").
          All Services are subject to availability and may be modified or discontinued at any time without prior notice.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">3. User Accounts</h2>
        <p className="mb-2">
          To access certain features of the Site or to purchase Services, you may need to create an account. You agree to:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Provide accurate, current, and complete information during registration.</li>
          <li>Maintain the confidentiality of your login credentials.</li>
          <li>Notify us immediately of any unauthorized use of your account.</li>
        </ul>
        <p className="mt-2">
          We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent or abusive behavior.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">4. Game Account Access</h2>
        <p>
          In order to perform the requested Services, we may require temporary access to your gaming account. You agree to provide valid credentials and ensure that granting such access complies with the terms of service of the relevant game platform.
        </p>
        <p className="mt-2">
          We will treat all account details with strict confidentiality and will not retain access after the completion of the Service unless otherwise agreed upon in writing.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">5. Payment and Refunds</h2>
        <p className="mb-2">
          Payment for Services is processed securely through PayPal or other payment methods listed on the Site. Prices are displayed in USD unless otherwise stated.
        </p>
        <p className="mb-2">
          Refund policies are outlined separately in our Refund Policy. Requests for refunds must be submitted within the specified timeframe and are subject to review.
        </p>
        <p className="mb-2">
          All payments are non-refundable unless explicitly agreed upon or covered under our refund policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">6. Prohibited Conduct</h2>
        <p className="mb-2">
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Use the Site or Services for illegal purposes.</li>
          <li>Attempt to gain unauthorized access to any systems or accounts.</li>
          <li>Interfere with the operation of the Site or Services.</li>
          <li>Impersonate another user or entity.</li>
          <li>Harass, threaten, or defame others.</li>
          <li>Violate the intellectual property rights of others.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">7. Intellectual Property</h2>
        <p>
          All content, trademarks, logos, graphics, and software used on the Site are the property of Premium Gaming or its licensors and are protected by applicable copyright and trademark laws.
          You may not reproduce, distribute, modify, or otherwise use any of our intellectual property without prior written permission.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">8. Disclaimers</h2>
        <p>
          The Site and Services are provided "as is" and "as available" without warranties of any kind, either express or implied.
          We do not warrant that the Site will be error-free, secure, or uninterrupted.
        </p>
        <p className="mt-2">
          We make no representations regarding the accuracy, reliability, or suitability of the content or Services provided.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">9. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, Premium Gaming shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site or Services.
        </p>
        <p className="mt-2">
          Our total liability for any claims arising from the use of the Site or Services shall not exceed the amount paid by you for the relevant Service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">10. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising out of or relating to these Terms or our services shall be resolved in the courts located in the State of [Insert State], and you consent to exclusive jurisdiction and venue in such courts.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">11. Modifications to These Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Any changes will be posted on this page and become effective immediately upon posting.
          Your continued use of the Site or Services after any such changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">12. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsAndConditionsPage;