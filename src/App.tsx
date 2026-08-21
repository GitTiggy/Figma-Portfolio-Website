import React from 'react';
import { CMSProvider, useCMS } from './context/CMSContext';
import { HomePage } from './components/pages/HomePage';
import { WhosMePage } from './components/pages/WhosMePage';
import { WorksPage } from './components/pages/WorksPage';
import { ThoughtsPage } from './components/pages/ThoughtsPage';
import { ConnectPage } from './components/pages/ConnectPage';
import { CMSPanel } from './components/cms/CMSPanel';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Sparkles, Layers } from 'lucide-react';

const MainRouter: React.FC = () => {
  const { activePage, isCMSOpen, setIsCMSOpen } = useCMS();

  // Keyboard shortcut: Press Ctrl+E or Cmd+E to toggle CMS editor
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsCMSOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCMSOpen]);

  return (
    <div className="relative min-h-screen bg-[#F6F6F6] text-[#333333] selection:bg-[#7ACAD2] selection:text-[#333333]">
      {/* Page Views with Smooth Motion Transitions */}
      <AnimatePresence mode="wait">
        {activePage === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <HomePage />
          </motion.div>
        )}

        {activePage === 'whos-me' && (
          <motion.div
            key="whos-me"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <WhosMePage />
          </motion.div>
        )}

        {activePage === 'works' && (
          <motion.div
            key="works"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <WorksPage />
          </motion.div>
        )}

        {activePage === 'thoughts' && (
          <motion.div
            key="thoughts"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ThoughtsPage />
          </motion.div>
        )}

        {activePage === 'connect' && (
          <motion.div
            key="connect"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <ConnectPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating CMS Trigger Button (bottom right for easy accessibility) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="floating-cms-trigger-btn"
          onClick={() => setIsCMSOpen(!isCMSOpen)}
          className="group flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] shadow-2xl transition-all duration-300 transform hover:scale-105 border border-white/20 text-xs font-bold tracking-wider cursor-pointer"
          title="Open CMS Dynamic Content Editor"
        >
          <Sparkles className="w-4 h-4 text-[#7ACAD2] group-hover:text-[#333333]" />
          <span>PORTFOLIO CMS</span>
        </button>
      </div>

      {/* Slide-out CMS Content Manager Drawer */}
      <CMSPanel />
    </div>
  );
};

export default function App() {
  return (
    <CMSProvider>
      <MainRouter />
    </CMSProvider>
  );
}
