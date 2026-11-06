import Image from "next/image";

export type Model = { img: string; tag: string; name: string; size: string; pieces: number; pages: number };
export type Sector = { id: string; label: string; models: Model[] };

/**
 * Todos os modelos de uma vez, separados por setor: cada card já mostra embaixo o
 * tamanho montado, as peças e as páginas, sem precisar tocar em nada para ver.
 */
export default function ModelExplorer({ sectors, imgBase }: { sectors: Sector[]; imgBase: string }) {
  return (
    <div className="flex flex-col gap-12">
      {sectors.map((sector) => (
        <section key={sector.id} aria-labelledby={`sector-${sector.id}`}>
          <h3 id={`sector-${sector.id}`} className="md-sector">
            {sector.label} · {sector.models.length} {sector.models.length === 1 ? "modelo" : "modelos"}
          </h3>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {sector.models.map((m) => (
              <li key={m.img} className="md-card">
                <div className="md-card-img">
                  <Image src={`${imgBase}/${m.img}.svg`} alt={m.name} width={240} height={240} unoptimized />
                </div>
                <div className="flex flex-1 flex-col gap-1 px-3 pb-4 pt-3">
                  <span className="md-tag">{m.tag}</span>
                  <span className="font-display text-[17px] font-extrabold leading-tight text-sp-ink">{m.name}</span>
                  <span className="mt-1 text-[13px] font-bold leading-snug text-sp-ink-soft">{m.size}</span>
                  <span className="text-[13px] font-medium leading-snug text-sp-ink-soft">
                    {m.pieces} piezas · {m.pages} páginas
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
