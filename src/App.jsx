import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Shuffle,
  Star,
  BarChart3,
  Settings,
  Play,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Upload,
  Award,
  Layers,
  Sparkles,
  Trash2,
  Search,
  ChevronRight,
  Flag,
} from "lucide-react";

// ============================================================================
// 1. CONFIGURATION OFFICIELLE : 8 CATÉGORIES × 50 SÉRIES (20 QUESTIONS / SÉRIE)
// ============================================================================
const CATEGORIES = [
  {
    id: "histoire-mythologie",
    nom: "Histoire et Mythologie",
    description: "Grandes civilisations, événements marquants, dieux, héros et légendes.",
    accent: "from-blue-600 to-cyan-500",
    badgeBg: "bg-blue-500/15 text-cyan-300 border-blue-400/30",
    iconName: "BookOpen",
  },
  {
    id: "geographie-monde",
    nom: "Géographie du Monde",
    description: "Continents, reliefs, fleuves, océans, mers, déserts et régions du globe.",
    accent: "from-sky-600 to-teal-400",
    badgeBg: "bg-sky-500/15 text-sky-300 border-sky-400/30",
    iconName: "Layers",
  },
  {
    id: "capitales-monde",
    nom: "Capitales du Monde",
    description: "Capitales officielles, sièges gouvernementaux et repères géopolitiques.",
    accent: "from-indigo-600 to-cyan-400",
    badgeBg: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
    iconName: "Sparkles",
  },
  {
    id: "drapeaux-monde",
    nom: "Drapeaux du Monde",
    description: "Couleurs, symboles, proportions et identification visuelle des drapeaux.",
    accent: "from-cyan-600 to-blue-400",
    badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
    iconName: "Flag",
  },
  {
    id: "sciences-nature",
    nom: "Sciences et Nature",
    description: "Physique, chimie, biologie, astronomie, règne animal et écosystèmes.",
    accent: "from-blue-700 to-sky-400",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    iconName: "Award",
  },
  {
    id: "arts-litterature",
    nom: "Arts et Littérature",
    description: "Romans, poésie, peinture, sculpture, architecture et mouvements culturels.",
    accent: "from-sky-700 to-cyan-300",
    badgeBg: "bg-sky-500/15 text-cyan-200 border-sky-400/30",
    iconName: "BookOpen",
  },
  {
    id: "sports-loisirs",
    nom: "Sports et Loisirs",
    description: "Compétitions internationales, records, règles, jeux et disciplines sportives.",
    accent: "from-blue-600 to-indigo-400",
    badgeBg: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
    iconName: "Award",
  },
  {
    id: "culture-generale-divers",
    nom: "Culture Générale et Divers",
    description: "Inventions, institutions, expressions, cinéma, économie et savoirs transversaux.",
    accent: "from-cyan-700 to-sky-400",
    badgeBg: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30",
    iconName: "Sparkles",
  },
];

const SERIES_PER_CATEGORY = 50;
const QUESTIONS_PER_SERIES = 20;
const STORAGE_KEY = "connaissance_generale_v1_state";

// ============================================================================
// 2. COMPOSANT DRAPEAU SVG POUR LA CATÉGORIE DRAPEAUX DU MONDE
// ============================================================================
function FlagSvg({ code }) {
  switch (code) {
    case "FR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="10" height="20" fill="#002654" />
          <rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" y="0" width="10" height="20" fill="#CE1126" />
        </svg>
      );
    case "JP":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="6.67" fill="#000000" />
          <rect x="0" y="6.67" width="30" height="6.67" fill="#DD0000" />
          <rect x="0" y="13.34" width="30" height="6.66" fill="#FFCE00" />
        </svg>
      );
    case "IT":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="10" height="20" fill="#009246" />
          <rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" y="0" width="10" height="20" fill="#CE2B37" />
        </svg>
      );
    case "SE":
      return (
        <svg viewBox="0 0 32 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="32" height="20" fill="#006AA7" />
          <rect x="10" y="0" width="4" height="20" fill="#FECC00" />
          <rect x="0" y="8" width="32" height="4" fill="#FECC00" />
        </svg>
      );
    case "CH":
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="24" height="24" fill="#DA291C" />
          <rect x="10" y="5" width="4" height="14" fill="#FFFFFF" />
          <rect x="5" y="10" width="14" height="4" fill="#FFFFFF" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#009B3A" />
          <polygon points="15,2.5 27.5,10 15,17.5 2.5,10" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4.5" fill="#002776" />
          <path d="M10.8,9.2 Q15,7.5 19.2,10.8" stroke="#FFFFFF" strokeWidth="1" fill="none" />
        </svg>
      );
    case "CA":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="7.5" height="20" fill="#FF0000" />
          <rect x="7.5" y="0" width="15" height="20" fill="#FFFFFF" />
          <rect x="22.5" y="0" width="7.5" height="20" fill="#FF0000" />
          <polygon points="15,4.5 16.5,8.5 19.5,8 17.5,10.5 20,12 15.8,12.5 15.8,16 14.2,16 14.2,12.5 10,12 12.5,10.5 10.5,8 13.5,8.5" fill="#FF0000" />
        </svg>
      );
    case "UA":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="10" fill="#0057B7" />
          <rect x="0" y="10" width="30" height="10" fill="#FFD700" />
        </svg>
      );
    case "KR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="4.5" fill="#CD2E3A" />
          <path d="M10.5,10 A2.25,2.25 0 0,1 15,10 A2.25,2.25 0 0,0 19.5,10 A4.5,4.5 0 0,1 10.5,10 Z" fill="#0047A0" />
        </svg>
      );
    default:
      return (
        <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
          {code || "CG"}
        </div>
      );
  }
}

