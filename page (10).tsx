import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms & Conditions", description: "Terms and conditions for using CinemaHunt." };

export default function TermsPage() {
  const sections = [
    ["1. Acceptance", "By using CinemaHunt, you agree to these Terms & Conditions. If you do not agree, please do not use the website."],
    ["2. Service", "CinemaHunt is a movie discovery and information website. It provides movie metadata, ratings, release information, cast information, and links or embeds for official trailers when available."],
    ["3. Third-party data and media", "Movie information and imagery may be supplied by third-party services such as TMDB. Official trailer playback may be supplied through YouTube. Those services remain subject to their own terms."],
    ["4. Copyright", "Do not use CinemaHunt to upload, distribute, download, or share copyrighted movies or other material without the necessary rights or permission. CinemaHunt does not intentionally provide unauthorized full-movie streams or downloads."],
    ["5. Accuracy", "We aim to provide useful information, but release dates, ratings, availability, and other movie details can change. Third-party data may contain errors or become outdated."],
    ["6. External services", "CinemaHunt is not responsible for the availability, content, privacy practices, or policies of external websites and services."],
    ["7. Changes", "These Terms may be updated as the website changes. Continued use of CinemaHunt after an update means you accept the revised terms."],
    ["8. Contact", "Questions about these Terms can be sent to eryxx.03@gmail.com."],
  ];
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-4xl px-6 pb-20 pt-28"><p className="text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="mt-3 text-4xl font-black">Terms & Conditions</h1><p className="mt-3 text-gray-500">Last updated: August 14, 2026</p><div className="mt-10 space-y-8 leading-7 text-gray-300">{sections.map(([title, text]) => <section key={title}><h2 className="text-2xl font-bold text-white">{title}</h2><p className="mt-2">{text}</p></section>)}</div></div><Footer /></main>;
}
