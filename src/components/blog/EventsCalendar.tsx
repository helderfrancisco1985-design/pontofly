import { events, typeConfig, type PontoFlyEvent } from "@/lib/events-data";

const PURPLE = "#543286";

function formatDay(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", { day: "2-digit" });
}

function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", { month: "short" }).replace(".", "").toUpperCase();
}

function formatFullDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("pt-PT", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function isPast(dateStr: string) {
  return new Date(dateStr) < new Date();
}

function EventCard({ event }: { event: PontoFlyEvent }) {
  const config = typeConfig[event.type];
  const past = isPast(event.date);

  return (
    <div className={`flex gap-5 transition-opacity ${past ? "opacity-40" : ""}`}>

      {/* Data */}
      <div className="flex w-14 flex-none flex-col items-center">
        <div
          className="flex h-14 w-14 flex-col items-center justify-center rounded-2xl shadow-sm"
          style={{ backgroundColor: past ? "#e4e4e7" : config.color }}
        >
          <span className="text-lg font-bold leading-none text-white">{formatDay(event.date)}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">{formatMonth(event.date)}</span>
        </div>
        {/* Linha vertical */}
        <div className="mt-1 w-px flex-1 bg-zinc-100" style={{ minHeight: 32 }} />
      </div>

      {/* Conteúdo */}
      <div className="pb-8 pt-1">
        <span
          className="mb-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: past ? "#a1a1aa" : config.color }}
        >
          {config.label}
        </span>
        <h3 className="text-base font-semibold text-zinc-900">{event.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-500">{event.description}</p>
        <p className="mt-1.5 text-xs capitalize text-zinc-400">{formatFullDate(event.date)}</p>
      </div>

    </div>
  );
}

export default function EventsCalendar() {
  const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const upcoming = sorted.filter((e) => !isPast(e.date));
  const past = sorted.filter((e) => isPast(e.date));

  return (
    <section className="border-b border-zinc-100 bg-white px-6 py-16">
      <div className="mx-auto max-w-2xl">

        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-400">
            Agenda
          </p>
          <h2 className="text-3xl font-semibold text-zinc-900">
            O que aí <span style={{ color: PURPLE }}>vem</span>
          </h2>
          <div className="mx-auto mt-4 h-px w-12" style={{ backgroundColor: PURPLE }} />
        </div>

        {/* Legenda */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {Object.entries(typeConfig).map(([, cfg]) => (
            <span key={cfg.label} className="flex items-center gap-1.5 text-xs text-zinc-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cfg.color }} />
              {cfg.label}
            </span>
          ))}
        </div>

        {/* Eventos futuros */}
        {upcoming.length > 0 ? (
          <div>
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center text-sm text-zinc-400">Novos eventos em breve.</p>
        )}

        {/* Eventos passados */}
        {past.length > 0 && (
          <details className="mt-4">
            <summary className="cursor-pointer text-xs font-medium text-zinc-400 hover:text-zinc-600">
              Ver eventos anteriores ({past.length})
            </summary>
            <div className="mt-6">
              {[...past].reverse().map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </details>
        )}

      </div>
    </section>
  );
}
