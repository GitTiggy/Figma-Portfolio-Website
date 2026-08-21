import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, HeroContent, ProfileContent, ProjectItem, ThoughtPost, ConnectContent, PageId } from '../types';
import { INITIAL_SITE_DATA } from '../data/initialData';

interface CMSContextType {
  data: SiteData;
  activePage: PageId;
  setActivePage: (page: PageId) => void;
  isCMSOpen: boolean;
  setIsCMSOpen: (open: boolean) => void;
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
  selectedThoughtId: string | null;
  setSelectedThoughtId: (id: string | null) => void;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateProfile: (profile: Partial<ProfileContent>) => void;
  addProject: (project: Omit<ProjectItem, 'id'>) => string;
  updateProject: (id: string, updates: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  addThought: (thought: Omit<ThoughtPost, 'id'>) => string;
  updateThought: (id: string, updates: Partial<ThoughtPost>) => void;
  deleteThought: (id: string) => void;
  updateConnect: (connect: Partial<ConnectContent>) => void;
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonStr: string) => boolean;
}

const LOCAL_STORAGE_KEY = 'jenina_tiglao_portfolio_data_v3';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Safe storage helper with quota management and legacy key pruning
function saveToLocalStorage(key: string, data: SiteData) {
  try {
    // Prune legacy keys to maximize available space in browser storage
    try {
      localStorage.removeItem('jenina_tiglao_portfolio_data_v1');
      localStorage.removeItem('jenina_tiglao_portfolio_data_v2');
    } catch {
      // ignore
    }

    localStorage.setItem(key, JSON.stringify(data));
  } catch (e: any) {
    if (
      e?.name === 'QuotaExceededError' ||
      e?.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      e?.code === 22 ||
      e?.number === -2147024882
    ) {
      console.warn('Storage quota limit reached. Optimizing cached dataset for persistence...');
      try {
        // If data contains very large base64 image strings, save a lightweight reference
        const lightweightData: SiteData = {
          ...data,
          hero: {
            ...data.hero,
            backgroundImage:
              data.hero.backgroundImage && data.hero.backgroundImage.length > 500000
                ? INITIAL_SITE_DATA.hero.backgroundImage
                : data.hero.backgroundImage,
          },
        };
        localStorage.setItem(key, JSON.stringify(lightweightData));
      } catch {
        console.warn('Browser storage is full; active session retained safely in application memory.');
      }
    } else {
      console.warn('Local storage write warning:', e);
    }
  }
}

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY) || localStorage.getItem('jenina_tiglao_portfolio_data_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If old 4-liner lorem ipsum was stored, update to the 2-liner
        if (parsed.hero?.subtitle && parsed.hero.subtitle.includes('consequat')) {
          parsed.hero.subtitle = INITIAL_SITE_DATA.hero.subtitle;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to parse saved portfolio data:', e);
    }
    return INITIAL_SITE_DATA;
  });

  const [activePage, setActivePage] = useState<PageId>('home');
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedThoughtId, setSelectedThoughtId] = useState<string | null>(null);

  useEffect(() => {
    saveToLocalStorage(LOCAL_STORAGE_KEY, data);
  }, [data]);

  const updateHero = (updates: Partial<HeroContent>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...updates },
    }));
  };

  const updateProfile = (updates: Partial<ProfileContent>) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const addProject = (newProject: Omit<ProjectItem, 'id'>): string => {
    const id = 'proj-' + Date.now();
    const projectWithId: ProjectItem = { ...newProject, id };
    setData((prev) => ({
      ...prev,
      projects: [projectWithId, ...prev.projects],
    }));
    return id;
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
    if (selectedProjectId === id) {
      setSelectedProjectId(null);
    }
  };

  const addThought = (newThought: Omit<ThoughtPost, 'id'>): string => {
    const id = 'thought-' + Date.now();
    const thoughtWithId: ThoughtPost = { ...newThought, id };
    setData((prev) => ({
      ...prev,
      thoughts: [thoughtWithId, ...prev.thoughts],
    }));
    return id;
  };

  const updateThought = (id: string, updates: Partial<ThoughtPost>) => {
    setData((prev) => ({
      ...prev,
      thoughts: prev.thoughts.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }));
  };

  const deleteThought = (id: string) => {
    setData((prev) => ({
      ...prev,
      thoughts: prev.thoughts.filter((t) => t.id !== id),
    }));
    if (selectedThoughtId === id) {
      setSelectedThoughtId(null);
    }
  };

  const updateConnect = (updates: Partial<ConnectContent>) => {
    setData((prev) => ({
      ...prev,
      connect: {
        ...prev.connect,
        ...updates,
        socials: {
          ...prev.connect.socials,
          ...(updates.socials || {}),
        },
      },
    }));
  };

  const resetToDefaults = () => {
    setData(INITIAL_SITE_DATA);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  const exportJSON = () => {
    return JSON.stringify(data, null, 2);
  };

  const importJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.hero && parsed.profile && parsed.projects && parsed.thoughts && parsed.connect) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  return (
    <CMSContext.Provider
      value={{
        data,
        activePage,
        setActivePage,
        isCMSOpen,
        setIsCMSOpen,
        selectedProjectId,
        setSelectedProjectId,
        selectedThoughtId,
        setSelectedThoughtId,
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
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
