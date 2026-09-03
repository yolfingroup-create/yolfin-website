import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight, Mail, Phone, MapPin, ArrowLeft, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms and Conditions | Yolfin Group",
  description:
    "Official Terms and Conditions governing the use of Yolfin Group's public website, the one-month free trial, and accepted business support engagements.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms-and-conditions`,
  },
  openGraph: {
    title: "Terms and Conditions | Yolfin Group",
    description:
      "Official Terms and Conditions governing the use of Yolfin Group's public website, the one-month free trial, and accepted business support engagements.",
    url: `${SITE_CONFIG.url}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
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
            <span className="text-brand-green font-bold">Terms and Conditions</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-light-green border border-emerald-200 text-brand-green font-bold text-xs uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5" />
            <span>WEBSITE POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight leading-tight">
            Terms and Conditions
          </h1>

          <p className="text-slate-muted text-sm sm:text-base leading-relaxed">
            Rules for website use, the free trial and Yolfin services. Effective and last updated: 1 September 2026.
          </p>

          {/* Free-trial commitment banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1 mt-4">
            <p className="font-bold text-brand-green uppercase tracking-wider text-xs">
              Free-trial commitment
            </p>
            <p className="text-slate-700 leading-relaxed">
              The confirmed one-month trial has no service fee, requires no payment card, may be cancelled at any time and does not automatically convert to a paid service. Any continuation requires a separate, clear written agreement on scope and fees.
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
                These Terms and Conditions are written for Yolfin Group&apos;s public website, the one-month free trial and accepted business support engagements. They explain how a booking becomes an engagement, what the free trial includes, each party&apos;s responsibilities, paid-service rules, confidentiality, service limitations and dispute terms.
              </p>
            </div>

            {/* Table of Contents */}
            <div className="space-y-3 pt-2">
              <h2 className="text-lg font-bold text-navy uppercase tracking-wider text-xs">Contents</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
                <div>01 Acceptance of these Terms</div>
                <div>02 About Yolfin Group</div>
                <div>03 Services shown on the website</div>
                <div>04 The one-month free trial</div>
                <div>05 Booking, onboarding & contract formation</div>
                <div>06 Client responsibilities</div>
                <div>07 Yolfin&apos;s service responsibilities</div>
                <div>08 Timelines, dependencies & approvals</div>
                <div>09 Tax, compliance & filing services</div>
                <div>10 Fees, taxes & payment for paid services</div>
                <div>11 Changes in scope & additional work</div>
                <div>12 Cancellation & termination</div>
                <div>13 Refunds</div>
                <div>14 Confidentiality & privacy</div>
                <div>15 Secure communication & credentials</div>
                <div>16 Client data & record ownership</div>
                <div>17 Intellectual property & permitted use</div>
                <div>18 Acceptable website use</div>
                <div>19 Third-party services & links</div>
                <div>20 No audit, legal or investment service unless agreed</div>
                <div>21 Reliance on client information</div>
                <div>22 Warranties & service limitations</div>
                <div>23 Limitation of liability</div>
                <div>24 Client indemnity for unlawful instructions</div>
                <div>25 Force majeure</div>
                <div>26 Complaints & error correction</div>
                <div>27 Governing law & disputes</div>
                <div>28 Notices & electronic communications</div>
                <div>29 Changes to website & Terms</div>
                <div>30 General legal provisions</div>
                <div>31 Contact information</div>
              </div>
            </div>

            {/* 01 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                01 Acceptance of these Terms
              </h2>
              <p>
                These Terms and Conditions govern use of the Yolfin Group website, submission of an inquiry or free-trial booking, and any service for which no separate signed terms have been agreed. By using the website, submitting a form, or instructing Yolfin to begin an accepted service, the user confirms that these Terms have been read and accepted.
              </p>
              <p>
                A person acting for a company, partnership, proprietorship or other organisation confirms that the person is authorised to accept these Terms and provide instructions for that organisation. If the person does not agree or lacks authority, the person must not submit confidential records or instruct work.
              </p>
            </div>

            {/* 02 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                02 About Yolfin Group
              </h2>
              <p>
                Yolfin Group provides business support services from Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India and supports clients in India and the UAE. Contact details are yolfingroup@gmail.com, +91 95629 75022 in India and +971 55 664 6580 in the UAE.
              </p>
              <p>
                The website is intended primarily for business-to-business use. References to &apos;Yolfin&apos;, &apos;we&apos;, &apos;us&apos; or &apos;our&apos; mean Yolfin Group. References to &apos;client&apos;, &apos;you&apos; or &apos;your&apos; mean the business or authorised person using the website or receiving an accepted service.
              </p>
            </div>

            {/* 03 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                03 Services shown on the website
              </h2>
              <p>
                Accounting and finance is the active service. Depending on the written scope, it may include bookkeeping, bank reconciliation, accounts review, payroll support, financial reports, GST, VAT, corporate tax support, compliance coordination and related business support.
              </p>
              <p>
                Travel management and facility management are labelled as coming soon. Their display is informational only and is not an offer or promise that they are available. No booking for a coming-soon service is accepted unless Yolfin separately confirms availability and scope in writing.
              </p>
              <p>
                Website descriptions are summaries. The exact deliverables, reporting period, deadlines, exclusions, client location, assigned team, price and responsibilities will be stated in a proposal, order confirmation, engagement letter or other written service agreement.
              </p>
            </div>

            {/* 04 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                04 The one-month free trial
              </h2>
              <p>
                The website offers an eligible business an opportunity to try an agreed accounting or finance service for one month with no service fee during the confirmed trial period, no payment card requirement and no automatic conversion to a paid plan. The client may cancel the trial at any time by notifying Yolfin.
              </p>
              <p>
                The trial does not start merely when a form is submitted. It begins on the start date confirmed by Yolfin after scope, eligibility, available capacity, required information and secure onboarding are agreed. Unless Yolfin confirms otherwise in writing, the offer is limited to one trial per business, business group, owner or substantially similar requirement.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>The trial scope must be reasonable for one month and may be limited to selected records, one reporting period, onboarding, bookkeeping review, reconciliation or sample reporting.</li>
                <li>Government fees, penalties, filing charges, paid third-party software, courier costs, historical backlog work and specialist professional fees are excluded unless Yolfin expressly agrees otherwise in writing.</li>
                <li>A statutory filing, tax return, audit, certification, representation before an authority or work carrying a fixed legal deadline is not included unless expressly listed and accepted in writing.</li>
                <li>Yolfin may decline or stop a trial for false information, duplicate use, abusive conduct, unlawful instructions, security risk, excessive scope, missing records or lack of capacity.</li>
                <li>At the end of the trial, service stops unless both parties approve a paid plan or engagement in writing. There is no automatic charge.</li>
              </ul>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-medium">
                <strong className="block text-brand-green text-xs font-bold uppercase mb-1">Trial promise</strong>
                No payment during the confirmed trial period. No automatic paid subscription. Cancel anytime. Any paid continuation requires clear written agreement on scope and fees.
              </div>
            </div>

            {/* 05 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                05 Booking, onboarding and contract formation
              </h2>
              <p>
                Submitting a website form is a request for contact, not acceptance by Yolfin and not a guarantee of service. Yolfin may request additional information and may accept or decline the request. A service engagement is formed only when Yolfin confirms acceptance and the parties agree the material scope, start date and any applicable fees.
              </p>
              <p>
                Electronic approvals, email confirmations and authorised WhatsApp instructions may be relied on as written communications where lawful. For material changes, filings, payment instructions or high-risk decisions, Yolfin may require a signed document or a confirmation through another verified channel.
              </p>
              <p>
                If an engagement letter, statement of work, proposal or data-processing agreement conflicts with these website Terms, the more specific written agreement controls for that service. These Terms continue to apply to general website use and matters not addressed in the specific agreement.
              </p>
            </div>

            {/* 06 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                06 Client responsibilities
              </h2>
              <p>
                The quality and timing of accounting work depend on complete, accurate and timely information from the client. The client remains responsible for business decisions, statutory obligations and final approval of reports and filings, except to the extent a written agreement expressly states otherwise.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                <li>Provide complete, accurate, legible and lawful records and explain material transactions, corrections and unusual items.</li>
                <li>Provide information early enough for agreed deadlines and respond promptly to questions and approval requests.</li>
                <li>Keep original source records and independent backups; do not treat Yolfin&apos;s working copy as the only business record.</li>
                <li>Review reports, reconciliations, returns, payroll information and filings and notify Yolfin promptly of errors or changes.</li>
                <li>Ensure that people giving instructions are authorised and tell Yolfin immediately when authority changes.</li>
                <li>Have a lawful basis to share employee, customer, vendor, director and other third-party data and provide required privacy notices.</li>
                <li>Maintain valid registrations, licences, bank arrangements and access to government portals needed for the business.</li>
                <li>Pay agreed fees, taxes, government charges and third-party costs when due.</li>
              </ul>
            </div>

            {/* 07 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                07 Yolfin&apos;s service responsibilities
              </h2>
              <p>
                Yolfin will perform accepted services with reasonable care and skill, use personnel appropriate to the agreed scope, maintain confidentiality, communicate material information discovered during the work, and apply internal review appropriate to the service.
              </p>
              <p>
                Yolfin may allocate work among team members and approved service providers, while remaining responsible for the agreed service. Unless the written scope states otherwise, Yolfin is not required to discover fraud, perform an audit, verify every source document independently or provide continuous monitoring.
              </p>
            </div>

            {/* 08 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                08 Timelines, dependencies and approvals
              </h2>
              <p>
                Any delivery date is based on the scope and information available when it is given. A timeline is an estimate unless the written agreement expressly calls it a fixed commitment. Deadlines may change if records are late, incomplete or inaccurate, the client changes scope, an authority or third party is unavailable, or an event outside Yolfin&apos;s reasonable control occurs.
              </p>
              <p>
                The client must provide approvals by the requested time. Yolfin is not responsible for a missed filing, delayed report, penalty or other consequence caused by late information, late approval, an unavailable portal, incorrect client-supplied data or a duty outside the agreed scope.
              </p>
            </div>

            {/* 09 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                09 Tax, compliance and filing services
              </h2>
              <p>
                Tax, GST, VAT, corporate tax, payroll or regulatory support is provided only to the extent stated in the written scope. Rules, authority practices and deadlines may change. Advice is based on information provided, the law and official guidance reasonably available at the relevant time.
              </p>
              <p>
                The client remains legally responsible for the truth and completeness of a return or filing and must approve it before submission. Yolfin may refuse to submit information that appears false, misleading, incomplete or unlawful. A filing is not treated as completed until the relevant portal or authority provides reasonable evidence of acceptance.
              </p>
              <p>
                Yolfin does not guarantee that an authority will accept a position, that no assessment or inquiry will occur, or that a particular tax outcome will be achieved. Representation in an audit, investigation, appeal or litigation requires a separate written agreement.
              </p>
            </div>

            {/* 10 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                10 Fees, taxes and payment for paid services
              </h2>
              <p>
                No service fee is charged for the confirmed free-trial scope. Paid work begins only after the client accepts a quotation, plan, proposal or engagement that states the fee basis. Fees may be fixed, recurring, hourly, transaction-based or otherwise agreed.
              </p>
              <p>
                Invoices are payable by the due date stated on the invoice or agreement. The client is responsible for applicable taxes, government fees and approved third-party costs. Yolfin will not impose a late fee, deposit, minimum term or non-refundable charge unless it is disclosed in the accepted written agreement and permitted by law.
              </p>
              <p>
                If an invoice remains unpaid, Yolfin may give notice, pause non-urgent work and withhold new deliverables to the extent lawful. Suspending work does not make Yolfin responsible for deadlines that pass because payment or required cooperation was not provided.
              </p>
            </div>

            {/* 11 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                11 Changes in scope and additional work
              </h2>
              <p>
                A request outside the agreed scope may require a revised timeline and additional fee. Yolfin will seek approval before beginning material additional paid work. Examples include historical cleanup, additional entities, new branches, urgent deadlines, authority representation, audit support, data migration and major corrections caused by missing or inaccurate records.
              </p>
              <p>
                A small operational clarification does not necessarily change scope. If the parties disagree, Yolfin may pause the affected task until scope, responsibility, timing and fees are confirmed.
              </p>
            </div>

            {/* 12 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                12 Cancellation and termination
              </h2>
              <p>
                A client may cancel the free trial at any time without a service fee. Cancellation is effective when Yolfin receives the notice. For a paid service, the notice period, minimum term, refund rule and handover duties are those in the accepted engagement. If none are stated, either party may terminate an ongoing month-to-month service on 15 days&apos; written notice.
              </p>
              <p>
                Yolfin may suspend or terminate immediately for unlawful or misleading instructions, abusive or threatening conduct, serious security risk, repeated non-cooperation, misuse of credentials, material breach or non-payment after reasonable notice. Where practical, Yolfin will explain the reason and give a reasonable opportunity to correct a curable breach.
              </p>
              <p>
                Termination does not remove fees already earned, approved third-party costs, confidentiality duties, legal retention duties or rights arising before termination. Yolfin will provide a reasonable handover of completed client-owned records after payment of undisputed amounts and subject to law and the engagement terms.
              </p>
            </div>

            {/* 13 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                13 Refunds
              </h2>
              <p>
                The free trial has no service fee to refund. For paid work, an advance or recurring fee is refundable only as stated in the accepted proposal or engagement and as required by applicable law. Government fees, portal fees, taxes, purchased software, courier charges and completed third-party services are generally non-refundable after they have been incurred with authority.
              </p>
              <p>
                A client who believes an invoice is incorrect should contact Yolfin promptly with the invoice number and reason. The parties will review the undisputed and disputed parts separately. Nothing in this section limits a mandatory statutory remedy that cannot lawfully be excluded.
              </p>
            </div>

            {/* 14 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                14 Confidentiality and privacy
              </h2>
              <p>
                Each party must protect the other party&apos;s confidential information and use it only for the engagement, legal compliance and related business administration. Confidential information does not include information that is lawfully public, already known without restriction, independently developed, or lawfully received from another source without a confidentiality duty.
              </p>
              <p>
                Yolfin processes personal data according to its Privacy Policy and any applicable engagement, non-disclosure or data-processing agreement. The client must not instruct Yolfin to collect, use or disclose data unlawfully. A legally required disclosure may be made to an authority or court; where lawful and practical, the affected party will be notified.
              </p>
            </div>

            {/* 15 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                15 Secure communication and credentials
              </h2>
              <p>
                The client is responsible for protecting its devices, email, WhatsApp, cloud storage and portal accounts. Instructions sent from an authorised contact may be treated as genuine unless Yolfin has reason to doubt them. Both parties should independently verify unusual payment, bank-account, payroll or filing instructions through a trusted channel.
              </p>
              <p>
                Do not send a bank OTP, card PIN, card security code, personal online-banking password or other secret authentication credential to Yolfin. Where portal access is necessary, use lawful delegated access, authorised user accounts or another method agreed with Yolfin. Yolfin may refuse insecure credential sharing.
              </p>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-medium">
                <strong className="block text-amber-900 text-xs font-bold uppercase mb-1">Fraud-prevention check</strong>
                Yolfin will not notify a change of bank account only through an unexpected message. Clients should verify any payment-detail change using a known phone number before transferring funds.
              </div>
            </div>

            {/* 16 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                16 Client data and record ownership
              </h2>
              <p>
                The client retains ownership of source documents and business data supplied by or for the client. Yolfin may make working copies and create internal working papers necessary to perform and evidence the service. Yolfin&apos;s internal methods, review notes, templates and quality-control materials remain Yolfin property unless the engagement expressly states otherwise.
              </p>
              <p>
                The client should download and retain final reports and records. After termination, Yolfin may delete working copies according to its retention policy, subject to legal or professional duties. Restoration from backup, historical retrieval or conversion to a new system may be charged if requested after the ordinary handover.
              </p>
            </div>

            {/* 17 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                17 Intellectual property and permitted use
              </h2>
              <p>
                The website, branding, text, graphics, processes, templates and other Yolfin materials are owned by or licensed to Yolfin and are protected by applicable intellectual-property laws. A visitor may view and print a reasonable copy for internal business evaluation but may not copy, resell, publish, scrape, alter, remove notices from or commercially exploit the website without written permission.
              </p>
              <p>
                After payment of applicable fees, a client may use the final client-specific deliverables for its internal business, compliance and professional-adviser needs. General Yolfin tools, formulas, know-how, templates and pre-existing materials remain Yolfin property. The client receives a non-exclusive licence to the extent they are embedded in a paid deliverable.
              </p>
            </div>

            {/* 18 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                18 Acceptable website use
              </h2>
              <p>
                A user must not use the website or Yolfin systems to commit an offence, violate another person&apos;s rights, upload malware, attempt unauthorised access, disrupt service, test security without permission, impersonate another person, submit false information, harvest data, send spam or avoid usage restrictions.
              </p>
              <p>
                Yolfin may block access, preserve evidence and report suspected unlawful conduct where reasonably necessary. Security research requires prior written permission and an agreed scope.
              </p>
            </div>

            {/* 19 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                19 Third-party services and links
              </h2>
              <p>
                The website and services may use or link to third-party platforms such as hosting, email, WhatsApp, maps, cloud storage, accounting software, payment systems and government portals. Third parties control their own availability, terms, privacy and security. Yolfin is not responsible for an unrelated third-party site merely because it is linked.
              </p>
              <p>
                Where Yolfin selects a provider to perform the agreed service, Yolfin will use reasonable care in selection and appropriate confidentiality controls. Where the client selects or mandates a provider, the client is responsible for its account, licence, configuration and direct fees unless otherwise agreed.
              </p>
            </div>

            {/* 20 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                20 No audit, legal or investment service unless agreed
              </h2>
              <p>
                Ordinary bookkeeping, reconciliation, management reporting and tax support are not an audit, review, assurance engagement, legal opinion, investment recommendation, credit decision or guarantee. Yolfin will not express an audit opinion or legal conclusion unless a properly authorised professional is separately engaged in writing for that purpose.
              </p>
              <p>
                Clients should obtain independent legal, audit, investment, insurance or other specialist advice when the matter requires it. Management remains responsible for internal controls, safeguarding assets, detecting fraud, approving transactions and making business decisions.
              </p>
            </div>

            {/* 21 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                21 Reliance on client information
              </h2>
              <p>
                Yolfin may rely on information and explanations supplied by the client and authorised third parties without independently verifying every item. If information is incomplete, inconsistent or appears unreliable, Yolfin may ask questions, qualify a report, delay work or stop the affected task.
              </p>
              <p>
                A report or advice is prepared for the named client and agreed purpose. A third party should not rely on it without Yolfin&apos;s written consent. If consent is given, additional conditions may apply.
              </p>
            </div>

            {/* 22 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                22 Warranties and service limitations
              </h2>
              <p>
                Yolfin warrants only that an accepted service will be performed with reasonable care and skill. Except for rights that cannot lawfully be excluded, the website is provided on an &apos;as available&apos; basis and may contain temporary errors, interruptions or outdated general information.
              </p>
              <p>
                Yolfin does not guarantee a business result, profit, funding, tax saving, authority approval, absence of penalties, uninterrupted website access or error-free third-party software. Nothing on the public website is a personalised professional opinion. A statement such as &apos;accurate&apos; or &apos;timely&apos; describes Yolfin&apos;s service goal and does not remove the client&apos;s duties or create an absolute guarantee.
              </p>
            </div>

            {/* 23 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                23 Limitation of liability
              </h2>
              <p>
                To the fullest extent permitted by law, neither party is liable to the other for indirect, incidental, special or consequential loss, loss of opportunity, loss of anticipated profit or loss caused by an event outside that party&apos;s reasonable control. This exclusion does not apply where the law does not permit it.
              </p>
              <p>
                Unless a specific engagement states a different lawful cap, Yolfin&apos;s aggregate liability arising from a service will not exceed the fees paid or payable for the affected service during the six months immediately before the event giving rise to the claim. For an unpaid trial, the reference amount is the standard one-month fee quoted for the same scope. This cap does not exclude or limit liability for fraud, wilful misconduct, gross negligence, death or personal injury caused by negligence, or another liability that cannot lawfully be limited.
              </p>
              <p>
                The client must take reasonable steps to reduce avoidable loss and notify Yolfin promptly after discovering an issue so that correction or mitigation remains possible.
              </p>
            </div>

            {/* 24 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                24 Client indemnity for unlawful instructions
              </h2>
              <p>
                To the extent permitted by law, the client will be responsible for third-party claims, penalties and reasonable costs caused by the client&apos;s unlawful data disclosure, infringement, fraud, deliberate misconduct, unauthorised instruction or material breach of these Terms. This responsibility applies only to the extent the loss was caused by the client and does not protect Yolfin from its own fraud, gross negligence or wilful misconduct.
              </p>
            </div>

            {/* 25 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                25 Force majeure
              </h2>
              <p>
                Neither party is responsible for delay or failure caused by an event beyond reasonable control, including natural disaster, widespread power or internet failure, war, civil disturbance, epidemic, government action, labour disruption, cyberattack despite reasonable safeguards, failure of a government portal or material third-party outage.
              </p>
              <p>
                The affected party will notify the other when reasonably practical, take reasonable mitigation steps and resume performance when possible. Payment for completed work and confidentiality obligations are not excused by force majeure.
              </p>
            </div>

            {/* 26 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                26 Complaints and error correction
              </h2>
              <p>
                A client should report a service concern to yolfingroup@gmail.com with the relevant period, deliverable and facts. Yolfin will acknowledge the complaint, review records and propose a reasonable correction or response. An urgent filing or payroll concern should also be reported by phone to +91 95629 75022 or +971 55 664 6580.
              </p>
              <p>
                The parties should cooperate in good faith and allow a reasonable opportunity to correct a remediable error before escalating a claim, except where urgent action is legally necessary. Privacy complaints follow the grievance process in the Privacy Policy.
              </p>
            </div>

            {/* 27 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                27 Governing law and disputes
              </h2>
              <p>
                General use of this website and a service contracted through Yolfin&apos;s India office are governed by the laws of India, without excluding mandatory law that applies because of the client&apos;s location. Subject to any mandatory forum, the courts having jurisdiction in Malappuram, Kerala will have jurisdiction over disputes concerning those matters.
              </p>
              <p>
                A specific engagement for UAE services may state that UAE law and a UAE forum apply. If an engagement letter specifies governing law, jurisdiction, mediation or arbitration, that specific clause controls for the engagement.
              </p>
              <p>
                Before starting formal proceedings, the parties should attempt in good faith for at least 30 days to resolve a dispute through authorised representatives, unless urgent interim relief or a statutory deadline makes that impractical.
              </p>
            </div>

            {/* 28 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                28 Notices and electronic communications
              </h2>
              <p>
                Operational notices may be sent to the latest authorised email address, WhatsApp number or other agreed channel. A legal notice concerning termination, material breach or dispute should be sent by email and, where reasonably necessary, to the registered or principal business address.
              </p>
              <p>
                The client must keep contact details current. A notice is not invalid merely because an outdated address was not updated, provided the sender used the latest address reasonably available.
              </p>
            </div>

            {/* 29 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                29 Changes to the website and these Terms
              </h2>
              <p>
                Yolfin may improve, withdraw or change website content and may update these Terms for legal, security, service or operational reasons. The current version will show its effective date. Changes apply prospectively from publication unless law or an accepted engagement requires another method.
              </p>
              <p>
                A material change to an existing paid engagement will not alter the agreed commercial scope or fee without any consent required by that engagement or law. Continued use of the public website after an updated version takes effect confirms acceptance for later website use.
              </p>
            </div>

            {/* 30 */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                30 General legal provisions
              </h2>
              <p>
                If a provision is invalid or unenforceable, it will be limited or removed only to the minimum extent necessary, and the remaining provisions continue. A delay in enforcing a right is not a waiver. Rights and obligations that by nature should continue after termination will survive.
              </p>
              <p>
                The client may not assign an engagement without Yolfin&apos;s written consent, which will not be unreasonably withheld for a genuine business reorganisation. Yolfin may assign the engagement as part of a genuine business transfer if client confidentiality and applicable law continue to be protected.
              </p>
              <p>
                The parties are independent contractors. These Terms do not create a partnership, joint venture, employment, fiduciary or agency relationship, and neither party may bind the other except through express written authority.
              </p>
              <p>
                These Terms, the Privacy Policy and any accepted engagement documents form the entire agreement for their subject matter and replace earlier inconsistent discussions. Headings are for convenience and do not change meaning.
              </p>
            </div>

            {/* 31 */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy">
                31 Contact information
              </h2>
              <p>
                Yolfin Group, Office No. 11/501, Areekode Road, Kondotty, Malappuram, Kerala 673638, India. Email: yolfingroup@gmail.com. India phone and WhatsApp: +91 95629 75022. UAE direct phone: +971 55 664 6580. Website: https://yolfin-website.vercel.app (or https://yolfin.com).
              </p>
              <p className="text-xs text-slate-500 italic">
                For a booking question, include the business name and preferred contact method. For an invoice or complaint, include the relevant invoice, period or service reference, but do not include passwords, OTPs or unnecessary confidential data in the first message.
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
