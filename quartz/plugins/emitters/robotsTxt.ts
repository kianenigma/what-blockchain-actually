import { GlobalConfiguration } from "../../cfg"
import { FullSlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"

interface RobotsTxtOptions {
  /**
   * Additional disallow rules (optional)
   */
  disallow?: string[]
  /**
   * Additional allow rules (optional)
   */
  allow?: string[]
}

const defaultOptions: RobotsTxtOptions = {
  disallow: [],
  allow: [],
}

function generateRobotsTxt(cfg: GlobalConfiguration, options: RobotsTxtOptions): string {
  const baseUrl = cfg.baseUrl ?? "example.com"
  const sitemapUrl = `https://${baseUrl}/sitemap.xml`
  const llmTxtUrl = `https://${baseUrl}/llm.txt`

  let content = `# robots.txt for ${cfg.pageTitle ?? "Website"}\n`
  content += `# SEO, LLM, and Search Engine Friendly Configuration\n\n`

  // Allow all user agents
  content += `User-agent: *\n`
  content += `Allow: /\n\n`

  // Specifically allow LLM crawlers
  content += `# LLM Crawlers\n`
  content += `User-agent: GPTBot\n`
  content += `Allow: /\n\n`

  content += `User-agent: ChatGPT-User\n`
  content += `Allow: /\n\n`

  content += `User-agent: Google-Extended\n`
  content += `Allow: /\n\n`

  content += `User-agent: anthropic-ai\n`
  content += `Allow: /\n\n`

  content += `User-agent: Claude-Web\n`
  content += `Allow: /\n\n`

  content += `User-agent: CCBot\n`
  content += `Allow: /\n\n`

  content += `User-agent: PerplexityBot\n`
  content += `Allow: /\n\n`

  content += `User-agent: Applebot-Extended\n`
  content += `Allow: /\n\n`

  // Explicitly allow all markdown content and important files
  content += `# Allow all content files\n`
  content += `Allow: /*.html\n`
  content += `Allow: /*.md\n`
  content += `Allow: /Content/\n`
  content += `Allow: /Common/\n`
  content += `Allow: /Related/\n`
  content += `Allow: /Summaries/\n\n`

  // Allow important resources
  content += `# Allow important resources\n`
  content += `Allow: /llm.txt\n`
  content += `Allow: /sitemap.xml\n`
  content += `Allow: /index.xml\n`
  content += `Allow: /index.html\n\n`

  // Add custom allow rules if provided
  if (options.allow && options.allow.length > 0) {
    content += `# Custom allow rules\n`
    for (const rule of options.allow) {
      content += `Allow: ${rule}\n`
    }
    content += `\n`
  }

  // Disallow only non-content paths
  content += `# Disallow non-content paths\n`
  content += `Disallow: /static/\n`
  content += `Disallow: /*.js$\n`
  content += `Disallow: /*.css$\n`
  content += `Disallow: /*.png$\n`
  content += `Disallow: /*.jpg$\n`
  content += `Disallow: /*.jpeg$\n`
  content += `Disallow: /*.gif$\n`
  content += `Disallow: /*.svg$\n`
  content += `Disallow: /*.webp$\n`
  content += `Disallow: /*.ico$\n`
  content += `Disallow: /404.html\n`
  content += `Disallow: /postscript.js\n`
  content += `Disallow: /prescript.js\n\n`

  // Add custom disallow rules if provided
  if (options.disallow && options.disallow.length > 0) {
    content += `# Custom disallow rules\n`
    for (const rule of options.disallow) {
      content += `Disallow: ${rule}\n`
    }
    content += `\n`
  }

  // Sitemap reference
  content += `# Sitemap\n`
  content += `Sitemap: ${sitemapUrl}\n\n`

  // LLM.txt reference (helpful for LLM crawlers)
  content += `# LLM-friendly content index\n`
  content += `# See also: ${llmTxtUrl}\n`

  return content
}

export const RobotsTxt: QuartzEmitterPlugin<Partial<RobotsTxtOptions>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "RobotsTxt",
    async *emit(ctx) {
      const cfg = ctx.cfg.configuration

      // Generate robots.txt content
      const robotsTxtContent = generateRobotsTxt(cfg, opts)

      // Write to root as robots.txt
      yield write({
        ctx,
        content: robotsTxtContent,
        slug: "robots" as FullSlug,
        ext: ".txt",
      })
    },
  }
}

