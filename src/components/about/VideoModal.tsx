'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  title?: string;
}

export function parseVideoUrl(url?: string | null): {
  type: 'youtube' | 'vimeo' | 'direct' | 'none';
  src: string;
} {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return { type: 'none', src: '' };
  }

  const trimmed = url.trim();

  // YouTube match
  const ytMatch = trimmed.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  if (ytMatch && ytMatch[1]) {
    return {
      type: 'youtube',
      src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`,
    };
  }

  // Vimeo match
  const vimeoMatch = trimmed.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)/);
  if (vimeoMatch && vimeoMatch[3]) {
    return {
      type: 'vimeo',
      src: `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`,
    };
  }

  // Direct MP4 / WebM or local uploaded video
  return {
    type: 'direct',
    src: trimmed,
  };
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title = 'Watch Video',
}: VideoModalProps) {
  const parsed = parseVideoUrl(videoUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Video"
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Player */}
            {parsed.type === 'youtube' || parsed.type === 'vimeo' ? (
              <iframe
                src={parsed.src}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : parsed.type === 'direct' ? (
              <video
                src={parsed.src}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-contain bg-black"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white bg-zinc-900">
                <div className="w-16 h-16 rounded-full bg-[#4CAF35] flex items-center justify-center text-black mb-4">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
                <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
                <p className="text-sm text-zinc-400 max-w-md">
                  No video link configured yet. You can add a YouTube, Vimeo, or direct video URL from the Admin CMS.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
