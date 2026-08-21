import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Image as ImageIcon, Upload, Check } from 'lucide-react';
import defaultHeroBg from '../../assets/images/home_background_1787294216170.jpg';
import { compressImageFile } from '../../utils/imageOptimizer';

export const HomePage: React.FC = () => {
  const { data, updateHero, setActivePage, setIsCMSOpen } = useCMS();
  const { hero } = data;
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    try {
      const dataUrl = await compressImageFile(file, 1920, 0.85);
      updateHero({
        ...hero,
        backgroundImage: dataUrl,
      });
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (e) {
      console.warn('Image compression fallback:', e);
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          updateHero({
            ...hero,
            backgroundImage: ev.target.result as string,
          });
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleImageFile(file);
    }
  };

  return (
    <div
      id="home-page-container"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full h-screen min-h-[600px] max-h-[1440px] flex flex-col justify-between overflow-hidden bg-[#242629] select-none"
    >
      {/* Drag & Drop Visual Overlay */}
      <AnimatePresence>
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#333333]/80 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-[#7ACAD2] p-8 text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#7ACAD2] text-[#333333] flex items-center justify-center mb-4 animate-bounce">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white font-ibrand">Drop your Image File Here</h3>
            <p className="text-sm text-white/80 mt-2 font-maxima max-w-md">
              Release to instantly set your exact uploaded photograph as the Home background.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification Banner */}
      <AnimatePresence>
        {uploadSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-40 bg-emerald-600 text-white px-5 py-2.5 rounded-full shadow-xl flex items-center space-x-2 text-xs font-bold"
          >
            <Check className="w-4 h-4" />
            <span>Background image updated with your exact uploaded file!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Background Image with Subtle Atmospheric Overlays */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <img
          id="hero-background-image"
          src={hero.backgroundImage || defaultHeroBg}
          alt="Mountain Range Sunrise Background"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== defaultHeroBg) {
              e.currentTarget.src = defaultHeroBg;
            }
          }}
          className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
        />
        {/* Subtle top gradient to ensure header contrast while preserving the natural sky */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-black/60 pointer-events-none" />
      </div>

      {/* Header Menu (140px height, 200px margin on desktop) */}
      <Header theme="dark-text" />

      {/* Hero Content (Positioned down, with exact 100px space between CTAs and footer) */}
      <main
        id="home-hero-main-content"
        className="w-full max-w-[2100px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] z-20 flex-1 flex flex-col justify-end pb-[100px] pt-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl lg:max-w-4xl"
        >
          {/* Hero Main Title */}
          <h1
            id="hero-main-title"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-extrabold text-white tracking-[-0.02em] leading-[1.05] drop-shadow-md"
            style={{ fontFamily: 'var(--font-ibrand)' }}
          >
            {hero.title || 'HELLO WORLD!'}
          </h1>

          {/* Hero Subtitle Description */}
          <p
            id="hero-subtitle-description"
            className="mt-6 md:mt-8 text-[1rem] text-white/95 leading-[1.6] max-w-xl font-normal drop-shadow-sm"
            style={{ fontFamily: 'var(--font-maxima)' }}
          >
            {hero.subtitle}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
            <button
              id="hero-explore-works-btn"
              onClick={() => setActivePage('works')}
              className="group inline-flex items-center space-x-3 px-6 py-3.5 rounded-full bg-[#7ACAD2] text-[#333333] font-bold text-sm md:text-base tracking-wide hover:bg-white hover:text-[#333333] transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              <span>EXPLORE WORKS</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-about-btn"
              onClick={() => setActivePage('whos-me')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 font-semibold text-sm md:text-base tracking-wide hover:bg-white hover:text-[#333333] transition-all duration-300 cursor-pointer"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              <span>WHO'S ME?</span>
            </button>

            {/* Direct Image File Selector */}
            <label
              htmlFor="direct-hero-image-upload"
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 border border-white/10 text-xs font-medium transition-all cursor-pointer"
              title="Click to select your exact image file (.png, .jpg)"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#7ACAD2]" />
              <span>Change Image</span>
            </label>
            <input
              id="direct-hero-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageFile(file);
              }}
            />

            <button
              id="hero-cms-quick-btn"
              onClick={() => setIsCMSOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 border border-white/10 text-xs font-medium transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#7ACAD2]" />
              <span>CMS Editor</span>
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer (100px height, 200px margin on desktop) */}
      <Footer theme="light-on-dark" />
    </div>
  );
};
