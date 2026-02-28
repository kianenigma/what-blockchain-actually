import { QuartzTransformerPlugin } from "../types"
import { Root, Code } from "mdast"
import { visit, SKIP } from "unist-util-visit"
import { renderMermaidSVG } from "beautiful-mermaid"
import katex from "katex"

// Fixed-length placeholder so all LaTeX nodes get equally-sized shapes
const PLACEHOLDER_PREFIX = "__TEX"
const PLACEHOLDER_SUFFIX = "__"

/**
 * Replace $$...$$ in mermaid source with fixed-length placeholders.
 * Returns the processed code and a map of placeholder → LaTeX expression.
 */
function preProcessLatex(code: string): { code: string; latexMap: Map<string, string> } {
  const latexMap = new Map<string, string>()
  let counter = 0
  const processed = code.replace(/\$\$(.*?)\$\$/g, (_match, latex: string) => {
    const placeholder = `${PLACEHOLDER_PREFIX}${counter}${PLACEHOLDER_SUFFIX}`
    latexMap.set(placeholder, latex)
    counter++
    return placeholder
  })
  return { code: processed, latexMap }
}

/**
 * Post-process SVG to replace placeholder text elements with
 * <foreignObject> elements containing KaTeX-rendered HTML.
 */
function postProcessLatex(svg: string, latexMap: Map<string, string>): string {
  // Build a regex that matches any placeholder in a <text> element
  const placeholders = [...latexMap.keys()].map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  if (placeholders.length === 0) return svg

  const pattern = new RegExp(
    `<text\\s([^>]*?)>(${placeholders.join("|")})<\\/text>`,
    "g",
  )

  return svg.replace(pattern, (_match, attrs: string, placeholder: string) => {
    const latex = latexMap.get(placeholder)
    if (!latex) return _match

    const xMatch = attrs.match(/x="([^"]*)"/)
    const yMatch = attrs.match(/y="([^"]*)"/)
    const dyMatch = attrs.match(/dy="([^"]*)"/)
    const fillMatch = attrs.match(/fill="([^"]*)"/)

    const x = xMatch ? parseFloat(xMatch[1]) : 0
    const y = yMatch ? parseFloat(yMatch[1]) : 0
    const dy = dyMatch ? parseFloat(dyMatch[1]) : 0
    const fill = fillMatch ? fillMatch[1] : "currentColor"

    try {
      const html = katex.renderToString(latex, {
        throwOnError: false,
        output: "html",
      })

      const foWidth = 200
      const foHeight = 50
      const centerY = y + dy
      return [
        `<foreignObject`,
        ` x="${x - foWidth / 2}" y="${centerY - foHeight / 2}"`,
        ` width="${foWidth}" height="${foHeight}"`,
        ` style="overflow:visible">`,
        `<div xmlns="http://www.w3.org/1999/xhtml"`,
        ` style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:${fill}">`,
        html,
        `</div></foreignObject>`,
      ].join("")
    } catch {
      return _match
    }
  })
}

const THEME_OPTIONS = {
  bg: "var(--light)",
  fg: "var(--darkgray)",
  line: "var(--tertiary)",
  accent: "var(--secondary)",
  muted: "var(--gray)",
  surface: "var(--light)",
  border: "var(--tertiary)",
  transparent: true,
  font: "var(--bodyFont)",
} as const

export const BeautifulMermaid: QuartzTransformerPlugin = () => {
  return {
    name: "BeautifulMermaid",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "code", (node: Code, index, parent) => {
              if (node.lang !== "mermaid" || index === undefined || !parent) return

              try {
                const hasLatex = node.value.includes("$$")
                let mermaidCode = node.value
                let latexMap = new Map<string, string>()

                if (hasLatex) {
                  const result = preProcessLatex(node.value)
                  mermaidCode = result.code
                  latexMap = result.latexMap
                }

                let svg = renderMermaidSVG(mermaidCode, THEME_OPTIONS)

                if (hasLatex) {
                  svg = postProcessLatex(svg, latexMap)
                }

                parent.children[index] = {
                  type: "html" as const,
                  value: `<div class="beautiful-mermaid">${svg}</div>`,
                }
                return SKIP
              } catch {
                // Leave untouched — OFM's mermaid handler will pick it up as fallback
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        css: [
          {
            content: `
.beautiful-mermaid {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  overflow-x: auto;
}
.beautiful-mermaid svg {
  max-width: 100%;
  height: auto;
  overflow: visible;
}
`,
            inline: true,
          },
        ],
      }
    },
  }
}
