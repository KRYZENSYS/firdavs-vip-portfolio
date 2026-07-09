"use client";
import SectionTitle from "@/components/sections/SectionTitle";
import ProgressBar from "@/components/ui/ProgressBar";
import { SKILLS } from "@/data";
import { Zap } from "lucide-react";

const colors = [
  "from-cyan-400 to-blue-500", "from-purple-500 to-pink-500", "from-emerald-400 to-cyan-500",
  "from-orange-400 to-pink-500", "from-violet-500 to-indigo-500", "from-sky-400 to-emerald-400",
];

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container-x">
        <SectionTitle eyebrow="// skills.matrix" title="SKILLS" subtitle="Honing the craft, one exploit at a time" icon={<Zap size={12} />} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7 max-w-5xl mx-auto">
          {SKILLS.map((s, i) => (
            <ProgressBar key={s.name} name={s.name} level={s.level} color={colors[i % colors.length]} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
