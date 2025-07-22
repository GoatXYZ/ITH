import Link from "next/link";
import Head from "next/head";
import { ReactNode } from "react";

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

export function Layout({ title, description, children }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ?? "Knowledge Base"}</title>
        {description && <meta name="description" content={description} />}
      </Head>

      <header className="sticky top-0 z-10 bg-white shadow">
        <div className="w-[60%] mx-auto flex items-center justify-between py-4">
          <Link href="/">
            <img src="/Kolene_2025_Logo.png" alt="Company Logo" className="h-8" />
          </Link>
          <nav className="flex space-x-6">
            <Link href="/" className="text-slate-700 hover:text-indigo-600">
              Home
            </Link>
            <Link href="/docs" className="text-slate-700 hover:text-indigo-600">
              Docs
            </Link>
            <Link href="/contact" className="text-slate-700 hover:text-indigo-600">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="w-[60%] mx-auto">{children}</div>
      </main>
    </>
  );
}
