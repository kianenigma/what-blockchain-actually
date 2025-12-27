import { GlobalConfiguration } from "../../cfg"
import { FullSlug, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { escapeHTML } from "../../util/escape"

interface PageInfo {
  slug: FullSlug
  title: string
  description?: string
  url: string
}

interface LLMTxtOptions {
  /**
   * Website description to include at the top
   */
  description?: string
}

const defaultOptions: LLMTxtOptions = {
  description: "A comprehensive guide to understanding blockchain technology, covering fundamental concepts, scaling solutions, and real-world applications.",
}

function getSectionName(slug: FullSlug): string {
  const simpleSlug = simplifySlug(slug)
  const parts = simpleSlug.split("/").filter(p => p.length > 0)

  // Handle root index
  if (simpleSlug === "index" || simpleSlug === "/" || parts.length === 0) {
    return "Home"
  }

  // Get the first meaningful segment (skip "Content" prefix if present)
  let firstPart = parts[0]
  if (firstPart === "Content" && parts.length > 1) {
    firstPart = parts[1]
  }

  // Map known sections to friendly names
  const sectionMap: Record<string, string> = {
    "What": "What Is A Blockchain?",
    "Scaling": "Scaling Solutions",
    "Polkadot": "Polkadot",
    "Appendices": "Appendices",
    "Summaries": "Summaries",
    "Common": "Glossary & Definitions",
    "Related": "Related Content",
  }

  return sectionMap[firstPart] || firstPart
}

function generateLLMTxt(
  cfg: GlobalConfiguration,
  pages: PageInfo[],
  description: string,
): string {
  const siteTitle = cfg.pageTitle ?? "Website"

  // Group pages by section
  const sections = new Map<string, PageInfo[]>()

  for (const page of pages) {
    const section = getSectionName(page.slug)
    if (!sections.has(section)) {
      sections.set(section, [])
    }
    sections.get(section)!.push(page)
  }

  // Build the llm.txt content
  let content = `# ${siteTitle}\n`
  content += `> ${description}\n\n`

  // Sort sections in a logical order
  const sectionOrder = [
    "Home",
    "What Is A Blockchain?",
    "Scaling Solutions",
    "Polkadot",
    "Appendices",
    "Summaries",
    "Glossary & Definitions",
    "Related Content",
  ]

  const sortedSections = Array.from(sections.entries()).sort(([a], [b]) => {
    const aIndex = sectionOrder.indexOf(a)
    const bIndex = sectionOrder.indexOf(b)
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })

  // Write each section
  for (const [sectionName, sectionPages] of sortedSections) {
    content += `## ${sectionName}\n`

    // Sort pages within section alphabetically by title
    const sortedPages = sectionPages.sort((a, b) => a.title.localeCompare(b.title))

    for (const page of sortedPages) {
      const descriptionText = page.description ? `: ${page.description}` : ""
      content += `- [${page.title}](${page.url})${descriptionText}\n`
    }

    content += `\n`
  }

  // Add optional section note
  content += `## Optional\n`
  content += `- Additional resources and diagrams are available throughout the site.\n`

  return content
}

export const LLMTxt: QuartzEmitterPlugin<Partial<LLMTxtOptions>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "LLMTxt",
    async *emit(ctx, content) {
      const cfg = ctx.cfg.configuration
      const baseUrl = cfg.baseUrl ?? "example.com"

      const pages: PageInfo[] = []

      // Process all content files
      for (const [_tree, file] of content) {
        const slug = file.data.slug!
        const title = file.data.frontmatter?.title ?? "Untitled"

        // Skip certain pages (404, tags, and Excalidraw diagrams)
        if (slug === "404" || slug.includes("tags/") || slug.includes("Excalidraw")) {
          continue
        }

        // Determine description: first try frontmatter, then auto-generated (first 150 chars)
        let description: string | undefined

        // First priority: frontmatter description
        description = file.data.frontmatter?.description?.trim()

        // Fall back to auto-generated description if no frontmatter description
        if (!description) {
          const autoDesc = file.data.description?.trim()
          if (autoDesc) {
            if (autoDesc.length > 150) {
              description = autoDesc.substring(0, 150) + "..."
            } else {
              description = autoDesc
            }
          }
        }

        // Build full URL
        const simpleSlug = simplifySlug(slug)
        const url = simpleSlug === "/" || simpleSlug === "index"
          ? `https://${baseUrl}/`
          : `https://${baseUrl}/${simpleSlug}`

        pages.push({
          slug,
          title: escapeHTML(title),
          description: description ? escapeHTML(description) : undefined,
          url,
        })
      }

      // Generate llm.txt content
      const llmTxtContent = generateLLMTxt(cfg, pages, opts.description!)

      // Write to root as llm.txt
      yield write({
        ctx,
        content: llmTxtContent,
        slug: "llm" as FullSlug,
        ext: ".txt",
      })
    },
  }
}

