'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProgrammeBreadcrumbProps {
  title: string;
}

export default function ProgrammeBreadcrumb({ title }: ProgrammeBreadcrumbProps) {
  return (
    <div className="w-full bg-white pt-24 sm:pt-28 pb-3 border-b border-zinc-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium"
        >
          <Link
            href="/"
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2]" />
          <Link
            href="/programmes"
            className="text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            Programmes
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-400 stroke-[2]" />
          <span className="text-[#63D13F] font-bold truncate max-w-[280px] sm:max-w-none">
            {title}
          </span>
        </motion.nav>
      </div>
    </div>
  );
}
