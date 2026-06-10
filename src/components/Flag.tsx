/**
 * Bandeira minimalista em barras verticais. Evita os emoji de bandeira, que
 * não renderizam em várias plataformas (ex.: Windows mostra "PT" em texto).
 */
export default function Flag({
  colors,
  className = '',
}: {
  colors: string[]
  className?: string
}) {
  return (
    <span
      className={`inline-flex overflow-hidden rounded-[3px] ring-1 ring-ink/10 ${className}`}
      aria-hidden="true"
    >
      {colors.map((c, i) => (
        <span key={i} className="block h-full flex-1" style={{ backgroundColor: c }} />
      ))}
    </span>
  )
}
