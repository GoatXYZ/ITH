import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { serialize } from "next-mdx-remote/serialize"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import remarkGfm from "remark-gfm"

export type DocMeta = { slug: string; title: string; category: string }

const docsPath = path.join(process.cwd(), "docs", "content")

export function getAllDocs(): DocMeta[] {
  return fs
    .readdirSync(docsPath)
    .filter((f) => f.endsWith(".mdx"))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "")
      const source = fs.readFileSync(path.join(docsPath, filename), "utf-8")
      const { data } = matter(source)
      return {
        slug,
        title: data.title as string,
        category: data.category as string,
      }
    })
}

export async function getDocBySlug(
  slug: string
): Promise<{
  mdxSource: MDXRemoteSerializeResult
  meta: DocMeta
}> {
  const fullPath = path.join(docsPath, `${slug}.mdx`)
  const source = fs.readFileSync(fullPath, "utf-8")
  const { content, data } = matter(source)
  const mdxSource = await serialize(content, { 
    scope: data,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    }
  })
  return {
    mdxSource,
    meta: {
      slug,
      title: data.title as string,
      category: data.category as string,
    },
  }
}
