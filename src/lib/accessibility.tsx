import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  reducedMotion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setFontSize: (size: AccessibilitySettings['fontSize']) => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  fontSizeMultiplier: number;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  highContrast: false,
  reducedMotion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('accessibility-settings');
      if (saved) {
        try {
          return { ...defaultSettings, ...JSON.parse(saved) };
        } catch {
          return defaultSettings;
        }
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
    
    // Apply font size to root
    const multipliers = {
      small: 0.85,
      medium: 1,
      large: 1.15,
      'extra-large': 1.3,
    };
    document.documentElement.style.fontSize = `${multipliers[settings.fontSize] * 100}%`;
    
    // Apply accessibility classes
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings]);

  const setFontSize = useCallback((size: AccessibilitySettings['fontSize']) => {
    setSettings(prev => ({ ...prev, fontSize: size }));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setSettings(prev => ({ ...prev, highContrast: !prev.highContrast }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setSettings(prev => ({ ...prev, reducedMotion: !prev.reducedMotion }));
  }, []);

  const fontSizeMultiplier = {
    small: 0.85,
    medium: 1,
    large: 1.15,
    'extra-large': 1.3,
  }[settings.fontSize];

  return (
    <AccessibilityContext.Provider value={{ settings, setFontSize, toggleHighContrast, toggleReducedMotion, fontSizeMultiplier }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    return {
      settings: defaultSettings,
      setFontSize: () => {},
      toggleHighContrast: () => {},
      toggleReducedMotion: () => {},
      fontSizeMultiplier: 1,
    };
  }
  return context;
}

// Font Size Selector Component
export function FontSizeSelector() {
  const { settings, setFontSize } = useAccessibility();
  
  const sizes = [
    { value: 'small' as const, label: 'A', size: 'text-sm' },
    { value: 'medium' as const, label: 'A', size: 'text-base' },
    { value: 'large' as const, label: 'A', size: 'text-lg' },
    { value: 'extra-large' as const, label: 'A', size: 'text-xl' },
  ];
  
  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-1">
      {sizes.map(s => (
        <button
          key={s.value}
          onClick={() => setFontSize(s.value)}
          className={`px-2 py-1 rounded transition-colors ${
            settings.fontSize === s.value 
              ? 'bg-[#c9a227] text-white' 
              : 'text-white/80 hover:text-white hover:bg-white/10'
          } ${s.size} font-bold`}
          title={`${s.value.charAt(0).toUpperCase() + s.value.slice(1)} font size`}
          aria-label={`Set font size to ${s.value}`}
          aria-pressed={settings.fontSize === s.value}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

// High Contrast Toggle
export function HighContrastToggle() {
  const { settings, toggleHighContrast } = useAccessibility();
  
  return (
    <button
      onClick={toggleHighContrast}
      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
        settings.highContrast 
          ? 'bg-yellow-400 text-black font-medium' 
          : 'bg-white/10 text-white/80 hover:text-white'
      }`}
      aria-pressed={settings.highContrast}
      title="Toggle high contrast mode"
    >
      High Contrast
    </button>
  );
}

// Reduced Motion Toggle
export function ReducedMotionToggle() {
  const { settings, toggleReducedMotion } = useAccessibility();
  
  return (
    <button
      onClick={toggleReducedMotion}
      className={`px-3 py-1 rounded-lg text-sm transition-colors ${
        settings.reducedMotion 
          ? 'bg-purple-500 text-white' 
          : 'bg-white/10 text-white/80 hover:text-white'
      }`}
      aria-pressed={settings.reducedMotion}
      title="Reduce animations"
    >
      Reduce Motion
    </button>
  );
}