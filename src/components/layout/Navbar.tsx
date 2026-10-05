'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GGemsLogo from './GGemsLogo';
import Image from 'next/image';

interface NavItem {
  id: string;
  label: string;
  url: string;
  isExternal?: boolean;
  openInNewTab?: boolean;
  isMegaMenu?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  siteName: string;
  phone: string;
  logoUrl?: string | null;
}

export default function Navbar({ items, siteName, logoUrl }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] flex items-center transition-all duration-300 ${
          isOpen
            ? 'bg-white border-b border-zinc-200 shadow-sm'
            : scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-zinc-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]'
            : 'bg-white/90 backdrop-blur-sm border-b border-zinc-100'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo & Brand Identity */}
            <Link href="/" className="flex items-center group shrink-0">
              {/* <GGemsLogo variant="light" /> */}
              <Image
                src={logoUrl || '/images/GGEMS_Sports_Academy_Logo.png'}
                alt={siteName || 'GGems Sports'}
                width={140}
                height={46}
                className="h-10 sm:h-11 w-auto object-contain"
                priority
              />
            </Link>

            {/* Center Navigation Links - Desktop */}
            <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
              {items.map((item) => {
                const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url));
                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    target={item.openInNewTab ? '_blank' : undefined}
                    rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                    className={`relative px-3.5 py-1.5 text-[13px] font-medium tracking-normal transition-colors duration-200 rounded-md ${
                      isActive
                        ? 'text-zinc-950 font-semibold'
                        : 'text-zinc-700 hover:text-black hover:bg-zinc-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#6CD34A] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Button */}
              <div className="relative">
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  aria-label="Search Academy"
                  className="p-2.5 text-zinc-700 hover:text-black hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <Search className="w-4 h-4 stroke-[2.2]" />
                </button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 w-72 bg-white rounded-xl shadow-2xl border border-zinc-200 p-2.5 z-50"
                    >
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (searchQuery.trim()) {
                            window.location.href = `/programs?q=${encodeURIComponent(searchQuery)}`;
                          }
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          placeholder="Search programmes, coaches..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                          className="w-full text-xs px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-900 focus:outline-none focus:border-[#6CD34A]"
                        />
                        <button
                          type="submit"
                          className="px-3 py-2 bg-[#6CD34A] hover:bg-[#4CAF35] text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Go
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Enquire Now Pill CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wide text-white bg-[#6CD34A] hover:bg-[#4CAF35] rounded-full transition-all duration-300 shadow-md shadow-[#6CD34A]/25 hover:shadow-lg hover:shadow-[#6CD34A]/35 active:scale-[0.98] group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden p-2 text-zinc-900 hover:text-[#6CD34A] hover:bg-zinc-100 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6 stroke-[2]" /> : <Menu className="w-6 h-6 stroke-[2]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with Full Height & Smooth Scroll */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-x-0 top-[70px] bottom-0 z-40 bg-white border-t border-zinc-200 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Scrollable list container with proper top padding */}
            <div className="flex-1 overflow-y-auto px-5 pt-3.5 pb-6 flex flex-col">
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Navigation">
                {items.map((item) => {
                  const isActive = pathname === item.url || (item.url !== '/' && pathname.startsWith(item.url));
                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold tracking-tight flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#EAF6E5] text-[#4CAF35] font-bold border border-[#6CD34A]/30'
                          : 'text-zinc-800 hover:bg-zinc-100 hover:text-black'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#6CD34A]" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-5 mt-auto border-t border-zinc-200 flex flex-col gap-3 shrink-0">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#6CD34A] text-white text-sm font-bold tracking-wide uppercase hover:bg-[#4CAF35] shadow-lg shadow-[#6CD34A]/25 transition-all"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 pt-1 pb-2">
                  <span>In Association with Dhairya Bharat Foundation</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
