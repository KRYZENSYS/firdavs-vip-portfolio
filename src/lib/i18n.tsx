"use client";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "uz" | "ru";

type Dict = Record<string, { en: string; uz: string; ru: string }>;

const DICT: Dict = {
  navHome: { en: "Home", uz: "Bosh sahifa", ru: "Главная" },
  navAbout: { en: "About", uz: "Men haqimda", ru: "Обо мне" },
  navSkills: { en: "Skills", uz: "Ko'nikmalar", ru: "Навыки" },
  navProjects: { en: "Projects", uz: "Loyihalar", ru: "Проекты" },
  navStats: { en: "Stats", uz: "Statistika", ru: "Статистика" },
  navContact: { en: "Contact", uz: "Bog'lanish", ru: "Контакт" },
  hireMe: { en: "Hire Me", uz: "Ishga oling", ru: "Нанять" },
  tagline: { en: "Dark Future Vision", uz: "Qorong'u Kelajak Vizyoni", ru: "Видение Тёмного Будущего" },
  aboutTitle: { en: "ABOUT ME", uz: "MEN HAQIMDA", ru: "ОБО МНЕ" },
  aboutSub: { en: "A glimpse into the mind behind the code", uz: "Kod ortidagi ong qiyofasi", ru: "Загляни в разум за кодом" },
  skillsTitle: { en: "SKILLS", uz: "KO'NIKMALAR", ru: "НАВЫКИ" },
  projectsTitle: { en: "PROJECTS", uz: "LOYIHALAR", ru: "ПРОЕКТЫ" },
  statsTitle: { en: "STATS", uz: "STATISTIKA", ru: "СТАТИСТИКА" },
  contactTitle: { en: "LET'S TALK", uz: "BOG'LANAMIZ", ru: "ДАВАЙ ОБЩАТЬСЯ" },
  contactSub: { en: "Got an idea, project, or just want to say hi? My inbox is open.", uz: "G'oya, loyiha yoki shunchaki salom aytmoqchimisiz? Inbox ochiq.", ru: "Идея, проект или просто хочешь поздороваться? Почта открыта." },
  viewProjects: { en: "View Projects", uz: "Loyihalarni ko'rish", ru: "Смотреть проекты" },
  contactMe: { en: "Contact Me", uz: "Bog'lanish", ru: "Связаться" },
  available: { en: "Available for work", uz: "Ishga tayyor", ru: "Открыт для работы" },
  send: { en: "Transmit", uz: "Yuborish", ru: "Отправить" },
  blogTitle: { en: "BLOG", uz: "BLOG", ru: "БЛОГ" },
  blogSub: { en: "Notes from the dark laboratory", uz: "Qorong'u laboratoriyadan eslatmalar", ru: "Заметки из тёмной лаборатории" },
  readMore: { en: "Read more", uz: "Batafsil", ru: "Читать" },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof DICT) => string };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("fvip-lang")) as Lang | null;
    if (saved && ["en", "uz", "ru"].includes(saved)) setLang(saved);
    else {
      const l = (navigator.language || "en").slice(0, 2) as Lang;
      if (["en", "uz", "ru"].includes(l)) setLang(l);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    if (typeof window !== "undefined") localStorage.setItem("fvip-lang", lang);
  }, [lang]);

  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: (k) => (DICT[k] && DICT[k][lang]) || (DICT[k] && DICT[k].en) || String(k),
  }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