// ============================================================================
// 3. BANQUE INITIALE DE QUESTIONS VÉRIFIÉES (SÉRIE 1 PAR CATÉGORIE)
// ============================================================================
const INITIAL_QUESTIONS = {
  "histoire-mythologie": [
    {
      id: "hm-s1-q1",
      serie: 1,
      question: "En quelle année a eu lieu la chute du mur de Berlin ?",
      options: ["1987", "1989", "1991", "1993"],
      answer: 1,
      explanation: "Le mur de Berlin est tombé dans la nuit du 9 au 10 novembre 1989.",
    },
    {
      id: "hm-s1-q2",
      serie: 1,
      question: "Dans la mythologie grecque, qui est le dieu de la mer et des tremblements de terre ?",
      options: ["Zeus", "Hadès", "Poséidon", "Apollon"],
      answer: 2,
      explanation: "Poséidon règne sur les océans et les séismes, souvent représenté avec son trident.",
    },
    {
      id: "hm-s1-q3",
      serie: 1,
      question: "Qui fut le premier empereur romain ?",
      options: ["Jules César", "Auguste", "Néron", "Trajan"],
      answer: 1,
      explanation: "Octave reçut le titre d'Auguste en 27 av. J.-C. et devint le premier empereur de Rome.",
    },
    {
      id: "hm-s1-q4",
      serie: 1,
      question: "Quel pharaon égyptien est célèbre pour son masque funéraire en or découvert en 1922 ?",
      options: ["Ramsès II", "Toutânkhamon", "Khéops", "Akhenaton"],
      answer: 1,
      explanation: "Howard Carter découvrit le tombeau quasi intact de Toutânkhamon dans la vallée des Rois en 1922.",
    },
    {
      id: "hm-s1-q5",
      serie: 1,
      question: "Dans la mythologie nordique, quel est le nom du marteau de Thor ?",
      options: ["Excalibur", "Gungnir", "Mjöllnir", "Gram"],
      answer: 2,
      explanation: "Mjöllnir est le marteau légendaire de Thor capable de foudroyer et de revenir dans sa main.",
    },
    {
      import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  Shuffle,
  Star,
  BarChart3,
  Settings,
  Play,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Upload,
  Award,
  Layers,
  Sparkles,
  Trash2,
  Search,
  ChevronRight,
  Flag,
} from "lucide-react";

const CATEGORIES = [
  {
    id: "histoire-mythologie",
    nom: "Histoire et Mythologie",
    description: "Grandes civilisations, événements marquants, dieux, héros et légendes.",
    badgeBg: "bg-blue-500/15 text-cyan-300 border-blue-400/30",
  },
  {
    id: "geographie-monde",
    nom: "Géographie du Monde",
    description: "Continents, reliefs, fleuves, océans, mers, déserts et régions du globe.",
    badgeBg: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  },
  {
    id: "capitales-monde",
    nom: "Capitales du Monde",
    description: "Capitales officielles, sièges gouvernementaux et repères géopolitiques.",
    badgeBg: "bg-indigo-500/15 text-indigo-300 border-indigo-400/30",
  },
  {
    id: "drapeaux-monde",
    nom: "Drapeaux du Monde",
    description: "Couleurs, symboles, proportions et identification visuelle des drapeaux.",
    badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
  },
  {
    id: "sciences-nature",
    nom: "Sciences et Nature",
    description: "Physique, chimie, biologie, astronomie, règne animal et écosystèmes.",
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  },
  {
    id: "arts-litterature",
    nom: "Arts et Littérature",
    description: "Romans, poésie, peinture, sculpture, architecture et mouvements culturels.",
    badgeBg: "bg-sky-500/15 text-cyan-200 border-sky-400/30",
  },
  {
    id: "sports-loisirs",
    nom: "Sports et Loisirs",
    description: "Compétitions internationales, records, règles, jeux et disciplines sportives.",
    badgeBg: "bg-indigo-500/15 text-indigo-200 border-indigo-400/30",
  },
  {
    id: "culture-generale-divers",
    nom: "Culture Générale et Divers",
    description: "Inventions, institutions, expressions, cinéma, économie et savoirs transversaux.",
    badgeBg: "bg-cyan-500/15 text-cyan-200 border-cyan-400/30",
  },
];

const SERIES_PER_CATEGORY = 50;
const QUESTIONS_PER_SERIES = 20;
const STORAGE_KEY = "connaissance_generale_v1_state";

function FlagSvg({ code }) {
  switch (code) {
    case "FR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="10" height="20" fill="#002654" />
          <rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" y="0" width="10" height="20" fill="#CE1126" />
        </svg>
      );
    case "JP":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="6" fill="#BC002D" />
        </svg>
      );
    case "DE":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="6.67" fill="#000000" />
          <rect x="0" y="6.67" width="30" height="6.67" fill="#DD0000" />
          <rect x="0" y="13.34" width="30" height="6.66" fill="#FFCE00" />
        </svg>
      );
    case "IT":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="10" height="20" fill="#009246" />
          <rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" y="0" width="10" height="20" fill="#CE2B37" />
        </svg>
      );
    case "SE":
      return (
        <svg viewBox="0 0 32 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="32" height="20" fill="#006AA7" />
          <rect x="10" y="0" width="4" height="20" fill="#FECC00" />
          <rect x="0" y="8" width="32" height="4" fill="#FECC00" />
        </svg>
      );
    case "CH":
      return (
        <svg viewBox="0 0 24 24" className="w-20 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="24" height="24" fill="#DA291C" />
          <rect x="10" y="5" width="4" height="14" fill="#FFFFFF" />
          <rect x="5" y="10" width="14" height="4" fill="#FFFFFF" />
        </svg>
      );
    case "BR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#009B3A" />
          <polygon points="15,2.5 27.5,10 15,17.5 2.5,10" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4.5" fill="#002776" />
        </svg>
      );
    case "CA":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="7.5" height="20" fill="#FF0000" />
          <rect x="7.5" y="0" width="15" height="20" fill="#FFFFFF" />
          <rect x="22.5" y="0" width="7.5" height="20" fill="#FF0000" />
        </svg>
      );
    case "UA":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="10" fill="#0057B7" />
          <rect x="0" y="10" width="30" height="10" fill="#FFD700" />
        </svg>
      );
    case "KR":
      return (
        <svg viewBox="0 0 30 20" className="w-24 h-16 rounded-lg shadow-md border border-white/20">
          <rect x="0" y="0" width="30" height="20" fill="#FFFFFF" />
          <circle cx="15" cy="10" r="4.5" fill="#CD2E3A" />
        </svg>
      );
    default:
      return (
        <div className="w-24 h-16 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
          {code || "CG"}
        </div>
      );
  }
}

