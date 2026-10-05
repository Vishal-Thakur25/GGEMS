import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Phone, Mail, MapPin, Instagram, Youtube, Facebook, Linkedin, Shield } from 'lucide-react';
import GGemsLogo from './GGemsLogo';

interface FooterProps {
  siteSettings: {
    siteName: string;
    siteTagline: string;
    siteDescription: string;
    phone: string;
    secondaryPhone?: string | null;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    associationText: string;
    instagramUrl: string;
    instagramAltUrl?: string | null;
    youtubeUrl?: string | null;
    facebookUrl?: string | null;
    linkedinUrl?: string | null;
    copyrightText: string;
    footerLogoUrl?: string | null;
  };
  quickLinks: Array<{ id: string; label: string; url: string }>;
}

export default function Footer({ siteSettings, quickLinks }: FooterProps) {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 relative overflow-hidden text-zinc-400">
      {/* Subtle court line background glow */}
      <div className="absolute inset-0 court-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#6CD34A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center group">
              {siteSettings.footerLogoUrl ? (
                <Image
                  src={siteSettings.footerLogoUrl}
                  alt={siteSettings.siteName || 'GGems Sports Academy'}
                  width={150}
                  height={48}
                  className="h-10 w-auto object-contain brightness-105"
                  unoptimized
                />
              ) : (
                <GGemsLogo variant="dark" />
              )}
            </Link>

            <p className="text-xs text-zinc-400 max-w-sm mt-1">
              Building stronger athletes for a brighter tomorrow.
            </p>

            {/* Social Links matching reference icons */}
            <div className="flex items-center gap-2.5 mt-2">
              <a
                href={siteSettings.facebookUrl || "https://facebook.com/ggemssquash"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6CD34A] hover:text-black flex items-center justify-center text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5 fill-current" />
              </a>

              <a
                href={siteSettings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6CD34A] hover:text-black flex items-center justify-center text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>

              <a
                href={siteSettings.youtubeUrl || "https://youtube.com/@ggemssquash"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6CD34A] hover:text-black flex items-center justify-center text-white transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>

              <a
                href={siteSettings.linkedinUrl || "https://linkedin.com/company/ggems-squash"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#6CD34A] hover:text-black flex items-center justify-center text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              {[
                { label: 'Home', url: '/' },
                { label: 'About', url: '/about' },
                { label: 'Programmes', url: '/programs' },
                { label: 'Team', url: '/team' },
                { label: 'Centers', url: '/centers' },
                { label: 'School Partnership', url: '/school-partnership' },
                { label: 'Gallery', url: '/gallery' },
                { label: 'Contact', url: '/contact' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-[#6CD34A] transition-colors flex items-center justify-between group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#6CD34A]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Programmes */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-heading">
              Programmes
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs">
              <li>
                <Link href="/programs/beginners-program" className="hover:text-[#6CD34A] transition-colors">
                  Beginner
                </Link>
              </li>
              <li>
                <Link href="/programs/junior-advance-program" className="hover:text-[#6CD34A] transition-colors">
                  Intermediate
                </Link>
              </li>
              <li>
                <Link href="/programs/professional-program" className="hover:text-[#6CD34A] transition-colors">
                  Competitive
                </Link>
              </li>
              <li>
                <Link href="/programs/development-program" className="hover:text-[#6CD34A] transition-colors">
                  High Performance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Information */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-heading">
              Contact
            </h4>

            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Phone className="w-4 h-4 text-[#6CD34A] shrink-0" />
              <a
                href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                className="hover:text-white font-medium"
              >
                {siteSettings.phone.startsWith('+') ? siteSettings.phone : `+91 ${siteSettings.phone}`}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-zinc-300">
              <Mail className="w-4 h-4 text-[#6CD34A] shrink-0" />
              <a href={`mailto:${siteSettings.email}`} className="hover:text-white">
                {siteSettings.email}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-zinc-400 mt-1">
              <MapPin className="w-4 h-4 text-[#6CD34A] shrink-0 mt-0.5" />
              <div>
                <p>{siteSettings.address}</p>
                <p>
                  {siteSettings.city}, {siteSettings.pincode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 GGems Sports Academy, all rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <span className="text-zinc-700">|</span>
            <Link href="/terms-and-conditions" className="hover:text-zinc-300">
              Terms & Conditions
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-zinc-600 hover:text-[#6CD34A] transition-colors ml-2"
            >
              <Shield className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
