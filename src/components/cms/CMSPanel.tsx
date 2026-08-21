import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ProjectItem, ThoughtPost } from '../../types';
import defaultHeroBg from '../../assets/images/home_background_1787294216170.jpg';
import {
  X,
  Save,
  Plus,
  Trash2,
  Edit2,
  RotateCcw,
  Download,
  Upload,
  Layers,
  FileText,
  User,
  Home,
  Mail,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { compressImageFile } from '../../utils/imageOptimizer';

export const CMSPanel: React.FC = () => {
  const {
    data,
    isCMSOpen,
    setIsCMSOpen,
    updateHero,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addThought,
    updateThought,
    deleteThought,
    updateConnect,
    resetToDefaults,
    exportJSON,
    importJSON,
    setActivePage,
  } = useCMS();

  const [activeTab, setActiveTab] = useState<'hero' | 'works' | 'thoughts' | 'profile' | 'connect' | 'backup'>('hero');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingThoughtId, setEditingThoughtId] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Local states for live edits
  const [heroForm, setHeroForm] = useState(data.hero);
  const [profileForm, setProfileForm] = useState(data.profile);
  const [connectForm, setConnectForm] = useState(data.connect);

  // Synchronize when data updates
  React.useEffect(() => {
    setHeroForm(data.hero);
    setProfileForm(data.profile);
    setConnectForm(data.connect);
  }, [data]);

  const showStatus = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleSaveHero = () => {
    updateHero(heroForm);
    showStatus('Hero section successfully saved!');
  };

  const handleSaveProfile = () => {
    updateProfile(profileForm);
    showStatus('Profile information saved!');
  };

  const handleSaveConnect = () => {
    updateConnect(connectForm);
    showStatus('Contact & social links saved!');
  };

  const handleCreateNewProject = () => {
    const newId = addProject({
      title: 'New Design Project',
      category: 'UI/UX Design',
      client: 'Client Name',
      year: new Date().getFullYear().toString(),
      role: 'Lead Designer',
      duration: '2 Months',
      shortDesc: 'A brief overview of the project objectives and design deliverables.',
      challenge: 'Describe the main problem users or the business faced.',
      solution: 'Explain your design approach, wireframes, and interactive solutions.',
      impact: 'Metrics or qualitative achievements resulting from the design.',
      coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      tags: ['Figma', 'UI/UX', 'Mobile App'],
      featured: true,
    });
    setEditingProjectId(newId);
    showStatus('Created new project!');
  };

  const handleCreateNewThought = () => {
    const newId = addThought({
      title: 'New Design Perspective',
      excerpt: 'A summary of the core thesis and practical design takeaways.',
      content: 'Write your full thought article here. Use ### for subheadings and - for lists.',
      readTime: '4 min read',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: 'Design Systems',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      tags: ['Design', 'UX'],
      published: true,
    });
    setEditingThoughtId(newId);
    showStatus('Created new thought article!');
  };

  const handleExport = () => {
    const json = exportJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showStatus('Exported CMS configuration JSON!');
  };

  const handleImport = () => {
    if (!importText.trim()) return;
    const success = importJSON(importText);
    if (success) {
      showStatus('Configuration successfully restored!');
      setImportText('');
    } else {
      alert('Invalid JSON format. Please verify the backup file.');
    }
  };

  if (!isCMSOpen) return null;

  return (
    <div
      id="cms-overlay-container"
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end"
      onClick={() => setIsCMSOpen(false)}
    >
      <motion.div
        id="cms-panel-drawer"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#F6F6F6] text-[#333333] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#333333]/15"
      >
        {/* CMS Top Header */}
        <div className="bg-[#333333] text-white px-6 py-4 flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#7ACAD2] text-[#333333] flex items-center justify-center font-black text-sm">
              CMS
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide font-ibrand">
                Content Management System
              </h2>
              <p className="text-[11px] text-white/70">
                Live Portfolio & Case Studies Editor
              </p>
            </div>
          </div>

          <button
            id="cms-close-drawer-btn"
            onClick={() => setIsCMSOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Toast Banner */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white px-6 py-2 text-xs font-semibold flex items-center space-x-2 animate-fadeIn">
            <CheckCircle className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* CMS Navigation Tabs */}
        <div className="bg-[#E2F2F4]/80 border-b border-[#333333]/10 px-4 py-2 flex items-center space-x-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'hero', label: 'Home Hero', icon: <Home className="w-3.5 h-3.5" /> },
            { id: 'works', label: `Works (${data.projects.length})`, icon: <Layers className="w-3.5 h-3.5" /> },
            { id: 'thoughts', label: `Thoughts (${data.thoughts.length})`, icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'profile', label: "Who's Me", icon: <User className="w-3.5 h-3.5" /> },
            { id: 'connect', label: 'Connect', icon: <Mail className="w-3.5 h-3.5" /> },
            { id: 'backup', label: 'Backup', icon: <Download className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingProjectId(null);
                  setEditingThoughtId(null);
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#333333] text-white shadow-sm'
                    : 'text-[#333333]/70 hover:bg-[#7ACAD2]/20 hover:text-[#333333]'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* CMS Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB: HERO SECTION */}
          {activeTab === 'hero' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                <h3 className="font-bold text-lg text-[#333333]">Home Hero Settings</h3>
                <button
                  onClick={() => {
                    handleSaveHero();
                    setActivePage('home');
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold text-xs hover:bg-[#333333] hover:text-white transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save & Preview Home</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#333333]/70 mb-1">
                    Hero Main Title
                  </label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#333333]/70 mb-1">
                    Hero Subtitle / Description
                  </label>
                  <textarea
                    rows={4}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 text-xs leading-relaxed resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold uppercase tracking-wider text-[#333333]/70">
                    Hero Background Image
                  </label>

                  {/* Image Preview & Direct File Uploader */}
                  <div className="p-3 bg-white rounded-xl border border-[#333333]/15 space-y-3">
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-[#242629] border border-[#333333]/10 flex items-center justify-center">
                      <img
                        src={heroForm.backgroundImage}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/60 backdrop-blur-sm text-[10px] text-white font-medium">
                        Current Background Preview
                      </div>
                    </div>

                    {/* File Upload Button & Drag Drop Area */}
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                      <label
                        htmlFor="hero-bg-file-input"
                        className="w-full flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg bg-[#333333] hover:bg-[#7ACAD2] text-white hover:text-[#333333] font-bold text-xs cursor-pointer transition-all duration-200 shadow-sm text-center"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Upload Your Original Image File (.png, .jpg)</span>
                      </label>
                      <input
                        id="hero-bg-file-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              const dataUrl = await compressImageFile(file, 1920, 0.85);
                              setHeroForm((prev) => ({ ...prev, backgroundImage: dataUrl }));
                              updateHero({ ...heroForm, backgroundImage: dataUrl });
                              showStatus('Optimized and uploaded image successfully!');
                            } catch {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  const dataUrl = event.target.result as string;
                                  setHeroForm((prev) => ({ ...prev, backgroundImage: dataUrl }));
                                  updateHero({ ...heroForm, backgroundImage: dataUrl });
                                  showStatus('Uploaded image file successfully!');
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }
                        }}
                      />
                    </div>

                    {/* Or URL Input */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-[#333333]/60 mb-1">
                        Or specify Image URL / Asset Path:
                      </div>
                      <input
                        type="text"
                        value={heroForm.backgroundImage}
                        onChange={(e) => setHeroForm({ ...heroForm, backgroundImage: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#F6F6F6] border border-[#333333]/15 text-xs font-mono"
                        placeholder="https://... or /src/assets/..."
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase text-[#333333]/60 mb-2">
                    Quick Background Presets
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setHeroForm({
                          ...heroForm,
                          backgroundImage: defaultHeroBg,
                        })
                      }
                      className="p-2 rounded-lg border border-[#7ACAD2] bg-[#E2F2F4] text-left text-xs font-semibold"
                    >
                      Mountain Sunset (Default)
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setHeroForm({
                          ...heroForm,
                          backgroundImage:
                            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
                        })
                      }
                      className="p-2 rounded-lg border border-[#333333]/10 bg-white text-left text-xs hover:border-[#7ACAD2]"
                    >
                      Alpine Fog Valley
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WORKS / PROJECTS */}
          {activeTab === 'works' && (
            <div className="space-y-6">
              {!editingProjectId ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                    <div>
                      <h3 className="font-bold text-lg text-[#333333]">Works & Projects</h3>
                      <p className="text-xs text-[#333333]/60">Manage portfolio cases and client deliverables.</p>
                    </div>
                    <button
                      onClick={handleCreateNewProject}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#333333] text-white text-xs font-bold hover:bg-[#7ACAD2] hover:text-[#333333] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-white border border-[#333333]/10 shadow-sm flex items-center justify-between gap-4 hover:border-[#7ACAD2] transition-colors"
                      >
                        <div className="flex items-center space-x-3 overflow-hidden">
                          <img
                            src={proj.coverImage}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#E2F2F4]"
                          />
                          <div className="overflow-hidden">
                            <h4 className="font-bold text-sm text-[#333333] truncate">{proj.title}</h4>
                            <span className="text-xs text-[#7ACAD2] font-semibold">{proj.category}</span>
                            <span className="text-xs text-[#333333]/60 ml-2">• {proj.year}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={() => setEditingProjectId(proj.id)}
                            className="p-2 rounded-lg bg-[#F6F6F6] hover:bg-[#7ACAD2] text-[#333333] transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showStatus('Project deleted');
                              }
                            }}
                            className="p-2 rounded-lg bg-[#F6F6F6] hover:bg-rose-500 hover:text-white text-rose-500 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                // Project Edit Form
                (() => {
                  const proj = data.projects.find((p) => p.id === editingProjectId);
                  if (!proj) return null;
                  return (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                        <button
                          onClick={() => setEditingProjectId(null)}
                          className="text-xs font-bold text-[#333333]/70 hover:text-[#333333]"
                        >
                          ← Back to Projects List
                        </button>
                        <button
                          onClick={() => {
                            setEditingProjectId(null);
                            showStatus('Project changes saved!');
                          }}
                          className="px-4 py-1.5 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold"
                        >
                          Done Editing
                        </button>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(proj.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Category</label>
                          <select
                            value={proj.category}
                            onChange={(e) => updateProject(proj.id, { category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-semibold"
                          >
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Branding">Branding</option>
                            <option value="Web Design">Web Design</option>
                            <option value="Mobile App">Mobile App</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-bold mb-1">Client Name</label>
                          <input
                            type="text"
                            value={proj.client}
                            onChange={(e) => updateProject(proj.id, { client: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Year</label>
                          <input
                            type="text"
                            value={proj.year}
                            onChange={(e) => updateProject(proj.id, { year: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Role</label>
                          <input
                            type="text"
                            value={proj.role}
                            onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Duration</label>
                          <input
                            type="text"
                            value={proj.duration}
                            onChange={(e) => updateProject(proj.id, { duration: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Short Description / Summary</label>
                        <textarea
                          rows={2}
                          value={proj.shortDesc}
                          onChange={(e) => updateProject(proj.id, { shortDesc: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">The Challenge</label>
                        <textarea
                          rows={2}
                          value={proj.challenge}
                          onChange={(e) => updateProject(proj.id, { challenge: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">The Solution</label>
                        <textarea
                          rows={2}
                          value={proj.solution}
                          onChange={(e) => updateProject(proj.id, { solution: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Impact & Results</label>
                        <input
                          type="text"
                          value={proj.impact}
                          onChange={(e) => updateProject(proj.id, { impact: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={proj.coverImage}
                          onChange={(e) => updateProject(proj.id, { coverImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Tags (comma separated)</label>
                        <input
                          type="text"
                          value={proj.tags.join(', ')}
                          onChange={(e) =>
                            updateProject(proj.id, {
                              tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Figma Prototype URL</label>
                          <input
                            type="text"
                            value={proj.figmaUrl || ''}
                            onChange={(e) => updateProject(proj.id, { figmaUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Live Demo / Website URL</label>
                          <input
                            type="text"
                            value={proj.liveUrl || ''}
                            onChange={(e) => updateProject(proj.id, { liveUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* TAB: THOUGHTS / BLOGS */}
          {activeTab === 'thoughts' && (
            <div className="space-y-6">
              {!editingThoughtId ? (
                <>
                  <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                    <div>
                      <h3 className="font-bold text-lg text-[#333333]">Thoughts & Articles</h3>
                      <p className="text-xs text-[#333333]/60">Write and edit design essays and insights.</p>
                    </div>
                    <button
                      onClick={handleCreateNewThought}
                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#333333] text-white text-xs font-bold hover:bg-[#7ACAD2] hover:text-[#333333] transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Write Article</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.thoughts.map((post) => (
                      <div
                        key={post.id}
                        className="p-4 rounded-xl bg-white border border-[#333333]/10 shadow-sm flex items-center justify-between gap-4 hover:border-[#7ACAD2] transition-colors"
                      >
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-sm text-[#333333] truncate">{post.title}</h4>
                          <span className="text-xs text-[#7ACAD2] font-semibold">{post.category}</span>
                          <span className="text-xs text-[#333333]/60 ml-2">• {post.date}</span>
                        </div>

                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button
                            onClick={() => setEditingThoughtId(post.id)}
                            className="p-2 rounded-lg bg-[#F6F6F6] hover:bg-[#7ACAD2] text-[#333333] transition-colors cursor-pointer"
                            title="Edit Thought"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete thought "${post.title}"?`)) {
                                deleteThought(post.id);
                                showStatus('Thought deleted');
                              }
                            }}
                            className="p-2 rounded-lg bg-[#F6F6F6] hover:bg-rose-500 hover:text-white text-rose-500 transition-colors cursor-pointer"
                            title="Delete Thought"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                (() => {
                  const thought = data.thoughts.find((t) => t.id === editingThoughtId);
                  if (!thought) return null;
                  return (
                    <div className="space-y-4 text-xs">
                      <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                        <button
                          onClick={() => setEditingThoughtId(null)}
                          className="text-xs font-bold text-[#333333]/70 hover:text-[#333333]"
                        >
                          ← Back to Thoughts
                        </button>
                        <button
                          onClick={() => {
                            setEditingThoughtId(null);
                            showStatus('Thought article saved!');
                          }}
                          className="px-4 py-1.5 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold"
                        >
                          Done Editing
                        </button>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Article Title</label>
                        <input
                          type="text"
                          value={thought.title}
                          onChange={(e) => updateThought(thought.id, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold mb-1">Category</label>
                          <input
                            type="text"
                            value={thought.category}
                            onChange={(e) => updateThought(thought.id, { category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Read Time</label>
                          <input
                            type="text"
                            value={thought.readTime}
                            onChange={(e) => updateThought(thought.id, { readTime: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                        <div>
                          <label className="block font-bold mb-1">Publish Date</label>
                          <input
                            type="text"
                            value={thought.date}
                            onChange={(e) => updateThought(thought.id, { date: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Excerpt Summary</label>
                        <textarea
                          rows={2}
                          value={thought.excerpt}
                          onChange={(e) => updateThought(thought.id, { excerpt: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Full Article Content (Markdown supported)</label>
                        <textarea
                          rows={8}
                          value={thought.content}
                          onChange={(e) => updateThought(thought.id, { content: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-mono text-[11px]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold mb-1">Cover Image URL</label>
                        <input
                          type="text"
                          value={thought.coverImage}
                          onChange={(e) => updateThought(thought.id, { coverImage: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                        />
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* TAB: WHO'S ME / PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                <h3 className="font-bold text-lg text-[#333333]">Profile & Bio Settings</h3>
                <button
                  onClick={() => {
                    handleSaveProfile();
                    setActivePage('whos-me');
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold text-xs hover:bg-[#333333] hover:text-white transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save & Preview</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Page Greeting</label>
                <input
                  type="text"
                  value={profileForm.greeting}
                  onChange={(e) => setProfileForm({ ...profileForm, greeting: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={profileForm.shortBio}
                  onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Design Philosophy</label>
                <textarea
                  rows={2}
                  value={profileForm.philosophy}
                  onChange={(e) => setProfileForm({ ...profileForm, philosophy: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Years of Experience</label>
                  <input
                    type="number"
                    value={profileForm.yearsOfExperience}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, yearsOfExperience: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Delivered Projects Count</label>
                  <input
                    type="number"
                    value={profileForm.projectsCompleted}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, projectsCompleted: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: CONNECT & SOCIALS */}
          {activeTab === 'connect' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-[#333333]/10 pb-3">
                <h3 className="font-bold text-lg text-[#333333]">Connect & Social Channels</h3>
                <button
                  onClick={() => {
                    handleSaveConnect();
                    setActivePage('connect');
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold text-xs hover:bg-[#333333] hover:text-white transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save & Preview</span>
                </button>
              </div>

              <div>
                <label className="block font-bold mb-1">Heading</label>
                <input
                  type="text"
                  value={connectForm.heading}
                  onChange={(e) => setConnectForm({ ...connectForm, heading: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Subheading</label>
                <textarea
                  rows={2}
                  value={connectForm.subheading}
                  onChange={(e) => setConnectForm({ ...connectForm, subheading: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Direct Contact Email</label>
                  <input
                    type="email"
                    value={connectForm.email}
                    onChange={(e) => setConnectForm({ ...connectForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Location / Timezone</label>
                  <input
                    type="text"
                    value={connectForm.location}
                    onChange={(e) => setConnectForm({ ...connectForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-[#333333]/10">
                <div className="font-bold text-[#333333] mb-3">Social Media URLs (Shown in Footer & Connect)</div>
                <div className="space-y-2.5">
                  <div>
                    <label className="block font-semibold text-[#333333]/70 mb-0.5">Instagram URL</label>
                    <input
                      type="text"
                      value={connectForm.socials.instagram}
                      onChange={(e) =>
                        setConnectForm({
                          ...connectForm,
                          socials: { ...connectForm.socials, instagram: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#333333]/70 mb-0.5">LinkedIn Profile URL</label>
                    <input
                      type="text"
                      value={connectForm.socials.linkedin}
                      onChange={(e) =>
                        setConnectForm({
                          ...connectForm,
                          socials: { ...connectForm.socials, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-[#333333]/70 mb-0.5">Behance Portfolio URL</label>
                    <input
                      type="text"
                      value={connectForm.socials.behance}
                      onChange={(e) =>
                        setConnectForm({
                          ...connectForm,
                          socials: { ...connectForm.socials, behance: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#333333]/15"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BACKUP & EXPORT */}
          {activeTab === 'backup' && (
            <div className="space-y-6 text-xs">
              <div className="border-b border-[#333333]/10 pb-3">
                <h3 className="font-bold text-lg text-[#333333]">Import / Export & Reset</h3>
                <p className="text-xs text-[#333333]/60">Backup your custom portfolio content or reset to defaults.</p>
              </div>

              {/* Export Button */}
              <div className="p-4 rounded-xl bg-white border border-[#333333]/10 space-y-2">
                <h4 className="font-bold text-sm text-[#333333] flex items-center space-x-1.5">
                  <Download className="w-4 h-4 text-[#7ACAD2]" />
                  <span>Download Backup JSON</span>
                </h4>
                <p className="text-[#333333]/70">
                  Export all your projects, blog posts, bio settings, and hero data into a single JSON file.
                </p>
                <button
                  onClick={handleExport}
                  className="mt-2 inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#333333] text-white font-bold hover:bg-[#7ACAD2] hover:text-[#333333] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Backup (.JSON)</span>
                </button>
              </div>

              {/* Import Area */}
              <div className="p-4 rounded-xl bg-white border border-[#333333]/10 space-y-2">
                <h4 className="font-bold text-sm text-[#333333] flex items-center space-x-1.5">
                  <Upload className="w-4 h-4 text-[#7ACAD2]" />
                  <span>Restore from JSON</span>
                </h4>
                <textarea
                  rows={3}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="Paste JSON configuration content here..."
                  className="w-full px-3 py-2 rounded-lg bg-[#F6F6F6] border border-[#333333]/15 font-mono text-[10px]"
                />
                <button
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#7ACAD2] text-[#333333] font-bold disabled:opacity-50 hover:bg-[#333333] hover:text-white transition-colors cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import Data</span>
                </button>
              </div>

              {/* Reset to Defaults */}
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
                <h4 className="font-bold text-sm text-rose-700 flex items-center space-x-1.5">
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset to Default Template Data</span>
                </h4>
                <p className="text-rose-600">
                  This will reset all projects, blog articles, and hero texts back to the original template defaults.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to reset all portfolio contents to initial default values?')) {
                      resetToDefaults();
                      showStatus('Reset to initial defaults');
                    }
                  }}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-rose-600 text-white font-bold hover:bg-rose-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Content</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CMS Bottom Footer */}
        <div className="bg-white border-t border-[#333333]/10 px-6 py-3 flex items-center justify-between text-xs text-[#333333]/60">
          <span>Changes are automatically saved to your browser cache.</span>
          <button
            onClick={() => setIsCMSOpen(false)}
            className="font-bold text-[#333333] hover:text-[#7ACAD2]"
          >
            Close Panel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
