import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Contact CinemaHunt", description: "Contact CinemaHunt with questions, feedback, suggestions, or copyright concerns." };

export default function ContactPage() {
  return <main className="min-h-screen bg-[#050505] text-white"><Navbar /><div className="mx-auto max-w-3xl px-6 pb-20 pt-28"><p className="mb-3 text-sm uppercase tracking-[0.3em] text-red-400">CinemaHunt</p><h1 className="text-4xl font-black">Contact Us</h1><div className="mt-8 rounded-2xl border border-white/10 bg-[#101010] p-8"><h2 className="text-2xl font-bold">Get in touch</h2><p className="mt-3 leading-7 text-gray-400">For questions, feedback, suggestions, or copyright and content concerns, email the CinemaHunt team. Please include the relevant page or movie title when reporting an issue.</p><div className="mt-7 rounded-xl bg-white/[0.03] p-5"><p className="text-sm text-gray-500">Email</p><a href="mailto:eryxx.03@gmail.com" className="mt-1 inline-block text-lg font-semibold text-red-400 hover:text-red-300">eryxx.03@gmail.com</a></div><div className="mt-7 border-t border-white/10 pt-6"><h2 className="text-xl font-bold">Copyright concerns</h2><p className="mt-2 leading-7 text-gray-500">If you believe material on CinemaHunt infringes your rights, contact us with enough information for us to identify and review the relevant material.</p></div></div></div><Footer /></main>;
}
