import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - Cutzy',
    description: 'Privacy Policy for Cutzy URL Shortener',
};

export default function PrivacyPage() {
    return (
        <div className="container max-w-4xl mx-auto py-12">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

            <div className="prose dark:prose-invert max-w-none space-y-6">
                <p className="lead">
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                    <p>
                        Welcome to Cutzy ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy.
                        If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information,
                        please contact us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                    <p>
                        We collect personal information that you voluntarily provide to us when you register on the website,
                        express an interest in obtaining information about us or our products and services, when you participate in activities on the website
                        or otherwise when you contact us.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li><strong>Personal Information Provided by You:</strong> We collect names; email addresses; passwords; and other similar information.</li>
                        <li><strong>Social Media Login Data:</strong> We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter or other social media account.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                    <p>
                        We use personal information collected via our website for a variety of business purposes described below.
                        We process your personal information for these purposes in reliance on our legitimate business interests,
                        in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                    </p>
                    <ul className="list-disc pl-6 mt-2 space-y-2">
                        <li>To facilitate account creation and logon process.</li>
                        <li>To post testimonials.</li>
                        <li>To request feedback.</li>
                        <li>To manage user accounts.</li>
                        <li>To send administrative information to you.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">4. Sharing Your Information</h2>
                    <p>
                        We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">5. Security of Your Information</h2>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information.
                        While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts,
                        no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                    <p>
                        If you have questions or comments about this policy, you may contact us via the contact form on our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
