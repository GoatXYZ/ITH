import { GetStaticProps } from "next"
import Link from "next/link"
import { getAllDocs, DocMeta } from "@/lib/docs"
import { Card } from "@/components/ui/card"
import { Layout } from "@/components/Layout"

export const getStaticProps: GetStaticProps = async () => {
  const docs = getAllDocs()
  return { props: { docs } }
}

export default function DocsHome({ docs }: { docs: DocMeta[] }) {
  const categories = Array.from(new Set(docs.map((d) => d.category)))

  return (
    <Layout
      title="Documentation - Knowledge Base"
      description="Browse all documentation and guides in our knowledge base"
    >
      <div className="py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
            <svg
              className="w-8 h-8 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Documentation</h1>
          <p className="text-xl text-slate-600">
            Browse our comprehensive guides and tutorials
          </p>
        </div>

        <div className="space-y-8">
          {categories.map((category) => (
            <div key={category} className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{category}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {docs
                  .filter((d) => d.category === category)
                  .map((d) => (
                    <Card
                      key={d.slug}
                      className="p-4 hover:shadow-md transition-shadow duration-200 border border-slate-200"
                    >
                      <Link href={`/docs/${d.slug}`} className="block">
                        <h3 className="font-semibold text-indigo-600 hover:text-indigo-700 mb-2 transition-colors">
                          {d.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                          Learn more about {d.title.toLowerCase()}
                        </p>
                      </Link>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
