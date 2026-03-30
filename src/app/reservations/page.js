import Link from "next/link";

const reservationSlots = [
  { time: "12:30 PM", status: "Available" },
  { time: "2:00 PM", status: "Available" },
  { time: "4:30 PM", status: "Limited" },
  { time: "7:00 PM", status: "Available" },
  { time: "9:00 PM", status: "Limited" },
];

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-[#F6F5F2] px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <Link href="/home" className="text-sm text-[#C82333] font-semibold hover:underline">
          Back to Home
        </Link>

        <section className="mt-6 rounded-3xl bg-white border border-gray-100 p-8 md:p-12 shadow-sm">
          <p className="text-xs tracking-[0.2em] font-bold text-[#C82333] uppercase">Reservations</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Book Your Table at Zayaka
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            Choose your preferred slot for lunch or dinner. Call us for large-group bookings and special occasions.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reservationSlots.map((slot) => (
              <div key={slot.time} className="rounded-2xl border border-gray-200 p-4 bg-[#FCFBF9]">
                <p className="text-lg font-bold text-gray-900">{slot.time}</p>
                <p className={`text-sm mt-1 ${slot.status === "Limited" ? "text-amber-600" : "text-green-600"}`}>
                  {slot.status}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="bg-[#C82333] text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors">
              Reserve a Table
            </button>
            <a href="tel:+919999999999" className="border border-gray-300 px-6 py-3 rounded-xl font-semibold text-gray-800 hover:bg-gray-50 transition-colors text-center">
              Call Restaurant
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
