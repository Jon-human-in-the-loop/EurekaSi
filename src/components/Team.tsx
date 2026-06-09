import { ShieldIcon, CheckIcon } from '../icons'

const team = [
  { name: 'Tiago R.', role: 'Canalizador', years: '12 anos', initials: 'TR', tone: 'from-accent-200 to-accent-300' },
  { name: 'Carla M.', role: 'Eletricista', years: '9 anos', initials: 'CM', tone: 'from-sky-200 to-accent-200' },
  { name: 'André P.', role: 'Pintor', years: '15 anos', initials: 'AP', tone: 'from-amber-200 to-accent-200' },
  { name: 'Helena S.', role: 'Limpeza', years: '7 anos', initials: 'HS', tone: 'from-emerald-200 to-accent-200' },
]

const guarantees = [
  'Identidade e morada validadas',
  'Experiência comprovada no ofício',
  'Avaliações reais acima de 4,7/5',
  'Seguro de responsabilidade civil',
]

export default function Team() {
  return (
    <section className="container-page py-20 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">A equipa</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
            Pessoas reais, verificadas uma a uma.
          </h2>
          <p className="mt-4 text-lg text-ink-muted">
            Não somos um diretório anónimo. Conhecemos cada profissional da rede Eureka e só
            trabalhamos com quem trataríamos do nosso próprio lar.
          </p>

          <ul className="mt-8 space-y-3">
            {guarantees.map((g) => (
              <li key={g} className="flex items-center gap-3 text-ink-soft">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-100 text-accent-600">
                  <CheckIcon className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <span className="text-[15px]">{g}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4">
            <ShieldIcon className="h-7 w-7 shrink-0 text-accent-600" />
            <p className="text-sm font-medium text-accent-800">
              Garantia Eureka: se algo não ficar bem, voltamos sem custos.
            </p>
          </div>
        </div>

        {/* Grelha do equipa — placeholders prontos para fotos autênticas */}
        <div className="grid grid-cols-2 gap-4">
          {team.map((m, i) => (
            <figure
              key={m.name}
              className={`card overflow-hidden ${i % 2 === 1 ? 'sm:translate-y-6' : ''}`}
            >
              <div
                className={`relative aspect-square bg-gradient-to-br ${m.tone}`}
                role="img"
                aria-label={`Foto de ${m.name}`}
              >
                <span className="absolute inset-0 grid place-items-center font-display text-4xl font-extrabold text-white/80">
                  {m.initials}
                </span>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-accent-700 backdrop-blur">
                  <ShieldIcon className="h-3.5 w-3.5" /> Verificado
                </span>
              </div>
              <figcaption className="p-4">
                <div className="font-bold tracking-tightest text-ink">{m.name}</div>
                <div className="text-sm text-ink-muted">
                  {m.role} · {m.years}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
