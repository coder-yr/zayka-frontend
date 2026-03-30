import Link from "next/link";

const milestones = [
  { year: "2018", text: "Started as a small chef-driven kitchen with a focus on handcrafted flavors." },
  { year: "2020", text: "Expanded into full-service dining and curated tasting experiences." },
  { year: "2023", text: "Launched digital ordering and built a loyal customer community." },
  { year: "Today", text: "Serving modern Indian-global cuisine with freshness and consistency." },
];

export default function OurStoryPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F2] px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/home" className="text-sm text-[#C82333] font-semibold hover:underline">
          Back to Home
        </Link>

        <section className="mt-6 rounded-3xl bg-white border border-gray-100 p-8 md:p-12 shadow-sm">
          <p className="text-xs tracking-[0.2em] font-bold text-[#C82333] uppercase">Our Story</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            The Journey of Zayaka
          </h1>
          <p className="mt-4 text-gray-600 max-w-3xl">
            Zayaka was created to blend authentic taste with modern dining comfort. From ingredient sourcing to final plating,
            every detail is designed to deliver a memorable food experience.
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
