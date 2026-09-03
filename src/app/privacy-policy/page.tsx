import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, ChevronRight, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | Yolfin Group",
  description:
    "Official Privacy Policy for Yolfin Group explaining how we collect, use, store, share and protect personal and business data in India and the UAE.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | Yolfin Group",
    description:
      "Official Privacy Policy for Yolfin Group explaining how we collect, use, store, share and protect personal and business data in India and the UAE.",
    url: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-light-green/20 pt-8 pb-10 sm:pt-14 sm:pb-16 border-b border-slate-100">
        <Container className="max-w-4xl space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-green flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-brand-green font-bold">Privacy Policy</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>WEBSITE POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Privacy Policy
          </h1>

          <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
            How Yolfin Group handles personal and business data. Effective and last updated: 1 September 2026.
          </p>

          {/* Privacy in one sentence banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1 mt-4">
            <p className="font-bold text-brand-green uppercase tracking-wider text-xs">
              Privacy in one sentence
            </p>
            <p className="text-slate-700 leading-relaxed">
              We use personal and business data only for clear service, security, legal and operational purposes; we do not sell it; and we apply reasonable confidentiality and protection measures while recognising that no online system can be guaranteed completely secure.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-10 sm:py-14">
        <Container className="max-w-4xl">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
              <p className="font-bold text-navy text-base">Overview</p>
              <p className="leading-relaxed">
                This Privacy Policy is written for Yolfin Group&apos;s website, free-trial booking process and accounting and finance services in India and the UAE. It explains the information we collect, why we use it, when it may be shared, how it is protected and the choices available to individuals and clients.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-navy uppercase tracking-wider text-xs">Contents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div>01 Purpose, scope & legal framework</div>
                <div>02 Who we are & how to contact us</div>
                <div>03 Personal data we may collect</div>
                <div>04 How we obtain personal data</div>
                <div>05 Why we use personal data</div>
                <div>06 Legal grounds & consent</div>
                <div>07 Free-trial & inquiry data</div>
                <div>08 Client records & our processor role</div>
                <div>09 Cookies, analytics & technologies</div>
                <div>10 When we share personal data</div>
                <div>11 International & cross-border processing</div>
                <div>12 Data retention & secure disposal</div>
                <div>13 How we protect data</div>
                <div>14 Security incidents</div>
                <div>15 Privacy rights & requests</div>
                <div>16 Marketing choices</div>
                <div>17 Children&apos;s data</div>
                <div>18 Third-party sites & platforms</div>
                <div>19 Automated decisions & AI</div>
                <div>20 Changes to this Policy</div>
                <div>21 Privacy contact & grievance process</div>
              </div>
            </div>

            {/* 01 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                01 Purpose, scope and legal framework
              </h2>
              <p>
                This Privacy Policy explains how Yolfin Group collects, uses, stores, shares and protects personal data when a person visits our website, contacts us, books a free trial, uploads or sends business records, or receives our services. It applies to website visitors, prospective clients, clients, authorised client representatives, vendors and other business contacts.
              </p>
              <p>
                This Policy is intended to operate consistently with applicable privacy and technology laws, including India&apos;s Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025, the Information Technology Act, 2000 and applicable rules, and the UAE Federal Decree-Law No. 45 of 2021 Regarding the Protection of Personal Data, in each case as brought into force, amended and applicable to the relevant processing.
              </p>
              <p>
                A separate engagement letter, non-disclosure agreement or data processing agreement may provide additional or more specific privacy terms. If a specific written agreement applies, it will control for the client data and service covered by that agreement, to the extent permitted by law.
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                02 Who we are and how to contact us
              </h2>
              <p>
                Yolfin Group provides business support services across India and the UAE. Accounting and finance is the currently active service on our website. Travel management and facility management are displayed as coming soon and are not offered through the website until Yolfin confirms their launch.
              </p>
              <p>
                For this Policy, Yolfin Group is the organisation responsible for the personal data described here, except where we process personal data only on a client&apos;s documented instructions. Our principal contact address is Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India. Privacy questions and requests may be sent to yolfingroup@gmail.com, +91 95629 75022 in India, or +971 55 664 6580 in the UAE.
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                03 Personal data we may collect
              </h2>
              <p>
                The data we collect depends on how a person interacts with us and on the scope of an agreed service. We seek to collect only information that is reasonably necessary for the stated purpose.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li><strong>Identity and contact data:</strong> such as name, business name, job title, email address, telephone or WhatsApp number, postal address and preferred contact method.</li>
                <li><strong>Business profile data:</strong> such as business location, industry, entity type, number of employees, service requirements and information provided in a booking, inquiry or onboarding form.</li>
                <li><strong>Accounting and financial records:</strong> such as invoices, receipts, bank statements, ledgers, payroll records, expense records, tax registrations, GST or VAT information, corporate tax information and supporting documents.</li>
                <li><strong>Information about a client&apos;s employees, customers, vendors, directors, partners or authorised representatives:</strong> when that information appears in records supplied for an agreed service.</li>
                <li><strong>Billing and transaction data for paid services:</strong> including invoice history, payment status and relevant transaction references. We do not need card security codes, one-time passwords or online banking passwords.</li>
                <li><strong>Communications:</strong> including emails, WhatsApp messages, call notes, support requests, feedback, complaints, approvals and instructions.</li>
                <li><strong>Technical and usage data:</strong> such as IP address, device and browser information, referral page, approximate location derived from IP, pages viewed, date and time of access, security logs and cookie or similar technology identifiers where used.</li>
                <li><strong>Compliance and verification data:</strong> where reasonably required to confirm authority, prevent fraud, comply with law or respond to a regulator or government authority.</li>
              </ul>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong className="block text-amber-900 text-xs font-bold uppercase mb-1">Never send secret credentials</strong>
                Yolfin Group will not ask for a bank OTP, debit or credit card PIN, card security code, or a personal online-banking password. Clients should use secure, authorised document-sharing or delegated-access methods instead of sharing secret credentials.
              </div>
            </div>

            {/* 04 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                04 How we obtain personal data
              </h2>
              <p>
                We may obtain data directly from a person through the website, free-trial form, email, telephone, WhatsApp, meetings or documents. We may also obtain data from a client&apos;s authorised representative, from records supplied by a client, from public business registers, from professional advisers, or from service providers used to operate the website and deliver agreed services.
              </p>
              <p>
                If a client gives us personal data about another person, the client must have the legal right and authority to do so, must provide any required notice, and must ensure that the disclosure and our instructed processing are lawful. Clients should avoid sending data that is not relevant to the agreed work.
              </p>
            </div>

            {/* 05 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                05 Why we use personal data
              </h2>
              <p>
                We use personal data for clear business and service purposes. Depending on the interaction, these purposes may include the following:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>Responding to inquiries and contacting a person about requested services.</li>
                <li>Assessing eligibility and scope for the one-month free trial and completing onboarding.</li>
                <li>Providing bookkeeping, reconciliation, payroll support, financial reporting, GST, VAT, corporate tax or other expressly agreed accounting and finance services.</li>
                <li>Reviewing records, identifying missing information, obtaining approvals and delivering reports or work products.</li>
                <li>Preparing proposals, engagement letters, invoices and service communications.</li>
                <li>Operating, maintaining, securing and improving the website and our internal systems.</li>
                <li>Preventing fraud, misuse, unauthorised access, security incidents and unlawful activity.</li>
                <li>Meeting accounting, tax, regulatory, legal, audit, insurance and record-keeping duties.</li>
                <li>Managing complaints, disputes, professional advice and legal claims.</li>
                <li>Sending service updates and, where permitted, relevant marketing communications that can be opted out of at any time.</li>
              </ul>
            </div>

            {/* 06 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                06 Legal grounds and consent
              </h2>
              <p>
                Where applicable law requires a legal basis, we rely on consent, steps requested before entering a contract, performance of a contract, compliance with a legal obligation, protection of legitimate business and security interests, or another basis recognised by applicable law.
              </p>
              <p>
                When consent is the basis, the request will identify the purpose and will be separate from unnecessary processing. Consent may be withdrawn by contacting us. Withdrawal does not affect processing already lawfully completed and may prevent us from providing a service that cannot reasonably be delivered without the relevant data.
              </p>
              <p>
                Providing data marked as mandatory may be necessary to respond to a booking or perform an agreed service. Optional data may be left blank. We will not make optional marketing consent a condition of receiving accounting services.
              </p>
            </div>

            {/* 07 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                07 Free-trial and inquiry data
              </h2>
              <p>
                The free-trial form may request contact and business information needed to understand the requested service. Submitting the form does not require payment and does not automatically create a paid engagement. We may contact the person to verify details, assess scope and explain onboarding requirements.
              </p>
              <p>
                Financial documents should be requested only after Yolfin confirms that the trial can begin and explains the secure method for sending them. If a trial is not started or the inquiry does not proceed, we will retain the inquiry only for as long as reasonably needed for follow-up, fraud prevention, record keeping and legal obligations, after which it will be deleted or anonymised in accordance with our retention process.
              </p>
            </div>

            {/* 08 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                08 Client records and our processor role
              </h2>
              <p>
                For personal data contained in a client&apos;s accounting, payroll, tax, customer, supplier or employee records, the client generally decides why the data is processed and is responsible for its lawful collection and use. Yolfin Group generally processes that data as a service provider on the client&apos;s documented instructions and only for the agreed scope.
              </p>
              <p>
                We expect clients to apply data minimisation, provide required notices, respond to individuals&apos; requests, maintain required consents or other legal grounds, and notify us promptly of any instruction that may be unlawful. We will maintain confidentiality, limit access to authorised personnel and assist with reasonable privacy or security requests as agreed and required by law.
              </p>
            </div>

            {/* 09 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                09 Cookies, analytics and similar technologies
              </h2>
              <p>
                Our website may use cookies, local storage, server logs or similar technologies. Essential technologies support page delivery, security, load balancing, form operation and user preferences. Analytics technologies may help us understand visits and improve performance. Marketing technologies, if introduced, may help measure campaigns.
              </p>
              <p>
                Where required by law, non-essential cookies will not be activated until the visitor gives consent through a cookie banner or preference tool. Visitors may change browser settings or withdraw cookie consent, although disabling essential technologies may affect website functions. The website should identify material third-party analytics or advertising providers in its cookie notice before those tools are enabled.
              </p>
            </div>

            {/* 10 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                10 When we share personal data
              </h2>
              <p>
                We do not sell personal data. We may disclose limited data only when reasonably necessary for the purposes in this Policy, subject to confidentiality and security controls:
              </p>
              <ul className="list-disc pl-6 space-y-1.5 text-slate-600">
                <li>To authorised Yolfin employees, team members and contractors who need access for their work.</li>
                <li>To technology providers supporting hosting, secure storage, backup, email, communications, document exchange, accounting tools, customer support, analytics or cybersecurity.</li>
                <li>To accountants, auditors, tax professionals, lawyers, insurers and other professional advisers where appropriate.</li>
                <li>To banks, payment providers or collection partners for paid services, without giving them data unrelated to the transaction.</li>
                <li>To tax authorities, courts, regulators, law enforcement or other public bodies when required by law or reasonably necessary to protect legal rights and safety.</li>
                <li>In connection with a genuine merger, financing, reorganisation, sale or transfer of all or part of the business, subject to appropriate confidentiality and lawful processing.</li>
                <li>To another party when the relevant person or client has instructed or consented to the disclosure.</li>
              </ul>
            </div>

            {/* 11 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                11 International and cross-border processing
              </h2>
              <p>
                Yolfin supports clients in India and the UAE. Personal data may therefore be accessed, stored or processed in a country different from the person&apos;s location when necessary for the requested service or for a trusted service provider. Data-protection standards and government-access rules may differ between countries.
              </p>
              <p>
                Before making a cross-border transfer, we will consider applicable transfer restrictions and use appropriate contractual, organisational and technical safeguards where required. We may restrict a transfer or choose a different service-delivery method if a lawful and secure transfer cannot reasonably be arranged.
              </p>
            </div>

            {/* 12 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                12 Data retention and secure disposal
              </h2>
              <p>
                We retain personal data only for as long as reasonably necessary for the purpose for which it was collected, the duration of a client relationship, completion of professional work, statutory accounting or tax record periods, dispute and limitation periods, regulatory requirements, security, backup cycles and proof of instructions or consent.
              </p>
              <p>
                Retention periods differ by record type and country. Client engagement records and accounting or tax working files may need to be kept for longer than an inquiry or unsuccessful trial request. When data is no longer required, we take reasonable steps to delete, destroy or irreversibly anonymise it. Backup copies are removed or overwritten according to secure backup cycles and are not restored for ordinary business use after deletion.
              </p>
            </div>

            {/* 13 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                13 How we protect data
              </h2>
              <p>
                We use reasonable and proportionate technical and organisational measures based on the sensitivity, volume and risk of the data. Measures may include role-based access, confidentiality obligations, authentication controls, encryption in transit where supported, protected storage, device and account security, backups, logging, staff awareness, vendor review and secure disposal.
              </p>
              <p>
                No website, transmission method or storage system can be guaranteed completely secure. For that reason, Yolfin does not promise absolute or 100 percent security. Clients and users must also protect their devices, email and WhatsApp accounts, use secure networks, check recipient details and promptly report suspected compromise.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                <strong className="block text-navy text-xs font-bold uppercase mb-1">Confidentiality is a core obligation</strong>
                Access to client financial data is limited to people who require it for the agreed work. Additional confidentiality, non-disclosure and data-processing terms may be included in the engagement documents.
              </div>
            </div>

            {/* 14 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                14 Security incidents
              </h2>
              <p>
                We maintain procedures to assess and respond to suspected loss, unauthorised access, disclosure, alteration or misuse of personal data. If an incident creates a notification duty, we will notify the relevant authority, affected client or affected individuals in the manner and time required by applicable law.
              </p>
              <p>
                A person who believes data shared with Yolfin has been compromised should contact us immediately at the email or phone number in Section 2 and provide enough information for us to investigate. Do not include passwords, OTPs or unnecessary financial information in the incident report.
              </p>
            </div>

            {/* 15 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                15 Privacy rights and requests
              </h2>
              <p>
                Depending on location and applicable law, a person may have rights to receive information about processing, obtain access, correct or update inaccurate data, complete incomplete data, request deletion, withdraw consent, object or restrict certain processing, request transfer of data where recognised, nominate another person where recognised, and use a grievance or complaint process.
              </p>
              <p>
                Requests may be sent to yolfingroup@gmail.com with the subject &apos;Privacy Request&apos;. We may ask for reasonable information to verify identity and authority. We will respond within the time required by applicable law and explain any lawful restriction, extension or refusal. A request may not require deletion of records that must be retained for tax, legal, fraud-prevention, professional or dispute purposes.
              </p>
              <p>
                When Yolfin holds personal data only for a client, we may refer the request to that client or assist the client in responding. A person may also complain to the competent data-protection or regulatory authority where the law provides that right, after using our grievance process where required.
              </p>
            </div>

            {/* 16 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                16 Marketing choices
              </h2>
              <p>
                We may send relevant service news or offers to business contacts where permitted by law. Marketing messages will identify Yolfin Group and provide a reasonable way to opt out. A person may opt out at any time by using the unsubscribe method in the message or contacting us.
              </p>
              <p>
                Opting out of marketing does not stop service, security, billing, legal or operational communications that are necessary for an inquiry or client engagement. We may keep a limited suppression record to respect an opt-out request.
              </p>
            </div>

            {/* 17 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                17 Children&apos;s data
              </h2>
              <p>
                The website and services are intended for businesses and authorised adults and are not directed to children. We do not knowingly invite a child to submit personal data or enter a client engagement. If a client record legitimately contains a child&apos;s data, such as a lawful payroll dependent record, the client must ensure the processing is necessary and lawful and that any required parent or guardian authorisation has been obtained.
              </p>
              <p>
                If we learn that a child submitted data directly without valid authorisation, we will take reasonable steps to delete it, subject to any legal retention duty.
              </p>
            </div>

            {/* 18 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                18 Third-party websites and communication platforms
              </h2>
              <p>
                The website may link to third-party websites or communication platforms such as WhatsApp, email, maps or service-provider pages. Those providers control their own processing, terms and security. This Policy does not govern a third party&apos;s independent practices.
              </p>
              <p>
                Clients should consider the sensitivity of a document before sending it through an ordinary messaging service. Yolfin may require a more secure channel for financial, payroll, identity or tax records. A third-party link is not an endorsement of every service or statement on that site.
              </p>
            </div>

            {/* 19 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                19 Automated decisions and artificial intelligence
              </h2>
              <p>
                We do not use website data to make a solely automated decision that produces a legal or similarly significant effect on a person unless we first provide a specific notice and any choice or review required by law.
              </p>
              <p>
                If technology or artificial intelligence is used to assist document classification, reconciliation, drafting or quality checks, authorised personnel remain responsible for appropriate review. Client-confidential data will not be used to train a public or unrelated model without lawful authority, appropriate contractual safeguards and any required client approval.
              </p>
            </div>

            {/* 20 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                20 Changes to this Policy
              </h2>
              <p>
                We may update this Policy to reflect changes in services, technology, legal requirements or business practices. The current version will be posted on the website with its effective date. If a change materially affects how we use previously collected personal data, we will provide additional notice or obtain consent where required by law.
              </p>
              <p>
                Visitors should review the current Policy before submitting new information. Earlier versions may be requested using the contact details below where records are available.
              </p>
            </div>

            {/* 21 */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                21 Privacy contact and grievance process
              </h2>
              <p>
                Privacy Contact / Grievance Contact: Yolfin Group, Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India. Email: yolfingroup@gmail.com. India phone and WhatsApp: +91 95629 75022. UAE direct phone: +971 55 664 6580.
              </p>
              <p className="text-xs text-slate-500 italic">
                Please state the nature of the request, the relevant relationship with Yolfin, the approximate dates and a safe contact method. We aim to acknowledge a privacy grievance promptly, investigate it fairly and provide a response within the period required by applicable law. Urgent suspected security incidents should be clearly marked &apos;Urgent - Data Security&apos;.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <Mail className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Email Inquiries</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.email}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <Phone className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Telephone & WhatsApp</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.phoneIndiaDisplay} (India)</p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.phoneUAEDisplay} (UAE)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 sm:col-span-2">
                  <p className="font-bold text-navy flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-green shrink-0" />
                    <span>Registered Office</span>
                  </p>
                  <p className="text-slate-600 pl-6">{SITE_CONFIG.contact.address.formatted}</p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
