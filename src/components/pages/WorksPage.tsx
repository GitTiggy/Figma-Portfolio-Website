import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ProjectDetailModal } from '../ProjectDetailModal';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Plus, Sparkles, Filter } from 'lucide-react';

export const WorksPage: React.FC = () => {
  const { data, selectedProjectId, setSelectedProjectId, setIsCMSOpen } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'UI/UX Design',
    'Graphic Design',
    'Branding',
    'Web Design',
    'Mobile App',
  ];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? data.projects
      : data.projects.filter(
          (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  const activeProject = data.projects.find((p) => p.id === selectedProjectId);

  return (
    <div
      id="works-page-container"
      className="min-h-screen w-full flex flex-col justify-between bg-[#F6F6F6] text-[#333333] selection:bg-[#7ACAD2] selection:text-[#333333]"
    >
      {/* Header Menu */}
      <Header theme="dark-text" />

      {/* Main Showcase Content */}
      <main
        id="works-main-content"
        className="w-full max-w-[2100px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] py-6 md:py-10 flex-1"
      >
        {/* Page Title & Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#333333]/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2F2F4] text-[#333333] font-semibold text-xs tracking-wider uppercase mb-3 border border-[#7ACAD2]/30">
              <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
              <span>Selected Portfolio</span>
            </div>
            <h1
              id="works-page-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#333333] tracking-tight"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              Featured Works & Cases
            </h1>
            <p className="mt-2 text-[1rem] text-[#333333]/70 max-w-xl font-normal">
              A curated collection of digital product interfaces, brand identities, design systems, and visual stories.
            </p>
          </div>

          {/* Quick CMS Action to add projects */}
          <div className="flex items-center space-x-3">
            <button
              id="cms-add-project-btn"
              onClick={() => setIsCMSOpen(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] text-xs font-bold tracking-wider transition-all duration-200 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>MANAGE / ADD IN CMS</span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="py-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none max-w-full">
            <Filter className="w-4 h-4 text-[#333333]/40 mr-1 flex-shrink-0" />
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-200 flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#7ACAD2] text-[#333333] shadow-sm'
                      : 'bg-white text-[#333333]/70 hover:text-[#333333] border border-[#333333]/10 hover:border-[#7ACAD2]'
                  }`}
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-[#333333]/60">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4 pb-12"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedProjectId(project.id)}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#333333]/10 shadow-sm hover:shadow-xl hover:border-[#7ACAD2] transition-all duration-300 cursor-pointer"
              >
                {/* Project Thumbnail Image with Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E2F2F4]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  {/* Category Pill Over Image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#F6F6F6]/90 backdrop-blur-sm text-[#333333] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Corner Action Arrow */}
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#7ACAD2] text-[#333333] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                {/* Project Details Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#333333]/60 mb-1">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3
                      className="text-xl font-bold text-[#333333] group-hover:text-[#7ACAD2] transition-colors leading-snug"
                      style={{ fontFamily: 'var(--font-ibrand)' }}
                    >
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#333333]/70 line-clamp-2 leading-relaxed">
                      {project.shortDesc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#333333]/10">
                    {project.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-[#F6F6F6] text-[#333333]/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-medium text-[#333333]/50">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#333333]/20 p-8">
            <p className="text-lg font-bold text-[#333333]">No projects found in this category</p>
            <p className="text-sm text-[#333333]/60 mt-1">
              Select another category or add a new project using the CMS.
            </p>
            <button
              onClick={() => setIsCMSOpen(true)}
              className="mt-4 px-5 py-2 rounded-full bg-[#7ACAD2] text-[#333333] font-bold text-xs"
            >
              Add Project
            </button>
          </div>
        )}
      </main>

      {/* Case Study Detail Modal */}
      {activeProject && (
        <ProjectDetailModal
          project={activeProject}
          onClose={() => setSelectedProjectId(null)}
        />
      )}

      {/* Footer */}
      <Footer theme="dark-on-light" />
    </div>
  );
};
