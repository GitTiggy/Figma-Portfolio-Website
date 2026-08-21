import React from 'react';
import { useCMS } from '../context/CMSContext';
import { ProjectItem } from '../types';
import { X, ExternalLink, Calendar, User, Clock, Tag, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailModalProps {
  project: ProjectItem;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { data, setSelectedProjectId } = useCMS();
  const allProjects = data.projects;
  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div
      id="project-detail-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10"
      onClick={onClose}
    >
      <motion.div
        id="project-detail-modal"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#F6F6F6] text-[#333333] rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 bg-[#F6F6F6]/95 backdrop-blur-sm border-b border-[#333333]/10 px-6 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7ACAD2] text-[#333333]">
              {project.category}
            </span>
            <span className="text-xs text-[#333333]/60 font-medium">
              {project.year} • {project.client}
            </span>
          </div>

          <button
            id="close-project-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/5 text-[#333333] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 md:p-10 space-y-8">
          {/* Main Title & Summary */}
          <div>
            <h2
              className="text-2xl sm:text-4xl font-extrabold text-[#333333] tracking-tight"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              {project.title}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#333333]/80 leading-relaxed font-normal">
              {project.shortDesc}
            </p>
          </div>

          {/* Project Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#E2F2F4]/60 border border-[#7ACAD2]/30 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-[#7ACAD2]" />
              <div>
                <span className="text-[#333333]/60 block text-[10px] uppercase font-semibold">Role</span>
                <span className="font-bold text-[#333333]">{project.role || 'Lead Designer'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-[#7ACAD2]" />
              <div>
                <span className="text-[#333333]/60 block text-[10px] uppercase font-semibold">Year</span>
                <span className="font-bold text-[#333333]">{project.year}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#7ACAD2]" />
              <div>
                <span className="text-[#333333]/60 block text-[10px] uppercase font-semibold">Duration</span>
                <span className="font-bold text-[#333333]">{project.duration || '2-3 Months'}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#7ACAD2]" />
              <div>
                <span className="text-[#333333]/60 block text-[10px] uppercase font-semibold">Client</span>
                <span className="font-bold text-[#333333] truncate max-w-[120px]">{project.client}</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden border border-[#333333]/10 shadow-md">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-[460px] object-cover object-center"
            />
          </div>

          {/* Case Study Sections: Challenge & Solution & Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-white border border-[#333333]/10 space-y-2">
              <h3 className="text-lg font-bold text-[#333333] flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
                <span>The Challenge</span>
              </h3>
              <p className="text-sm text-[#333333]/80 leading-relaxed">
                {project.challenge || 'Understanding user workflows and eliminating friction points.'}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-[#333333]/10 space-y-2">
              <h3 className="text-lg font-bold text-[#333333] flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
                <span>The Solution</span>
              </h3>
              <p className="text-sm text-[#333333]/80 leading-relaxed">
                {project.solution || 'Modular component architecture with intuitive user validation loops.'}
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          {project.impact && (
            <div className="p-6 rounded-xl bg-[#E2F2F4] border border-[#7ACAD2]/40">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#333333] mb-1">
                Project Results & Impact
              </h3>
              <p className="text-base text-[#333333] font-medium leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          {/* Gallery Images */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#333333]" style={{ fontFamily: 'var(--font-ibrand)' }}>
                Visual Artifacts & Process
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#333333]/10 shadow-sm bg-white">
                    <img
                      src={img}
                      alt={`${project.title} gallery ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-48 sm:h-60 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-2">
            <h4 className="text-xs uppercase tracking-wider text-[#333333]/60 font-semibold mb-2">
              Technologies & Competencies
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-md text-xs font-medium bg-[#333333]/5 text-[#333333] border border-[#333333]/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links (Figma / Live Demo) */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#333333]/10">
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] transition-all text-sm font-semibold"
              >
                <span>View in Figma</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#7ACAD2] text-[#333333] hover:bg-black hover:text-white transition-all text-sm font-semibold"
              >
                <span>Live Prototype / Site</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer: Prev / Next Navigation */}
        <div className="sticky bottom-0 bg-[#F6F6F6] border-t border-[#333333]/10 px-6 sm:px-8 py-3 flex items-center justify-between text-xs font-semibold">
          {prevProject ? (
            <button
              onClick={() => setSelectedProjectId(prevProject.id)}
              className="flex items-center space-x-1.5 text-[#333333] hover:text-[#7ACAD2] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="truncate max-w-[140px] sm:max-w-[200px]">Prev: {prevProject.title}</span>
            </button>
          ) : (
            <span />
          )}

          {nextProject && (
            <button
              onClick={() => setSelectedProjectId(nextProject.id)}
              className="flex items-center space-x-1.5 text-[#333333] hover:text-[#7ACAD2] transition-colors ml-auto"
            >
              <span className="truncate max-w-[140px] sm:max-w-[200px]">Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
