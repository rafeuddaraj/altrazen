'use client'

import { useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Field, Input, Select, Textarea } from '@/components/ui/field'
import { CheckIcon } from '@/components/ui/icons'
import type { ContactPage } from '@/lib/content'

type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const ACCESS_KEY = process.env.NEXT_PUBLIC_FORM_ACCESS_KEY

/**
 * Below this, a submission is rejected as a bot rather than sent. No human
 * reads five fields, including a textarea, and fills them in under this —
 * a scripted submit is the only thing that clears a page load this fast.
 * Kept deliberately low so a genuinely quick human (pasting from elsewhere)
 * is never caught by it.
 */
const MIN_SUBMIT_MS = 2500

export function ContactForm({
  content,
  email,
}: {
  content: ContactPage['form']
  email: string
}) {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  // useState's lazy initializer runs exactly once, unlike useRef(Date.now()),
  // which would call the impure Date.now() on every render even though only
  // the first result is ever used.
  const [mountedAt] = useState(() => Date.now())

  // A job listing's Apply link can deep-link here with ?enquiry=careers to
  // preselect the right option, without a second form or any server logic.
  const searchParams = useSearchParams()
  const requestedEnquiry = searchParams.get('enquiry')
  const initialEnquiry =
    (requestedEnquiry && content.enquiryTypes.some((t) => t.value === requestedEnquiry)
      ? requestedEnquiry
      : content.enquiryTypes[0]?.value) ?? 'other'

  // Held in state so a failed send never loses what someone typed.
  const [values, setValues] = useState({
    name: '',
    email: '',
    website: '',
    enquiry: initialEnquiry,
    message: '',
  })

  const set = (key: keyof typeof values) => (value: string) =>
    setValues((current) => ({ ...current, [key]: value }))

  function validate(): Errors {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Please tell us your name.'
    if (!values.email.trim()) next.email = 'We need an email address to reply to.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'That does not look like an email address.'
    if (values.message.trim().length < 20)
      next.message = 'A sentence or two helps us give you a useful reply.'
    return next
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      document.getElementById(`${id}-${Object.keys(found)[0]}`)?.focus()
      return
    }

    // Spam traps: a field a person cannot see, and a form filled in
    // impossibly fast. Both are checked before anything is sent. The
    // honeypot fails silently — a bot gets no signal at all. The timing
    // check shows the same generic error a network failure would, so it
    // does not reveal which defence caught it either.
    const form = event.currentTarget
    if ((form.elements.namedItem('company_website') as HTMLInputElement)?.value) return
    if (Date.now() - mountedAt < MIN_SUBMIT_MS) {
      setStatus('error')
      return
    }

    if (!ACCESS_KEY) {
      setStatus('error')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Altrazen enquiry: ${values.enquiry}`,
          from_name: values.name,
          name: values.name,
          email: values.email,
          website: values.website,
          enquiry_type: values.enquiry,
          message: values.message,
        }),
      })
      setStatus(response.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="rounded-lg border border-border/40 bg-card/40 px-6 py-14 text-center"
      >
        <span className="mx-auto flex size-10 items-center justify-center rounded-full bg-primary/10">
          <CheckIcon className="size-5 text-primary" />
        </span>
        <p className="mt-5 text-lg font-medium text-foreground">{content.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/* Not shown to people, and hidden from screen readers too. */}
      <div aria-hidden="true" className="absolute left-[-9999px] size-px overflow-hidden">
        <label htmlFor={`${id}-company_website`}>Leave this field empty</label>
        <input id={`${id}-company_website`} name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={`${id}-name`} label="Your name" required error={errors.name}>
          <Input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set('name')(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id}-name-error` : undefined}
          />
        </Field>
        <Field id={`${id}-email`} label="Email" required error={errors.email}>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set('email')(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id}-email-error` : undefined}
          />
        </Field>
      </div>

      <Field id={`${id}-website`} label="Your website or product" hint="If you have one.">
        <Input
          id={`${id}-website`}
          name="website"
          type="url"
          inputMode="url"
          placeholder="https://"
          value={values.website}
          onChange={(e) => set('website')(e.target.value)}
          aria-describedby={`${id}-website-hint`}
        />
      </Field>

      <Field id={`${id}-enquiry`} label="What is this about" required>
        <Select
          id={`${id}-enquiry`}
          name="enquiry"
          value={values.enquiry}
          onChange={(e) => set('enquiry')(e.target.value)}
        >
          {content.enquiryTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field
        id={`${id}-message`}
        label="Your message"
        required
        error={errors.message}
        hint="What you are building, or what has gone wrong. A couple of paragraphs is plenty."
      >
        <Textarea
          id={`${id}-message`}
          name="message"
          value={values.message}
          onChange={(e) => set('message')(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message ? `${id}-message-error` : `${id}-message-hint`
          }
        />
      </Field>

      {status === 'error' ? (
        <p role="alert" className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {content.errorMessage}{' '}
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending' : content.submitLabel}
        </Button>
        <span className="text-xs text-muted-foreground">
          Or email us at{' '}
          <a href={`mailto:${email}`} className="underline underline-offset-4 hover:text-foreground">
            {email}
          </a>
        </span>
      </div>
    </form>
  )
}
