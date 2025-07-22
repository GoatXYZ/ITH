import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Layout } from "@/components/Layout"

export default function Home() {
  return (
    <Layout
      title="Knowledge Base - Internal Documentation Portal"
      description="Your internal documentation and support portal. Find answers, browse guides, and get help."
    >
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen p-10 text-center">
        <div>
          <div className="mb-8">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4">
              Knowledge Base
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Your internal documentation and support portal. Find answers, browse guides, and get help when you need it.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Browse Documentation
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-8 py-3 text-lg font-medium"
              >
                Submit a Ticket
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Panel 1: Getting Started */}
      <section className="bg-white py-20 px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Getting Started</h2>
        <p className="text-slate-700 text-lg">
          Learn how to set up and use the knowledge base effectively. From onboarding guides to best practices.
        </p>
      </section>

      {/* Panel 2: Popular Articles */}
      <section className="bg-slate-100 py-20 px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Popular Articles</h2>
        <p className="text-slate-700 text-lg">
          Explore frequently accessed documentation topics and helpful walkthroughs from your team.
        </p>
      </section>

      {/* Panel 3: Need More Help? */}
      <section className="bg-indigo-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Need More Help?</h2>
        <p className="text-slate-700 text-lg mb-6">
          If you can’t find what you're looking for, reach out to our support team for personalized help.
        </p>
        <Link href="/contact">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-base font-medium">
            Contact Support
          </Button>
        </Link>
      </section>
    </Layout>
  )
}
