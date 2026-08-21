import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { PageId } from '../types';
import { BrandLogo } from './BrandLogo';
import { Menu, X, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  theme?: 'dark-text' | 'light-text';
}

export const Header: React.FC<HeaderProps> = ({ theme = 'dark-text' }) => {
  const { activePage, setActivePage, setIsCMSOpen } = useCMS();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: { id: PageId; label: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'whos-me', label: "WHO'S ME?" },
    { id: 'works', label: 'WORKS' },
    { id: 'thoughts', label: 'THOUGHTS' },
    { id: 'connect', label: 'CONNECT' },
  ];

  const handleNavClick = (id: PageId) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className="w-full h-[100px] md:h-[140px] flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] transition-all duration-300 z-40 relative max-w-[2100px] mx-auto select-none"
    >
      {/* Brand Logo on the left */}
      <div className="flex items-center">
        <BrandLogo
          variant={theme === 'light-text' ? 'light' : 'dark'}
          onClick={() => handleNavClick('home')}
        />
      </div>

      {/* Desktop Menu items on the right */}
      <nav
        id="desktop-nav-menu"
        aria-label="Main Navigation"
        className="hidden md:flex items-center space-x-8 lg:space-x-12 xl:space-x-14"
      >
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => handleNavClick(item.id)}
              className={`relative flex flex-col items-center py-2 group cursor-pointer transition-colors duration-200 text-xs sm:text-sm lg:text-[15px] font-semibold tracking-[0.08em] ${
                theme === 'light-text'
                  ? isActive
                    ? 'text-white font-bold'
                    : 'text-white/80 hover:text-white'
                  : isActive
                  ? 'text-[#333333] font-bold'
                  : 'text-[#333333]/80 hover:text-[#7ACAD2]'
              }`}
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              {/* Active Cyan Dot Indicator directly above the text (as in Figma design) */}
              <div className="h-2 flex items-center justify-center mb-1">
                {isActive ? (
                  <motion.span
                    layoutId="activeNavDot"
                    className="w-2 h-2 rounded-full bg-[#7ACAD2] shadow-sm shadow-[#7ACAD2]/50"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#7ACAD2]/40 transition-colors" />
                )}
              </div>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* CMS Editor Open Button */}
        <button
          id="cms-editor-header-btn"
          onClick={() => setIsCMSOpen(true)}
          title="Open CMS Content Manager"
          className="ml-4 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] transition-all duration-200 shadow-sm text-xs font-semibold tracking-wider cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>CMS</span>
        </button>
      </nav>

      {/* Mobile Actions */}
      <div className="flex items-center space-x-3 md:hidden">
        <button
          id="cms-mobile-trigger-btn"
          onClick={() => setIsCMSOpen(true)}
          className="p-2 rounded-lg bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] text-xs font-medium flex items-center space-x-1"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>CMS</span>
        </button>

        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-lg transition-colors ${
            theme === 'light-text'
              ? 'text-white hover:bg-white/10'
              : 'text-[#333333] hover:bg-black/5'
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#F6F6F6] text-[#333333] shadow-2xl border-b border-[#333333]/10 py-6 px-8 flex flex-col space-y-4 md:hidden z-50"
          >
            {menuItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between py-2 text-left font-bold text-base tracking-wider ${
                    isActive ? 'text-[#7ACAD2]' : 'text-[#333333] hover:text-[#7ACAD2]'
                  }`}
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2.5 h-2.5 rounded-full bg-[#7ACAD2]" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
