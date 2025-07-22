import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { getAllDocs, getDocBySlug, DocMeta } from "@/lib/docs"
import SidebarLayout from "@/components/SidebarLayout"
import { MDXComponents } from "@/components/MDXComponents"

type Props = {
  docs: DocMeta[]
  mdxSource: MDXRemoteSerializeResult
  meta: DocMeta
}

export const getStaticPaths: GetStaticPaths = async () => {
  const docs = getAllDocs()
  return {
    paths: docs.map((d) => ({ params: { slug: d.slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const docs = getAllDocs()
  const { mdxSource, meta } = await getDocBySlug(slug)
  return { props: { docs, mdxSource, meta } }
}

export default function DocPage({ docs, mdxSource, meta }: Props) {
  return (
    <>
      <Head>
        <title>{`${meta.title} – Knowledge Base`}</title>
        <meta name="description" content={`Documentation for ${meta.title}`} />
      </Head>
      <SidebarLayout
        docs={docs}
        currentSlug={meta.slug}
        currentMeta={meta}
      >
        <article className="prose-custom">
          <h1>{meta.title}</h1>
          <MDXRemote {...mdxSource} components={MDXComponents} />
        </article>
      </SidebarLayout>
    </>
  )
}
