import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy", description: "CinemaHunt privacy policy and information about cookies, advertising, and third-party services." };

export default function PrivacyPolicy() {
  const sections = [
    ["1. Introduction", "CinemaHunt respects your privacy and aims to be transparent about how information may be used when you visit the website."],
    ["2. Information and usage data", "The website may receive basic technical and usage information such as browser type, device information, approximate usage patterns, and pages visited. This information may be used to maintain and improve the service."],
    ["3. Cookies", "CinemaHunt and third-party services may use cookies or similar technologies for functionality, analytics, security, and advertising. Your browser may provide controls for managing cookies."],
    ["4. Advertising", "If Google AdSense or another advertising provider is enabled, that provider may use cookies and similar technologies to deliver and measure advertisements in accordance with its own policies."],
    ["5. Third-party services", "CinemaHunt may use services such as TMDB, YouTube, Vercel, analytics providers, and advertising services. These services have their own privacy practices and terms."],
    ["6. External links", "Links or embedded content may lead to third-party websites. CinemaHunt is not responsible for the privacy practices or content of external services."],
    ["7. Your choices", "You can manage browser cookies and device permissions through your browser or operating-system settings. Some website features may not work as intended if certain technologies are blocked."],
    ["8. Contact", "Questions about this Privacy Policy can be sent through the Contact page."],
    ["9. Changes", "This Privacy Policy may be updated as CinemaHunt's features and services change. Updates will be posted on this page."],
  ];
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-4xl px-6 pb-20 pt-28"><h1 className="text-4xl font-black">Privacy Policy</h1><p className="mt-3 text-gray-500">Last updated: August 14, 2026</p><div className="mt-10 space-y-8 leading-7 text-gray-300">{sections.map(([title, text]) => <section key={title}><h2 className="text-2xl font-bold text-white">{title}</h2><p className="mt-2">{text}</p></section>)}</div></div><Footer /></main>;
}