const INITIAL_QUESTIONS = {
  "histoire-mythologie": [
    { id: "hm-1", serie: 1, question: "En quelle année a eu lieu la chute du mur de Berlin ?", options: ["1987", "1989", "1991", "1993"], answer: 1, explanation: "Le mur de Berlin est tombé dans la nuit du 9 au 10 novembre 1989." },
    { id: "hm-2", serie: 1, question: "Dans la mythologie grecque, qui est le dieu de la mer ?", options: ["Zeus", "Hadès", "Poséidon", "Apollon"], answer: 2, explanation: "Poséidon règne sur les océans." },
    { id: "hm-3", serie: 1, question: "Qui fut le premier empereur romain ?", options: ["Jules César", "Auguste", "Néron", "Trajan"], answer: 1, explanation: "Auguste est devenu le premier empereur romain en 27 av. J.-C." },
    { id: "hm-4", serie: 1, question: "Dans la mythologie nordique, quel est le nom du marteau de Thor ?", options: ["Excalibur", "Gungnir", "Mjöllnir", "Gram"], answer: 2, explanation: "Mjöllnir est le célèbre marteau de Thor." }
  ],
  "geographie-monde": [
    { id: "gm-1", serie: 1, question: "Quel est le plus long fleuve d'Afrique ?", options: ["Le Congo", "Le Nil", "Le Zambèze", "Le Niger"], answer: 1, explanation: "Le Nil s'étend sur environ 6 650 km." },
    { id: "gm-2", serie: 1, question: "Quel est le plus grand désert chaud du monde ?", options: ["Gobi", "Sahara", "Kalahari", "Atacama"], answer: 1, explanation: "Le Sahara couvre environ 9 millions de km²." }
  ],
  "capitales-monde": [
    { id: "cm-1", serie: 1, question: "Quelle est la capitale du Japon ?", options: ["Kyoto", "Osaka", "Tokyo", "Sapporo"], answer: 2, explanation: "Tokyo est la capitale du Japon." },
    { id: "cm-2", serie: 1, question: "Quelle est la capitale du Canada ?", options: ["Toronto", "Vancouver", "Montréal", "Ottawa"], answer: 3, explanation: "Ottawa est la capitale fédérale du Canada." }
  ],
    "drapeaux-monde": [
    { id: "dm-1", serie: 1, question: "À quel pays appartient ce drapeau ?", flagCode: "FR", options: ["Pays-Bas", "France", "Luxembourg", "Russie"], answer: 1, explanation: "Bleu, blanc, rouge : le drapeau de la France." },
    { id: "dm-2", serie: 1, question: "À quel pays appartient ce drapeau ?", flagCode: "JP", options: ["Corée du Sud", "Japon", "Bangladesh", "Palaos"], answer: 1, explanation: "Le disque rouge sur fond blanc est le drapeau du Japon." }
  ],
  "sciences-nature": [
    { id: "sn-1", serie: 1, question: "Quel est le symbole chimique de l'or ?", options: ["Ag", "Au", "Fe", "Pb"], answer: 1, explanation: "Au vient du latin aurum." },
    { id: "sn-2", serie: 1, question: "Quelle planète est la plus proche du Soleil ?", options: ["Vénus", "Mars", "Mercure", "Terre"], answer: 2, explanation: "Mercure est la plus proche du Soleil." }
  ],
  "arts-litterature": [
    { id: "al-1", serie: 1, question: "Qui a peint La Joconde ?", options: ["Michel-Ange", "Léonard de Vinci", "Raphaël", "Donatello"], answer: 1, explanation: "Léonard de Vinci a peint La Joconde." },
    { id: "al-2", serie: 1, question: "Qui a écrit Les Misérables ?", options: ["Émile Zola", "Victor Hugo", "Gustave Flaubert", "Balzac"], answer: 1, explanation: "Victor Hugo a publié Les Misérables en 1862." }
  ],
  "sports-loisirs": [
    { id: "sl-1", serie: 1, question: "Combien de joueurs composent une équipe de football sur le terrain ?", options: ["9", "10", "11", "12"], answer: 2, explanation: "11 joueurs par équipe." },
    { id: "sl-2", serie: 1, question: "Quelle distance mesure un marathon officiel ?", options: ["21,097 km", "42,195 km", "50 km", "30 km"], answer: 1, explanation: "42,195 kilomètres." }
  ],
  "culture-generale-divers": [
    { id: "cg-1", serie: 1, question: "Combien de langues officielles compte l'ONU ?", options: ["4", "5", "6", "8"], answer: 2, explanation: "L'ONU compte 6 langues officielles." },
    { id: "cg-2", serie: 1, question: "Combien de minutes y a-t-il dans une journée complète ?", options: ["720", "1 000", "1 440", "1 680"], answer: 2, explanation: "24 × 60 = 1 440 minutes." }
  ]
};
function playTone(type, soundEnabled) {
  if (!soundEnabled || typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(type === "correct" ? 780 : 240, ctx.currentTime);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.start();
    osc.stop(ctx.currentTime + 0.18);
  } catch {}
     }
                                           export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [bank, setBank] = useState(INITIAL_QUESTIONS);
  const [seriesProgress, setSeriesProgress] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [session, setSession] = useState(null);
  const [jsonInput, setJsonInput] = useState("");
  const [importStatus, setImportStatus] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.darkMode === "boolean") setDarkMode(parsed.darkMode);
        if (typeof parsed.soundEnabled === "boolean") setSoundEnabled(parsed.soundEnabled);
        if (parsed.bank) {
          setBank((prev) => {
            const merged = { ...prev };
            Object.keys(parsed.bank).forEach((catKey) => {
              const existingIds = new Set((merged[catKey] || []).map((q) => q.id));
              const extra = (parsed.bank[catKey] || []).filter((q) => !existingIds.has(q.id));
              merged[catKey] = [...(merged[catKey] || []), ...extra];
            });
            return merged;
          });
        }
        if (parsed.seriesProgress) setSeriesProgress(parsed.seriesProgress);
        if (Array.isArray(parsed.favorites)) setFavorites(parsed.favorites);
        if (Array.isArray(parsed.history)) setHistory(parsed.history);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ darkMode, soundEnabled, bank, seriesProgress, favorites, history })
      );
    } catch {}
  }, [darkMode, soundEnabled, bank, seriesProgress, favorites, history]);

  const allQuestions = useMemo(() => {
    const list = [];
    CATEGORIES.forEach((cat) => {
      (bank[cat.id] || []).forEach((q) => list.push({ ...q, categoryId: cat.id, categoryName: cat.nom }));
    });
    return list;
  }, [bank]);

  const currentCategory = useMemo(
    () => CATEGORIES.find((c) => c.id === selectedCategoryId) || CATEGORIES[0],
    [selectedCategoryId]
  );

  const startSeriesQuiz = (categoryId, serieNum) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
    const catQuestions = bank[categoryId] || [];
    const exactSerie = catQuestions.filter((q) => Number(q.serie) === Number(serieNum));
    let pool = exactSerie.length > 0 ? [...exactSerie] : [...catQuestions];
    if (pool.length === 0) pool = allQuestions;
    const chosen = [...pool].sort(() => Math.random() - 0.5).slice(0, QUESTIONS_PER_SERIES);

    const key = `${categoryId}-${serieNum}`;
    setSeriesProgress((prev) => {
      const existing = prev[key] || { bestScore: 0, totalQuestions: chosen.length, attempts: 0 };
      return {
        ...prev,
        [key]: { ...existing, status: existing.status === "Terminée" ? "Terminée" : "En cours", totalQuestions: chosen.length },
      };
    });

    playTone("click", soundEnabled);
    setSession({
      title: `${cat.nom} — Série ${serieNum}`,
      categoryId,
      serie: serieNum,
      questions: chosen,
      currentIndex: 0,
      selectedOption: null,
      isAnswered: false,
      score: 0,
      answersLog: [],
      isRandom: false,
    });
  };

  const startRandomQuiz = (filterCategoryId = "all", count = 10) => {
    const source = filterCategoryId === "all" ? allQuestions : allQuestions.filter((q) => q.categoryId === filterCategoryId);
    const chosen = [...source].sort(() => Math.random() - 0.5).slice(0, Math.min(count, source.length));
    const catLabel = filterCategoryId === "all" ? "Toutes catégories" : CATEGORIES.find((c) => c.id === filterCategoryId)?.nom || "Quiz";

    playTone("click", soundEnabled);
    setSession({
      title: `Quiz Aléatoire (${catLabel})`,
      categoryId: filterCategoryId === "all" ? null : filterCategoryId,
      serie: null,
      questions: chosen,
      currentIndex: 0,
      selectedOption: null,
      isAnswered: false,
      score: 0,
      answersLog: [],
      isRandom: true,
    });
  };

  const handleSelectOption = (optionIndex) => {
    if (!session || session.isAnswered) return;
    const currentQ = session.questions[session.currentIndex];
    const isCorrect = optionIndex === currentQ.answer;
    playTone(isCorrect ? "correct" : "wrong", soundEnabled);

    setSession((prev) => ({
      ...prev,
      selectedOption: optionIndex,
      isAnswered: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answersLog: [
        ...prev.answersLog,
        {
          questionId: currentQ.id,
          question: currentQ.question,
          selectedOption: optionIndex,
          correctOption: currentQ.answer,
          isCorrect,
          explanation: currentQ.explanation || "",
        },
      ],
    }));
  };

  const handleNextQuestion = () => {
    if (!session) return;
    if (session.currentIndex + 1 < session.questions.length) {
      setSession((prev) => ({ ...prev, currentIndex: prev.currentIndex + 1, selectedOption: null, isAnswered: false }));
    } else {
      const total = session.questions.length;
      const finalScore = session.score;
      if (!session.isRandom && session.categoryId && session.serie) {
        const key = `${session.categoryId}-${session.serie}`;
        setSeriesProgress((prev) => {
          const existing = prev[key] || { bestScore: 0, totalQuestions: total, attempts: 0 };
          return {
            ...prev,
            [key]: {
              status: "Terminée",
              bestScore: Math.max(existing.bestScore || 0, finalScore),
              totalQuestions: total,
              attempts: (existing.attempts || 0) + 1,
            },
          };
        });
      }
      setHistory((prev) => [
        {
          id: `${Date.now()}`,
          date: new Date().toLocaleString("fr-FR"),
          title: session.title,
          score: finalScore,
          total,
          percentage: total > 0 ? Math.round((finalScore / total) * 100) : 0,
        },
        ...prev.slice(0, 49),
      ]);
      setSession((prev) => ({ ...prev, finished: true }));
    }
  };

  const toggleFavorite = (qObj) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === qObj.id)) return prev.filter((item) => item.id !== qObj.id);
      return [
        {
          id: qObj.id,
          categoryId: qObj.categoryId || currentCategory.id,
          categoryName: qObj.categoryName || CATEGORIES.find((c) => c.id === qObj.categoryId)?.nom || currentCategory.nom,
          serie: qObj.serie || 1,
          question: qObj.question,
          options: qObj.options,
          answer: qObj.answer,
          explanation: qObj.explanation || "",
        },
        ...prev,
      ];
    });
  };

  const handleImportJson = () => {
    setImportStatus(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const items = Array.isArray(parsed) ? parsed : parsed.questions;
      if (!Array.isArray(items) || items.length === 0) {
        setImportStatus({ ok: false, message: "Le JSON doit contenir un tableau de questions non vide." });
        return;
      }
      let addedCount = 0;
      setBank((prev) => {
        const next = { ...prev };
        items.forEach((item, idx) => {
          const targetCat = CATEGORIES.some((c) => c.id === item.categoryId) ? item.categoryId : selectedCategoryId;
          if (!item.question || !Array.isArray(item.options) || item.options.length < 2) return;
          const qId = item.id || `${targetCat}-imp-${Date.now()}-${idx}`;
          const existingIds = new Set((next[targetCat] || []).map((q) => q.id));
          if (!existingIds.has(qId)) {
            next[targetCat] = [
              ...(next[targetCat] || []),
              {
                id: qId,
                serie: Number(item.serie) || 2,
                question: item.question,
                options: item.options,
                answer: typeof item.answer === "number" ? item.answer : 0,
                explanation: item.explanation || "",
                flagCode: item.flagCode || null,
              },
            ];
            addedCount += 1;
          }
        });
        return next;
      });
      setImportStatus({ ok: true, message: `${addedCount} question(s) ajoutée(s).` });
      setJsonInput("");
    } catch (err) {
      setImportStatus({ ok: false, message: `JSON invalide : ${err.message}` });
    }
  };

  const handleResetProgress = () => {
    setSeriesProgress({});
    setHistory([]);
    setFavorites([]);
    setSession(null);
  };

  const stats = useMemo(() => {
    const totalSeries = CATEGORIES.length * SERIES_PER_CATEGORY;
    const completedSeries = Object.values(seriesProgress).filter((s) => s.status === "Terminée").length;
    const inProgressSeries = Object.values(seriesProgress).filter((s) => s.status === "En cours").length;
    const totalAnswered = history.reduce((acc, h) => acc + h.total, 0);
    const totalCorrect = history.reduce((acc, h) => acc + h.score, 0);
    const avgAccuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;
    return { totalSeries, completedSeries, inProgressSeries, avgAccuracy, bankCount: allQuestions.length };
  }, [seriesProgress, history, allQuestions.length]);

  const shellBg = darkMode
    ? "min-h-screen bg-gradient-to-br from-slate-950 via-[#071936] to-slate-950 text-white"
    : "min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 text-slate-900";
  const cardBg = darkMode
    ? "bg-slate-900/80 border-cyan-500/20 shadow-lg shadow-cyan-950/30"
    : "bg-white border-sky-200/80 shadow-md shadow-sky-900/5";
  const mutedText = darkMode ? "text-slate-300" : "text-slate-600";
      if (session) {
    if (session.finished) {
      const pct = session.questions.length > 0 ? Math.round((session.score / session.questions.length) * 100) : 0;
      return (
        <div className={shellBg}>
          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}>
              <div className="flex items-center justify-between mb-6">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                  Résultat de la session
                </span>
                <button onClick={() => setSession(null)} className="inline-flex items-center gap-2 text-sm font-medium text-cyan-400 hover:underline">
                  <ArrowLeft className="w-4 h-4" /> Retour
                </button>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{session.title}</h2>
              <p className={`mb-6 ${mutedText}`}>
                Score obtenu : <strong className="text-cyan-400">{session.score} / {session.questions.length}</strong> ({pct}%)
              </p>
              <div className="space-y-3 mb-8 max-h-96 overflow-y-auto">
                {session.answersLog.map((item, idx) => (
                  <div key={`${item.questionId}-${idx}`} className={`p-4 rounded-xl border ${darkMode ? "bg-slate-950/60 border-slate-800" : "bg-sky-50/70 border-sky-100"}`}>
                    <div className="flex items-start gap-3">
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                      )}
                      <div className="text-sm">
                        <p className="font-semibold mb-1">{idx + 1}. {item.question}</p>
                        {item.explanation && <p className={`text-xs ${mutedText}`}>{item.explanation}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => (session.isRandom ? startRandomQuiz(session.categoryId || "all", session.questions.length) : startSeriesQuiz(session.categoryId, session.serie))}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                >
                  <RotateCcw className="w-4 h-4" /> Rejouer
                </button>
                <button onClick={() => setSession(null)} className="px-5 py-3 rounded-xl font-semibold border border-cyan-500/30">
                  Choisir une autre série
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const q = session.questions[session.currentIndex];
    const isFav = favorites.some((f) => f.id === q.id);

    return (
      <div className={shellBg}>
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
          <div className="flex items-center justify-between gap-3 mb-6">
            <button onClick={() => setSession(null)} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium border border-cyan-500/20">
              <ArrowLeft className="w-4 h-4 text-cyan-400" /> Quitter
            </button>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{session.title}</p>
              <p className={`text-xs ${mutedText}`}>Question {session.currentIndex + 1} sur {session.questions.length}</p>
            </div>
            <button onClick={() => toggleFavorite(q)} className={`p-2.5 rounded-xl border ${isFav ? "bg-amber-500/20 border-amber-400 text-amber-300" : "border-cyan-500/20 text-slate-400"}`}>
              <Star className={`w-5 h-5 ${isFav ? "fill-amber-400" : ""}`} />
            </button>
          </div>

          <div className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}>
            {q.flagCode && (
              <div className="mb-5 flex justify-center">
                <FlagSvg code={q.flagCode} />
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold leading-snug mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const chosen = session.selectedOption === idx;
                const correct = q.answer === idx;
                let style = darkMode ? "bg-slate-950/70 border-slate-800 hover:border-cyan-400/60" : "bg-sky-50/60 border-sky-200 hover:border-blue-400";
                if (session.isAnswered) {
                  if (correct) style = "bg-emerald-500/20 border-emerald-400 text-emerald-200";
                  else if (chosen) style = "bg-rose-500/20 border-rose-400 text-rose-200";
                  else style = "opacity-60 border-slate-800";
                }
                return (
                  <button key={idx} disabled={session.isAnswered} onClick={() => handleSelectOption(idx)} className={`w-full text-left p-4 rounded-xl border font-medium transition flex items-center justify-between gap-3 ${style}`}>
                    <span className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {session.isAnswered && correct && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                    {session.isAnswered && chosen && !correct && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {session.isAnswered && (
              <div className="mt-6 pt-5 border-t border-cyan-500/15">
                {q.explanation && <p className={`text-sm mb-5 ${mutedText}`}><strong className="text-cyan-400">Explication :</strong> {q.explanation}</p>}
                <div className="flex justify-end">
                  <button onClick={handleNextQuestion} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                    {session.currentIndex + 1 < session.questions.length ? "Question suivante" : "Voir le score"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const seriesList = Array.from({ length: SERIES_PER_CATEGORY }, (_, i) => i + 1).filter(
    (num) => !searchQuery.trim() || `série ${num}`.includes(searchQuery.toLowerCase()) || `${num}` === searchQuery.trim()
  );

  return (
    <div className={shellBg}>
      <header className={`sticky top-0 z-20 backdrop-blur-md border-b ${darkMode ? "bg-slate-950/85 border-cyan-500/20" : "bg-white/85 border-sky-200"}`}>
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-extrabold text-white shadow-md">
              CG
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Connaissance Générale</h1>
              <p className={`text-xs ${mutedText}`}>8 catégories • 50 séries/catégorie • {stats.bankCount} questions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSoundEnabled((s) => !s)} className="p-2.5 rounded-xl border border-cyan-500/20 text-cyan-300">
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button onClick={() => setDarkMode((d) => !d)} className="p-2.5 rounded-xl border border-cyan-500/20 text-cyan-300">
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <nav className="max-w-6xl mx-auto px-4 pb-2.5 flex gap-1.5 overflow-x-auto">
          {[
            { id: "home", label: "Accueil / Quiz", icon: BookOpen },
            { id: "random", label: "Quiz aléatoires", icon: Shuffle },
            { id: "favorites", label: `Favoris (${favorites.length})`, icon: Star },
            { id: "stats", label: "Statistiques", icon: BarChart3 },
            { id: "settings", label: "Paramètres", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap ${
                  active ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white" : `${mutedText} hover:bg-cyan-500/10`
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        {activeTab === "home" && (
          <div className="space-y-8">
            <section>
              <h2 className="text-lg sm:text-xl font-bold mb-4">8 Catégories officielles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {CATEGORIES.map((cat) => {
                  const isSelected = cat.id === selectedCategoryId;
                  const catCompleted = Array.from({ length: SERIES_PER_CATEGORY }, (_, i) => i + 1).filter(
                    (num) => seriesProgress[`${cat.id}-${num}`]?.status === "Terminée"
                  ).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategoryId(cat.id)}
                      className={`text-left rounded-2xl border p-4 transition ${
                        isSelected ? "border-cyan-400 ring-2 ring-cyan-400/30 bg-blue-600/20" : cardBg
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${cat.badgeBg}`}>
                          {catCompleted}/{SERIES_PER_CATEGORY} séries
                        </span>
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="font-bold text-base mb-1">{cat.nom}</h3>
                      <p className={`text-xs ${mutedText}`}>{cat.description}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className={`rounded-2xl border p-5 sm:p-6 ${cardBg}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Catégorie sélectionnée</span>
                  <h2 className="text-2xl font-bold mt-0.5">{currentCategory.nom}</h2>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer une série (ex: 1)..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-sm border border-cyan-500/20 bg-slate-950/60 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {seriesList.map((num) => {
                  const prog = seriesProgress[`${currentCategory.id}-${num}`];
                  const status = prog?.status || "Non commencée";
                  return (
                    <div key={num} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-sm mb-1.5">Série {num}</p>
                        <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300">
                          {status}
                        </span>
                      </div>
                      <button
                        onClick={() => startSeriesQuiz(currentCategory.id, num)}
                        className="mt-3 w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      >
                        <Play className="w-3.5 h-3.5" /> Lancer
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {activeTab === "random" && (
          <div className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}>
            <h2 className="text-2xl font-bold mb-4">Quiz Aléatoires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button onClick={() => startRandomQuiz("all", 10)} className="p-5 rounded-2xl text-left bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <h3 className="text-lg font-bold mb-1">Mix Global (8 catégories)</h3>
                <p className="text-xs opacity-90">Jusqu'à 10 questions aléatoires</p>
              </button>
              {CATEGORIES.map((cat) => (
                <button key={cat.id} onClick={() => startRandomQuiz(cat.id, 10)} className="p-5 rounded-2xl text-left border border-cyan-500/20 bg-slate-950/60">
                  <h3 className="text-base font-bold mb-1">{cat.nom}</h3>
                  <p className={`text-xs ${mutedText}`}>{(bank[cat.id] || []).length} question(s)</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === "favorites" && (
          <div className={`rounded-2xl border p-6 sm:p-8 ${cardBg}`}>
            <h2 className="text-2xl font-bold mb-4">Questions Favorites</h2>
            {favorites.length === 0 ? (
              <p className={mutedText}>Aucune question enregistrée en favori pour le moment.</p>
            ) : (
              <div className="space-y-4">
                {favorites.map((fav) => (
                  <div key={fav.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/60">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs text-cyan-400 font-semibold">{fav.categoryName} • Série {fav.serie}</span>
                      <button onClick={() => toggleFavorite(fav)} className="text-xs text-rose-400 inline-flex items-center gap-1">
                        <Trash2 className="w-3.5 h-3.5" /> Retirer
                      </button>
                    </div>
                    <p className="font-bold">{fav.question}</p>
                    <p className="text-sm text-emerald-400 mt-1">Réponse : {fav.options?.[fav.answer]}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`rounded-2xl border p-5 ${cardBg}`}>
              <p className={`text-xs ${mutedText}`}>Séries terminées</p>
              <p className="text-2xl font-extrabold text-cyan-400 mt-1">{stats.completedSeries} / {stats.totalSeries}</p>
            </div>
            <div className={`rounded-2xl border p-5 ${cardBg}`}>
              <p className={`text-xs ${mutedText}`}>Séries en cours</p>
              <p className="text-2xl font-extrabold text-blue-400 mt-1">{stats.inProgressSeries}</p>
            </div>
            <div className={`rounded-2xl border p-5 ${cardBg}`}>
              <p className={`text-xs ${mutedText}`}>Précision moyenne</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">{stats.avgAccuracy}%</p>
            </div>
            <div className={`rounded-2xl border p-5 ${cardBg}`}>
              <p className={`text-xs ${mutedText}`}>Questions en banque</p>
              <p className="text-2xl font-extrabold text-sky-400 mt-1">{stats.bankCount}</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h2 className="text-xl font-bold mb-2">Banque de questions & Importation JSON</h2>
              <textarea
                rows={6}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='[{"categoryId":"histoire-mythologie","serie":2,"question":"...","options":["A","B","C","D"],"answer":0}]'
                className="w-full p-3 rounded-xl text-xs font-mono border border-cyan-500/20 bg-slate-950/80 mb-3 outline-none"
              />
              <button onClick={handleImportJson} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                <Upload className="w-4 h-4" /> Importer les questions
              </button>
              {importStatus && <p className={`mt-3 text-sm ${importStatus.ok ? "text-emerald-400" : "text-rose-400"}`}>{importStatus.message}</p>}
            </div>

            <div className={`rounded-2xl border p-6 ${cardBg}`}>
              <h3 className="text-lg font-bold mb-2">Réinitialisation</h3>
              <button onClick={handleResetProgress} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-rose-500/40 text-rose-400">
                <Trash2 className="w-4 h-4" /> Réinitialiser la progression
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
          }
                      
    
     
