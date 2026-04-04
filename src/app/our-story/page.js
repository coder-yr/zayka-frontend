"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function OurStoryPage() {
  const { t } = useTranslation();
  const milestones = [
    { year: "2018", text: t("pages.ourStory.milestone2018") },
    { year: "2020", text: t("pages.ourStory.milestone2020") },
    { year: "2023", text: t("pages.ourStory.milestone2023") },
    { year: t("pages.ourStory.today"), text: t("pages.ourStory.milestoneToday") },
  ];

  return (
    <main className="min-h-screen bg-[#F6F5F2] px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/home" className="text-sm text-[#C82333] font-semibold hover:underline">
          {t("pages.ourStory.backToHome")}
        </Link>

        <section className="mt-6 rounded-3xl bg-white border border-gray-100 p-8 md:p-12 shadow-sm">
          <p className="text-xs tracking-[0.2em] font-bold text-[#C82333] uppercase">{t("pages.ourStory.badge")}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {t("pages.ourStory.heading")}
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            {t("pages.ourStory.description")}
          </p>

          <div className="mt-10 space-y-4">
            {milestones.map((item) => (
              <div key={item.year} className="rounded-2xl border border-gray-200 p-5 bg-[#FCFBF9]">
                <p className="text-sm font-bold text-[#C82333] uppercase">{item.year}</p>
                <p className="text-gray-700 mt-1">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
