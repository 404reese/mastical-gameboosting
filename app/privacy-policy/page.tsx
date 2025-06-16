import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Premium Gaming',
  description:
    'Our commitment to privacy, security, and data handling practices at Premium Gaming.',
};

const PrivacyPolicyPage = () => {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl mb-6">Privacy Policy</h1>
<p className="mb-4">
  <a href="/" className="text-blue-400 hover:underline">
    Go to home
  </a>
</p>
      <p className="mb-4">Effective Date: 16/06/2025</p>
      <p className="mb-6">
        Welcome to Premium Gaming, located at{' '}
        <a href="https://www.premiumgamings.com"  className="text-blue-400 hover:underline">
          https://www.premiumgamings.com 
        </a>
        . We are committed to protecting your privacy and ensuring the security of your personal information.
        This Privacy Policy explains how we collect, use, share, and protect your data when you visit our website or use our services.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect various types of information from or about you when you interact with our website or services.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Personal Information You Provide:</h3>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li>Contact Information: Name, email address</li>
          <li>Payment Details: Processed securely through PayPal; we do not store full credit card numbers</li>
          <li>Game Account Credentials: Required to fulfill service orders (e.g., leveling up in-game characters)</li>
          <li>Order Details: Service type, game name, and account region</li>
        </ul>

        <h3 className="text-xl font-medium mt-4 mb-2">Automatically Collected Information:</h3>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li>Device and Browser Data: IP address, device type, operating system, browser type</li>
          <li>Usage Data: Pages visited, time spent on site, referring/exit pages, clickstream data</li>
          <li>Cookies and Tracking Technologies: To enhance user experience and gather analytics</li>
        </ul>

        <h3 className="text-xl font-medium mt-4 mb-2">Third-Party Sources:</h3>
        <p>We may receive information from third-party payment processors such as PayPal.</p>

        <p className="mt-4">
          <strong>Note:</strong> We do not knowingly collect personal information from individuals under the age of 13,
          or from users below the age of 16 in the European Union. If you believe a child has provided us with personal data,
          please contact us immediately.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">2. How We Use Your Information</h2>
        <p>We process your personal data for the following purposes:</p>
        <ul className="list-disc ml-5 space-y-1 mt-2">
          <li>To fulfill orders and complete requested services</li>
          <li>To communicate with you regarding your order or support inquiries</li>
          <li>To improve our website, products, and services based on usage trends</li>
          <li>To detect and prevent fraudulent behavior</li>
          <li>To comply with applicable laws, regulations, and court orders</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">3. Sharing of Your Information</h2>
        <p className="mb-2">
          We do not sell, rent, or trade your personal information to third parties for marketing purposes. However, we may share your data with:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>
            <strong>Service Providers:</strong> Payment processors like PayPal, authorized personnel assisting with service fulfillment, and analytics providers like Google Analytics.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if required by law, such as responding to a subpoena, court order, or government investigation.
          </li>
        </ul>
        <p className="mt-4">
          All third-party partners are required to maintain appropriate confidentiality and data protection standards.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">4. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy,
          unless a longer retention period is required by law. Upon request, we will delete or anonymize your data unless legally obligated to keep it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">5. Your Rights and Choices</h2>
        <p className="mb-2">
          Depending on your jurisdiction, you may have certain rights regarding your personal information:
        </p>
        <ul className="list-disc ml-5 space-y-1">
          <li>Request access to the personal data we hold about you</li>
          <li>Update or correct inaccurate personal information</li>
          <li>Request deletion of your personal data</li>
          <li>Object to processing of your data under certain conditions</li>
          <li>Withdraw consent where processing is based on consent</li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, please contact us using the details provided in Section 11.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">6. Use of Cookies and Tracking Technologies</h2>
        <p className="mb-4">
          Our website uses cookies and similar tracking technologies to enhance your browsing experience and provide insights into site usage.
        </p>
        <h3 className="text-xl font-medium mt-4 mb-2">Types of Cookies We Use:</h3>
        <ul className="list-disc ml-5 space-y-1 mb-4">
          <li><strong>Essential Cookies:</strong> Necessary for basic site functionality.</li>
          <li><strong>Performance Cookies:</strong> Help us understand how visitors use the site.</li>
          <li><strong>Analytical Tools:</strong> Google Analytics is used to track anonymous usage statistics.</li>
        </ul>
        <p>
          You can manage cookie preferences through your browser settings. Please note that disabling cookies may affect the performance or functionality of the site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">7. Game Account Access</h2>
        <p>
          To complete certain services (e.g., boosting, leveling), we may need temporary access to your gaming accounts.
          We treat this access with the utmost confidentiality and take steps to secure your credentials.
          All access is deleted upon completion of the service unless otherwise agreed upon.
        </p>
        <p className="mt-2">
          You are responsible for ensuring that granting us access complies with the terms of service of the relevant game platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">8. Data Security</h2>
        <p>
          We implement reasonable technical and organizational measures to protect your data from unauthorized access,
          disclosure, alteration, or destruction. These include SSL encryption for data transmission, secure storage,
          and restricted internal access.
        </p>
        <p className="mt-2">
          While we strive to protect your information, no method of transmission over the internet or electronic storage is completely secure.
          By using our services, you assume the risk associated with the use of your data online.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">9. International Users</h2>
        <p>
          If you are accessing our services from outside the United States, your data may be transferred to, stored, and processed in the U.S.
          or other countries where our servers or service providers are located. These countries may have different data protection laws than your country of residence.
        </p>
        <p className="mt-2">
          By using our services, you consent to such transfers and processing in accordance with this Privacy Policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">10. Policy Updates</h2>
        <p>
          We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements.
          When we make material changes, we will update the “Effective Date” at the top of this page and may also notify you via email or prominent notice on our site.
        </p>
        <p className="mt-2">
          We encourage you to review this policy regularly to stay informed about how we protect your information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl mb-2">11. Contact Us</h2>
        <p>If you have questions, concerns, or requests regarding your personal data, please contact us:</p>
        <p className="mt-2">Email: <a href="mailto:premiumgaming696@gmail.com"  className="text-blue-400 hover:underline">
            premiumgaming696@gmail.com 
          </a></p>
        <p className="mt-1">
          Website:{' '}
          <a href="https://www.premiumgamings.com"  className="text-blue-400 hover:underline">
            https://www.premiumgamings.com 
          </a>
        </p>
        <p className="mt-2">
          We aim to respond to all legitimate requests within 30 days.
        </p>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;