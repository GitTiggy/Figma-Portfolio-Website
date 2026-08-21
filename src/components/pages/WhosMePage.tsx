import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Briefcase, Award, Palette, Layers, Layout, Terminal } from 'lucide-react';

export const WhosMePage: React.FC = () => {
  const { data, setActivePage, setIsCMSOpen } = useCMS();
  const { profile } = data;

  const serviceIcons: Record<string, React.ReactNode> = {
    Layout: <Layout className="w-6 h-6 text-[#7ACAD2]" />,
    Palette: <Palette className="w-6 h-6 text-[#7ACAD2]" />,
    Layers: <Layers className="w-6 h-6 text-[#7ACAD2]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#7ACAD2]" />,
  };

  return (
    <div
      id="whos-me-page-container"
      className="min-h-screen w-full flex flex-col justify-between bg-[#F6F6F6] text-[#333333] selection:bg-[#7ACAD2] selection:text-[#333333]"
    >
      {/* Header Menu */}
      <Header theme="dark-text" />

      {/* Main Content Area */}
      <main
        id="whos-me-main-content"
        className="w-full max-w-[2100px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] py-6 md:py-12 flex-1"
      >
        {/* Top Hero Bio Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Core Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8"
          >
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#E2F2F4] text-[#333333] font-semibold text-xs tracking-wider uppercase mb-4 border border-[#7ACAD2]/30">
                <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
                <span>{profile.title}</span>
              </div>
              <h1
                id="whos-me-greeting"
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#333333] tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-ibrand)' }}
              >
                {profile.greeting}
              </h1>
              <p
                id="whos-me-short-bio"
                className="mt-4 text-xl sm:text-2xl text-[#333333]/90 font-medium leading-relaxed"
                style={{ fontFamily: 'var(--font-maxima)' }}
              >
                {profile.shortBio}
              </p>
            </div>

            {/* Long Narrative Paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#333333]/80 leading-relaxed font-normal">
              {profile.longBio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Design Philosophy Quote Box */}
            {profile.philosophy && (
              <div
                id="design-philosophy-quote"
                className="p-6 md:p-8 rounded-2xl bg-[#E2F2F4] border-l-4 border-[#7ACAD2] text-[#333333] shadow-sm relative overflow-hidden"
              >
                <div className="text-xs uppercase font-bold tracking-widest text-[#7ACAD2] mb-2">
                  Design Philosophy
                </div>
                <blockquote
                  className="text-lg sm:text-xl font-semibold italic text-[#333333] leading-snug"
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  "{profile.philosophy}"
                </blockquote>
              </div>
            )}

            {/* CTA Group */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="whos-me-connect-cta-btn"
                onClick={() => setActivePage('connect')}
                className="group inline-flex items-center space-x-3 px-8 py-3.5 rounded-full bg-[#333333] text-white font-bold text-sm tracking-wider hover:bg-[#7ACAD2] hover:text-[#333333] transition-all duration-300 shadow-md cursor-pointer"
                style={{ fontFamily: 'var(--font-ibrand)' }}
              >
                <span>LET'S CONNECT</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="whos-me-works-btn"
                onClick={() => setActivePage('works')}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-white text-[#333333] border border-[#333333]/20 font-semibold text-sm tracking-wider hover:border-[#7ACAD2] hover:text-[#7ACAD2] transition-colors"
                style={{ fontFamily: 'var(--font-ibrand)' }}
              >
                <span>VIEW WORKS</span>
              </button>

              <button
                id="whos-me-edit-cms-btn"
                onClick={() => setIsCMSOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-[#333333]/60 hover:text-[#333333] transition-colors px-3 py-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7ACAD2]" />
                <span>Edit Profile in CMS</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Stats Card & Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Quick Metrics Banner */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white border border-[#333333]/10 shadow-sm text-center">
                <div
                  className="text-4xl sm:text-5xl font-black text-[#7ACAD2]"
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  {profile.yearsOfExperience}+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-[#333333]/70 mt-1">
                  Years of Experience
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#333333]/10 shadow-sm text-center">
                <div
                  className="text-4xl sm:text-5xl font-black text-[#333333]"
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  {profile.projectsCompleted}+
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-[#333333]/70 mt-1">
                  Projects Delivered
                </div>
              </div>
            </div>

            {/* Core Competencies & Skills List */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#333333]/10 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-[#333333]/10 pb-4">
                <h3
                  className="text-xl font-bold text-[#333333]"
                  style={{ fontFamily: 'var(--font-ibrand)' }}
                >
                  Skills & Expertise
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#E2F2F4] text-[#333333]">
                  {profile.skills.length} Capabilities
                </span>
              </div>

              <div className="space-y-4">
                {profile.skills.map((skill) => (
                  <div key={skill.id} className="space-y-1.5">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold text-[#333333]">
                      <span>{skill.name}</span>
                      <span className="text-[#7ACAD2] font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F6F6F6] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-[#7ACAD2] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Services & Capabilities Section */}
        <section className="mt-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#333333] tracking-tight"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              What I Bring To The Table
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#333333]/70">
              End-to-end design services from early concept discovery to production-ready design systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {profile.services.map((service) => (
              <div
                key={service.id}
                className="p-6 rounded-2xl bg-white border border-[#333333]/10 shadow-sm hover:shadow-md hover:border-[#7ACAD2]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#E2F2F4] flex items-center justify-center mb-4">
                    {serviceIcons[service.icon] || <Layout className="w-6 h-6 text-[#7ACAD2]" />}
                  </div>
                  <h3
                    className="text-lg font-bold text-[#333333] mb-2"
                    style={{ fontFamily: 'var(--font-ibrand)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#333333]/80 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className="mt-20 mb-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2
              className="text-3xl sm:text-4xl font-extrabold text-[#333333] tracking-tight"
              style={{ fontFamily: 'var(--font-ibrand)' }}
            >
              Career & Journey
            </h2>
            <span className="text-xs text-[#333333]/60 hidden sm:inline">
              Selected Professional Experience
            </span>
          </div>

          <div className="space-y-6">
            {profile.experiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#333333]/10 shadow-sm transition-all hover:border-[#7ACAD2]/50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#333333]/10 pb-4">
                  <div>
                    <h3
                      className="text-xl font-bold text-[#333333]"
                      style={{ fontFamily: 'var(--font-ibrand)' }}
                    >
                      {exp.role}
                    </h3>
                    <span className="text-sm font-semibold text-[#7ACAD2]">{exp.company}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F6F6F6] text-xs font-semibold text-[#333333] w-fit">
                    {exp.period}
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-[#333333]/80 leading-relaxed">
                  {exp.description}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-4 space-y-1.5">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-[#333333]/70">
                        <span className="text-[#7ACAD2] mt-1 font-bold">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer theme="dark-on-light" />
    </div>
  );
};
