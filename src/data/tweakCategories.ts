export const TWEAK_CATEGORIES = [
  "network",
  "memory",
  "gpu",
  "windows_features",
  "firewall_security",
  "nagle_algorithm",
  "network_throttling",
  "system_responsiveness",
  "latency_timers",
] as const;

export type TweakCategory = (typeof TWEAK_CATEGORIES)[number];

export const CATEGORY_ICONS: Record<TweakCategory, string> = {
  network: "🌐",
  memory: "🧠",
  gpu: "🎮",
  windows_features: "⚙️",
  firewall_security: "🛡️",
  nagle_algorithm: "🔧",
  network_throttling: "📊",
  system_responsiveness: "⚡",
  latency_timers: "⏱️",
};

export const CATEGORY_COLORS: Record<
  TweakCategory,
  { color: string; textColor: string; glow: string }
> = {
  network: {
    // Reverting to original Slate as requested ("el que tenia")
    color: "from-slate-600 to-slate-800",
    textColor: "from-slate-400 to-slate-500",
    glow: "shadow-slate-500/20",
  },
  memory: {
    color: "from-fuchsia-900 via-purple-900 to-purple-950",
    textColor: "from-fuchsia-400 to-purple-400",
    glow: "shadow-fuchsia-900/20",
  },
  gpu: {
    color: "from-emerald-900 via-green-900 to-green-950",
    textColor: "from-emerald-400 to-green-400",
    glow: "shadow-emerald-900/20",
  },
  windows_features: {
    color: "from-blue-900 via-indigo-900 to-indigo-950",
    textColor: "from-blue-400 to-indigo-400",
    glow: "shadow-blue-900/20",
  },
  firewall_security: {
    // Reverting to Vibrant Red in case "Red" meant this category
    color: "from-rose-500 via-red-600 to-red-800",
    textColor: "from-rose-400 to-red-400",
    glow: "shadow-rose-500/20",
  },
  nagle_algorithm: {
    color: "from-amber-800 via-orange-900 to-orange-950",
    textColor: "from-amber-400 to-orange-400",
    glow: "shadow-amber-900/20",
  },
  network_throttling: {
    color: "from-pink-900 via-rose-900 to-rose-950",
    textColor: "from-pink-400 to-rose-400",
    glow: "shadow-pink-900/20",
  },
  system_responsiveness: {
    color: "from-violet-900 via-purple-900 to-purple-950",
    textColor: "from-violet-400 to-purple-400",
    glow: "shadow-violet-900/20",
  },
  latency_timers: {
    color: "from-yellow-800 via-amber-900 to-amber-950",
    textColor: "from-yellow-400 to-amber-400",
    glow: "shadow-yellow-900/20",
  },
};
