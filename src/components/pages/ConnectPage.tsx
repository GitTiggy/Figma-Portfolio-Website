import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { InstagramIcon, LinkedinIcon, BehanceIcon } from '../BrandLogo';
import { motion } from 'motion/react';
import { Mail, MapPin, CheckCircle2, Copy, Send, MessageSquare, Sparkles } from 'lucide-react';

export const ConnectPage: React.FC = () => {
  const { data, setIsCMSOpen } = useCMS();
  const { connect } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceType: 'UI/UX Design',
    budget: '$3k - $5k',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(connect.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div
      id="connect-page-container"
      className="min-h-screen w-full flex flex-col justify-between bg-[#F6F6F6] text-[#333333] selection:bg-[#7ACAD2] selection:text-[#333333]"
    >
      {/* Header Menu */}
      <Header theme="dark-text" />

      {/* Main Connect Content */}
      <main
        id="connect-main-content"
        className="w-full max-w-[2100px] mx-auto px-6 sm:px-10 md:px-16 lg:px-24 2xl:px-[200px] py-6 md:py-10 flex-1 flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E2F2F4] text-[#333333] font-semibold text-xs tracking-wider uppercase mb-3 border border-[#7ACAD2]/30">
                <span className="w-2 h-2 rounded-full bg-[#7ACAD2]" />
                <span>Get In Touch</span>
              </div>
              <h1
                id="connect-main-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#333333] tracking-tight leading-[1.1]"
                style={{ fontFamily: 'var(--font-ibrand)' }}
              >
                {connect.heading}
              </h1>
              <p
                id="connect-subheading"
                className="mt-4 text-base sm:text-lg text-[#333333]/80 leading-relaxed font-normal"
              >
                {connect.subheading}
              </p>
            </div>

            {/* Email Card with Quick Copy */}
            <div className="p-6 rounded-2xl bg-white border border-[#333333]/10 shadow-sm space-y-4">
              <div className="text-xs uppercase font-bold tracking-wider text-[#333333]/60">
                Direct Email
              </div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#F6F6F6] border border-[#333333]/10">
                <div className="flex items-center space-x-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#7ACAD2] flex-shrink-0" />
                  <span className="text-sm sm:text-base font-bold text-[#333333] truncate">
                    {connect.email}
                  </span>
                </div>
                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#333333] text-white hover:bg-[#7ACAD2] hover:text-[#333333] transition-all text-xs font-semibold flex items-center space-x-1 flex-shrink-0 cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Availability & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#333333]/10 shadow-sm">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#333333]/60 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Availability</span>
                </div>
                <div className="text-sm font-semibold text-[#333333]">
                  {connect.availability}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#333333]/10 shadow-sm">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#333333]/60 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#7ACAD2]" />
                  <span>Location</span>
                </div>
                <div className="text-sm font-semibold text-[#333333]">
                  {connect.location}
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <div className="text-xs uppercase font-bold tracking-wider text-[#333333]/60 mb-3">
                Follow & Connect
              </div>
              <div className="flex items-center space-x-3">
                <a
                  href={connect.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#333333]/10 text-xs font-semibold text-[#333333] hover:border-[#7ACAD2] hover:text-[#7ACAD2] transition-colors shadow-sm"
                >
                  <InstagramIcon className="h-3.5 w-auto" />
                  <span>Instagram</span>
                </a>
                <a
                  href={connect.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#333333]/10 text-xs font-semibold text-[#333333] hover:border-[#7ACAD2] hover:text-[#7ACAD2] transition-colors shadow-sm"
                >
                  <LinkedinIcon className="h-3.5 w-auto" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={connect.socials.behance}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-white border border-[#333333]/10 text-xs font-semibold text-[#333333] hover:border-[#7ACAD2] hover:text-[#7ACAD2] transition-colors shadow-sm"
                >
                  <BehanceIcon className="h-3.5 w-auto" />
                  <span>Behance</span>
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={() => setIsCMSOpen(true)}
                className="inline-flex items-center space-x-1.5 text-xs text-[#333333]/50 hover:text-[#333333] transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#7ACAD2]" />
                <span>Edit Contact Details in CMS</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-[#333333]/10 shadow-xl relative overflow-hidden">
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#E2F2F4] text-[#7ACAD2] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10 text-[#7ACAD2]" />
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#333333]"
                    style={{ fontFamily: 'var(--font-ibrand)' }}
                  >
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-sm sm:text-base text-[#333333]/70 max-w-md mx-auto">
                    Your inquiry regarding <strong className="text-[#333333]">{formData.serviceType}</strong> has been received. I will review your project requirements and reply to <strong className="text-[#333333]">{formData.email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        serviceType: 'UI/UX Design',
                        budget: '$3k - $5k',
                        message: '',
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#7ACAD2] text-[#333333] font-bold text-xs uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="border-b border-[#333333]/10 pb-4">
                    <h2
                      className="text-2xl font-bold text-[#333333]"
                      style={{ fontFamily: 'var(--font-ibrand)' }}
                    >
                      Project Inquiry
                    </h2>
                    <p className="text-xs sm:text-sm text-[#333333]/60 mt-1">
                      Fill in the details below to discuss timelines, scope, or collaboration.
                    </p>
                  </div>

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#333333]/70">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[#F6F6F6] border border-[#333333]/15 text-[#333333] text-sm focus:outline-none focus:border-[#7ACAD2] focus:ring-2 focus:ring-[#7ACAD2]/20 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs uppercase font-bold tracking-wider text-[#333333]/70">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F6F6F6] border border-[#333333]/15 text-[#333333] text-sm focus:outline-none focus:border-[#7ACAD2] focus:ring-2 focus:ring-[#7ACAD2]/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Service Type Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#333333]/70">
                      What are you looking to build?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'UI/UX Design',
                        'Design System',
                        'Brand Identity',
                        'Web Application',
                        'Graphic / Print',
                        'Full-time / Contract',
                      ].map((service) => {
                        const isSelected = formData.serviceType === service;
                        return (
                          <button
                            type="button"
                            key={service}
                            onClick={() => setFormData({ ...formData, serviceType: service })}
                            className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#7ACAD2] text-[#333333] border-[#7ACAD2] font-bold shadow-sm'
                                : 'bg-[#F6F6F6] text-[#333333]/70 border-[#333333]/10 hover:border-[#7ACAD2]'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Options */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#333333]/70">
                      Approximate Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['< $3k', '$3k - $5k', '$5k - $10k', '$10k+'].map((range) => {
                        const isSelected = formData.budget === range;
                        return (
                          <button
                            type="button"
                            key={range}
                            onClick={() => setFormData({ ...formData, budget: range })}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#333333] text-white border-[#333333]'
                                : 'bg-[#F6F6F6] text-[#333333]/70 border-[#333333]/10 hover:border-[#7ACAD2]'
                            }`}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#333333]/70">
                      Project Details & Timeline *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me a bit about your product, your goals, and when you'd like to get started..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F6F6F6] border border-[#333333]/15 text-[#333333] text-sm focus:outline-none focus:border-[#7ACAD2] focus:ring-2 focus:ring-[#7ACAD2]/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="submit-inquiry-btn"
                    className="w-full group flex items-center justify-center space-x-2 py-4 rounded-xl bg-[#333333] text-white font-bold text-sm tracking-wider hover:bg-[#7ACAD2] hover:text-[#333333] transition-all duration-300 shadow-md cursor-pointer"
                    style={{ fontFamily: 'var(--font-ibrand)' }}
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <Footer theme="dark-on-light" />
    </div>
  );
};
