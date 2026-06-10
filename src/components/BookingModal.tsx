import { useEffect, useState } from 'react'
import { useBooking } from '../booking'
import { useLang, fill } from '../i18n'
import { serviceMeta } from '../data'
import { CheckIcon, CloseIcon, ClockIcon, ShieldIcon, ArrowIcon } from '../icons'

// Wizard: 0 ¿Qué? · 1 ¿Dónde? · 2 ¿Cuándo? · 3 Contacto · 4 Éxito
type Step = 0 | 1 | 2 | 3 | 4
type Urgency = 'hoje' | 'esta-semana' | 'flexivel'

const URGENCY_IDS: Urgency[] = ['hoje', 'esta-semana', 'flexivel']
const LAST_INPUT_STEP: Step = 3

export default function BookingModal() {
  const { isOpen, close, preselectedService } = useBooking()
  const { t, lang } = useLang()
  const m = t.modal

  const [step, setStep] = useState<Step>(0)
  const [service, setService] = useState<string | null>(null)
  const [urgency, setUrgency] = useState<Urgency | null>(null)
  const [detail, setDetail] = useState('')
  const [contact, setContact] = useState({ name: '', phone: '', postal: '' })
  const [company, setCompany] = useState('') // honeypot anti-bot
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setService(preselectedService)
      setStep(preselectedService ? 1 : 0)
      setUrgency(null)
      setDetail('')
      setContact({ name: '', phone: '', postal: '' })
      setCompany('')
      setSending(false)
      setSendError(false)
    }
  }, [isOpen, preselectedService])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  if (!isOpen) return null

  const selectedIndex = serviceMeta.findIndex((s) => s.id === service)
  const selectedName = selectedIndex >= 0 ? t.services.items[selectedIndex].name : m.serviceFallback
  const canContinue =
    step === 0
      ? !!service
      : step === 1
        ? contact.postal.trim().length >= 4
        : step === 2
          ? !!urgency
          : step === 3
            ? contact.name.trim().length > 0 && contact.phone.replace(/\D/g, '').length >= 9
            : true

  const submit = async () => {
    setSending(true)
    setSendError(false)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service,
          urgency,
          detail,
          name: contact.name,
          phone: contact.phone,
          postal: contact.postal,
          lang,
          company,
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStep(4)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={m.title}
    >
      <button aria-label={m.close} onClick={close} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />

      <div className="relative z-10 flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-4xl bg-white shadow-lift sm:rounded-4xl animate-fade-up">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b border-ink/[0.06] px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700">
              {m.eyebrow}
            </p>
            <h3 className="font-display text-lg font-bold tracking-tightest">
              {step === 4 ? m.successTitle : m.title}
            </h3>
          </div>
          <button
            onClick={close}
            aria-label={m.close}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-muted transition hover:bg-sand hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Progresso (4 passos) */}
        {step < 4 && (
          <div className="flex gap-1.5 px-6 pt-4">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-accent-500' : 'bg-sand'
                }`}
              />
            ))}
          </div>
        )}

        {/* Conteúdo */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* 0 · ¿Qué? */}
          {step === 0 && (
            <fieldset>
              <legend className="mb-4 text-base font-semibold">{m.step0Legend}</legend>
              <div className="grid grid-cols-2 gap-3">
                {serviceMeta.map((s, i) => {
                  const Icon = s.icon
                  const active = service === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition ${
                        active
                          ? 'border-accent-500 bg-accent-50 ring-2 ring-accent-500/20'
                          : 'border-ink/10 hover:border-ink/25'
                      }`}
                    >
                      <Icon className={`h-6 w-6 ${active ? 'text-accent-600' : 'text-ink'}`} />
                      <span className="text-sm font-semibold leading-tight">
                        {t.services.items[i].name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          )}

          {/* 1 · ¿Dónde? */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-base font-semibold">{m.whereLegend}</span>
                <input
                  inputMode="numeric"
                  autoFocus
                  value={contact.postal}
                  onChange={(e) => setContact({ ...contact, postal: e.target.value })}
                  placeholder={m.postalPlaceholder}
                  className="w-full rounded-2xl border border-ink/10 p-4 text-base outline-none transition placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </label>
              <p className="flex items-center gap-2 text-xs text-ink-muted">
                <ShieldIcon className="h-4 w-4 shrink-0 text-accent-600" />
                {m.postalHint}
              </p>
            </div>
          )}

          {/* 2 · ¿Cuándo? */}
          {step === 2 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="mb-3 text-base font-semibold">{m.step1Legend}</legend>
                <div className="space-y-2">
                  {URGENCY_IDS.map((id) => {
                    const o = m.urgencyOptions[id]
                    const active = urgency === id
                    return (
                      <button
                        key={id}
                        onClick={() => setUrgency(id)}
                        className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                          active
                            ? 'border-accent-500 bg-accent-50 ring-2 ring-accent-500/20'
                            : 'border-ink/10 hover:border-ink/25'
                        }`}
                      >
                        <span>
                          <span className="block text-sm font-semibold">{o.label}</span>
                          <span className="block text-xs text-ink-muted">{o.hint}</span>
                        </span>
                        {active && <CheckIcon className="h-5 w-5 text-accent-600" />}
                      </button>
                    )
                  })}
                </div>
              </fieldset>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  {m.detailLabel} <span className="font-normal text-ink-faint">{m.optional}</span>
                </span>
                <textarea
                  value={detail}
                  onChange={(e) => setDetail(e.target.value)}
                  rows={3}
                  placeholder={m.detailPlaceholder}
                  className="w-full resize-none rounded-2xl border border-ink/10 p-4 text-sm outline-none transition placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </label>
            </div>
          )}

          {/* 3 · Contacto */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-ink-muted">{m.contactIntro}</p>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{m.nameLabel}</span>
                <input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder={m.namePlaceholder}
                  className="w-full rounded-2xl border border-ink/10 p-4 text-sm outline-none transition placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold">{m.phoneLabel}</span>
                <input
                  inputMode="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder={m.phonePlaceholder}
                  className="w-full rounded-2xl border border-ink/10 p-4 text-sm outline-none transition placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20"
                />
              </label>
              {/* Honeypot: oculto a humanos, los bots lo rellenan */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />
              <p className="flex items-center gap-2 pt-1 text-xs text-ink-muted">
                <ShieldIcon className="h-4 w-4 shrink-0 text-accent-600" />
                {m.privacy}
              </p>
              {sendError && (
                <p className="rounded-2xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
                  {m.sendError}
                </p>
              )}
            </div>
          )}

          {/* 4 · Éxito */}
          {step === 4 && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-accent-100 text-accent-600 animate-pulse-ring">
                <CheckIcon className="h-8 w-8" strokeWidth={2.5} />
              </div>
              <h4 className="font-display text-xl font-bold tracking-tightest">
                {fill(m.successTitleTpl, { name: contact.name.split(' ')[0] || m.thanksWord })}
              </h4>
              <p className="mx-auto mt-2 max-w-sm text-sm text-ink-muted">
                {fill(m.successBodyTpl, {
                  service: selectedName,
                  phone: contact.phone || m.phoneFallback,
                  when: urgency === 'hoje' ? m.whenToday : m.whenSoon,
                })}
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-sand px-4 py-3 text-sm font-medium text-ink">
                <ClockIcon className="h-5 w-5 text-accent-600" />
                {m.responseTime}
              </div>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="border-t border-ink/[0.06] px-6 py-4">
          {step < 4 ? (
            <div className="flex items-center gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as Step)}
                  disabled={sending}
                  className="btn-ghost flex-shrink-0 disabled:opacity-40"
                >
                  {m.back}
                </button>
              )}
              <button
                onClick={() => (step === LAST_INPUT_STEP ? submit() : setStep((s) => (s + 1) as Step))}
                disabled={!canContinue || sending}
                className="btn-accent flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === LAST_INPUT_STEP ? (sending ? m.sending : m.submit) : m.continue}
                {!sending && <ArrowIcon className="h-5 w-5" />}
              </button>
            </div>
          ) : (
            <button onClick={close} className="btn-primary w-full">
              {m.finish}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
