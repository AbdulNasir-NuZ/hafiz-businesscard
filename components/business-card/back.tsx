"use client"

type Props = {
  company: string
  otherWebsites: { label: string; url: string }[]
  note?: string
}

export function BusinessCardBack({ company, otherWebsites, note }: Props) {
  return (
    <div className="relative size-full rounded-xl bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100 shadow-2xl ring-1 ring-black/5 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none rounded-xl ring-1 ring-black/5"></div>

      <div className="flex size-full flex-col p-4 sm:p-6">
        <h3 className="text-base font-semibold">{company}</h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Additional links</p>

        <ul className="mt-4 space-y-2">
          {otherWebsites.map((site) => (
            <li key={site.url} className="group">
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-700 dark:text-slate-200 hover:underline break-all"
              >
                <span className="font-medium">{site.label}: </span>
                {site.url}
              </a>
            </li>
          ))}
        </ul>

        {note ? <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{note}</p> : null}

        <div className="flex-1" />

        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Flip the card to return to the front. Click or press Enter/Space.
        </p>
      </div>
    </div>
  )
}
