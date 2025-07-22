import Link from "next/link"
import type { DocMeta } from "@/lib/docs"

type Props = {
  docs: DocMeta[]
  currentSlug: string
  currentMeta: DocMeta
  children: React.ReactNode
}

export default function SidebarLayout({
  docs,
  currentSlug,
  currentMeta,
  children,
}: Props) {
  const categories = Array.from(new Set(docs.map((d) => d.category)))

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-80 bg-white border-r border-slate-200 shadow-sm flex flex-col">
        <div className="p-6 flex-shrink-0">
          <div className="mb-6 h-16 flex flex-col justify-between">
            <nav aria-label="Breadcrumb" className="text-xs">
              <ol className="flex items-center space-x-2">
                <li><Link href="/" className="text-slate-500 hover:text-indigo-600 transition-colors">Home</Link></li>
                <li className="text-slate-300">›</li>
                <li><Link href="/docs" className="text-slate-500 hover:text-indigo-600 transition-colors">Docs</Link></li>
                <li className="text-slate-300">›</li>
                <li className="text-slate-600">{currentMeta.category}</li>
              </ol>
            </nav>
            <h1 className="font-semibold text-slate-900 text-sm leading-tight">
              {currentMeta.title}
            </h1>
          </div>

          <hr className="border-slate-200 mb-6" />

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Categories</h2>
            <p className="text-xs text-slate-500">Browse our knowledge base</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {categories.map((cat) => (
            <div key={cat} className="mb-6">
              <h3 className="font-semibold text-xs text-slate-700 mb-3 uppercase tracking-wide">
                {cat}
              </h3>
              <ul className="space-y-1">
                {docs
                  .filter((d) => d.category === cat)
                  .map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/docs/${d.slug}`}
                        className={
                          `block px-3 py-2 rounded-lg text-xs transition-all duration-200 ${
                            currentSlug === d.slug 
                              ? 'bg-indigo-50 text-indigo-700 font-medium border-l-2 border-indigo-500' 
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          }`
                        }
                      >
                        {d.title}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8 bg-white">{children}</main>
    </div>
  )
}
