import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white md:px-16">
      <div className="mx-auto max-w-4xl rounded-xl bg-black p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-white">Privacy Policy</h1>
        <p className="mb-6 text-sm text-white">Effective Date: 01/02/2025</p>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            When you use Lyra Scraper, we may collect the following information:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Basic Personal Information:</strong>
            </li>
            <ul className="list-disc space-y-1 pl-5">
              <li>Name</li>
              <li>Email address</li>
              <li>
                LinkedIn public profile data (including your connections'
                information as made publicly available by LinkedIn)
              </li>
            </ul>
          </ul>
          <p className="mt-4">
            No additional personal or non-personal data is collected beyond your
            LinkedIn connections.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            2. How We Collect Your Information
          </h2>
          <p className="mb-4">
            - <strong>User Input:</strong> Data is collected directly when you
            link your LinkedIn account through Lyra Scraper and create an
            account using Google.
          </p>
          <p>
            - <strong>Cookies:</strong> Lyra Scraper may rely on LinkedIn's use
            of cookies to maintain session information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We only use the collected information to provide core functionality,
            such as:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Displaying and organizing your LinkedIn connections</li>
            <li>Allowing you to search and filter through your connections</li>
          </ul>
          <p className="mt-4">
            We do not sell or share your personal information with third
            parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            4. User Authentication
          </h2>
          <p>
            Lyra Scraper requires users to authenticate using their Google
            account to provide a seamless and secure experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            5. Data Security
          </h2>
          <p className="mb-4">
            We take reasonable measures to protect your information from
            unauthorized access or disclosure. These measures include:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>Secure account authentication through Google</li>
            <li>Limiting access to user data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            6. Data Retention
          </h2>
          <p>
            We retain user information only for as long as necessary to provide
            the services. If you stop using Lyra Scraper, your information will
            no longer be actively accessed or processed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            7. User Rights
          </h2>
          <p className="mb-4">
            You have the following rights regarding your personal information:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>Access:</strong> Request a copy of the information we have
              about you.
            </li>
            <li>
              <strong>Deletion:</strong> Request that we delete your personal
              data.
            </li>
          </ul>
          <p className="mt-4">
            To exercise these rights, please contact us at{" "}
            <a
              href="mailto:dev@lyratechnologies.com.au"
              className="text-blue-600 underline"
            >
              dev@lyratechnologies.com.au
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            8. Cookies and Tracking
          </h2>
          <p>
            Lyra Scraper uses cookies solely through LinkedIn's existing
            infrastructure to manage session data. We do not directly implement
            or use tracking technologies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            9. Compliance with Privacy Laws
          </h2>
          <p className="mb-4">
            Lyra Scraper complies with global privacy regulations, including but
            not limited to:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong>General Data Protection Regulation (GDPR)</strong> for
              users in the European Economic Area (EEA)
            </li>
            <li>
              <strong>California Consumer Privacy Act (CCPA)</strong> for users
              in California
            </li>
            <li>
              <strong>Other applicable privacy regulations worldwide</strong>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            10. Updates to this Privacy Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            users of significant changes by updating the effective date at the
            top of this document and, where appropriate, through the Chrome
            extension itself.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-white">
            11. Contact Information
          </h2>
          <p className="mb-4">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:
          </p>
          <ul className="list-inside list-disc">
            <li>
              Email:{" "}
              <a
                href="mailto:dev@lyratechnologies.com.au"
                className="text-blue-600 underline"
              >
                dev@lyratechnologies.com.au
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
