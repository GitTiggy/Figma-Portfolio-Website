import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ThoughtPost } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calendar, Clock, ArrowRight, X, Plus, Sparkles, Tag } from 'lucide-react';

export const ThoughtsPage: React.FC = () => {
  const { data, selectedThoughtId, setSelectedThoughtId, setIsCMSOpen } = useCMS();
  const [selectedTag, setSelectedTag] = useState<string>('ALL');

  const publishedThoughts = data.thoughts.filter((t) => t.published !== false);

  // Extract all unique tags
  const allTags = ['ALL', ...Array.from(new Set(publishedThoughts.flatMap((t) => t.tags || [])))];

  const filteredThoughts =
    selectedTag === 'ALL'
      ? publishedThoughts
      : publishedThoughts.filter((t) => t.tags && t.tags.includes(selectedTag));

  const activeThought = publishedThoughts.find((t) => t.id === selectedThoughtId);

  return (
    <div
      id="thoughts-page-container"
      className="min-h-screen w-full flex flex-col justify-between bg-[#F6F6F6] text-[#333333] selection:bg-[#7ACAD2] selection:text-[#333333]"
    >
      {/* Header Menu */}
      <Header theme="dark-text" />

      {/* Main Thoughts Content */}
      <main
        id="thoughts-main-content"
        className="w-full max-w-[2100px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] py-6 md:py-10 flex-1"
      >
        {/* Page Heading & Header Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#333333]/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2F2F4] text-[#333333] font-semibold text-xs tracking-wider uppercase mb-3 border border-[#7ACAD2]/30">
              <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
              <span>Design Writing & Perspectives</span>
            </div>
            <h1
              id="thoughts-page-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#333333] tracking-tight"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              Thoughts & Insights
            </h1>
            <p className="mt-2 text-[1rem] text-[#333333]/70 max-w-xl font-normal">
              Essays on user experience design, design systems, visual culture, and the evolving craft of digital product design.
            </p>
          </div>

          <button
            id="cms-add-thought-btn"
            onClick={() => setIsCMSOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] text-xs font-bold tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>WRITE ARTICLE (CMS)</span>
          </button>
        </div>

        {/* Tag Filters */}
        <div className="py-6 flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7ACAD2] text-[#333333] shadow-sm'
                    : 'bg-white text-[#333333]/70 hover:text-[#333333] border border-[#333333]/10 hover:border-[#7ACAD2]'
                }`}
                style={{ fontFamily: 'var(--font-ibrand)' }}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Articles List */}
        <div className="space-y-8 pt-2 pb-16">
          {filteredThoughts.map((thought, idx) => (
            <motion.article
              key={thought.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setSelectedThoughtId(thought.id)}
              className="group p-6 sm:p-8 md:p-10 rounded-2xl bg-white border border-[#333333]/10 shadow-sm hover:shadow-xl hover:border-[#7ACAD2] transition-all duration-300 cursor-pointer flex flex-col md:flex-row gap-8 items-start justify-between"
            >
              <div className="flex-1 space-y-4">
                {/* Meta info: Category, Date, Read Time */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-[#333333]/60 font-semibold">
                  <span className="px-3 py-1 rounded-full bg-[#E2F2F4] text-[#333333] uppercase tracking-wider">
                    {thought.category}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{thought.date}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{thought.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-[#333333] group-hover:text-[#7ACAD2] transition-colors leading-tight"
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  {thought.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm sm:text-base text-[#333333]/80 leading-relaxed font-normal">
                  {thought.excerpt}
                </p>

                {/* Tags & Read More CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {thought.tags?.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F6F6F6] text-[#333333]/70"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>

                  <span className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#333333] group-hover:text-[#7ACAD2] transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              {/* Optional Cover Thumbnail on the right */}
              {thought.coverImage && (
                <div className="w-full md:w-64 lg:w-72 aspect-[16/10] rounded-xl overflow-hidden bg-[#E2F2F4] flex-shrink-0 border border-[#333333]/10">
                  <img
                    src={thought.coverImage}
                    alt={thought.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
            </motion.article>
          ))}

          {filteredThoughts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#333333]/20 p-8">
              <p className="text-lg font-bold text-[#333333]">No thoughts found in this category</p>
              <p className="text-sm text-[#333333]/60 mt-1">
                Write your first design perspective using the CMS.
              </p>
              <button
                onClick={() => setIsCMSOpen(true)}
                className="mt-4 px-5 py-2 rounded-full bg-[#7ACAD2] text-[#333333] font-bold text-xs"
              >
                Write Article
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {activeThought && (
          <div
            id="article-reader-overlay"
            className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
            onClick={() => setSelectedThoughtId(null)}
          >
            <motion.div
              id="article-reader-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#F6F6F6] text-[#333333] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
            >
              {/* Reader Top Bar */}
              <div className="sticky top-0 z-20 bg-[#F6F6F6]/95 backdrop-blur-sm border-b border-[#333333]/10 px-6 sm:px-8 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-xs font-semibold text-[#333333]/70">
                  <span className="px-2.5 py-1 rounded bg-[#7ACAD2] text-[#333333] uppercase">
                    {activeThought.category}
                  </span>
                  <span>{activeThought.readTime}</span>
                </div>

                <button
                  id="close-reader-modal-btn"
                  onClick={() => setSelectedThoughtId(null)}
                  className="p-2 rounded-full hover:bg-black/5 text-[#333333] transition-colors cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Reader Body */}
              <div className="overflow-y-auto p-6 sm:p-10 md:p-12 space-y-6">
                <div>
                  <div className="text-xs font-semibold text-[#333333]/60 mb-2">
                    Published on {activeThought.date} • By Jenina Tiglao
                  </div>
                  <h1
                    className="text-2xl sm:text-4xl font-extrabold text-[#333333] leading-tight"
                    style={{ fontFamily: 'var(--font-ibrand)' }}
                  >
                    {activeThought.title}
                  </h1>
                </div>

                {activeThought.coverImage && (
                  <div className="rounded-xl overflow-hidden border border-[#333333]/10 my-6">
                    <img
                      src={activeThought.coverImage}
                      alt={activeThought.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-64 sm:h-80 object-cover"
                    />
                  </div>
                )}

                {/* Article Content Render */}
                <div className="prose max-w-none text-[#333333] space-y-4 text-base sm:text-lg leading-[1.8] font-normal">
                  {activeThought.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('### ')) {
                      return (
                        <h3
                          key={index}
                          className="text-xl sm:text-2xl font-bold text-[#333333] pt-4"
                          style={{ fontFamily: 'var(--font-ibrand)' }}
                        >
                          {paragraph.replace('### ', '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('- ')) {
                      const items = paragraph.split('\n- ');
                      return (
                        <ul key={index} className="space-y-2 pl-4 list-disc text-sm sm:text-base">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace('- ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="text-[#333333]/90">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                <div className="pt-8 border-t border-[#333333]/10 flex flex-wrap gap-2">
                  {activeThought.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-[#E2F2F4] text-[#333333] text-xs font-semibold"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer theme="dark-on-light" />
    </div>
  );
};
