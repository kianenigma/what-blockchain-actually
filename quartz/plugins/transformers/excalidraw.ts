import { QuartzTransformerPlugin } from "../types"
import { findAndReplace } from "mdast-util-find-and-replace"
import { Root } from "mdast"

export const Excalidraw: QuartzTransformerPlugin = () => {
  return {
    name: "Excalidraw",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            // Match ![[...excalidraw...]]
            // Captures:
            // 1. Path before .excalidraw
            // 2. Alias (starting with |)
            const excalidrawRegex = new RegExp(/!\[\[([^\[\]\|\#\\]+)\.excalidraw(\|[^\[\]\#]*)?\]\]/g)

            findAndReplace(tree, [
              excalidrawRegex,
              (_value: string, ...capture: string[]) => {
                const [fp, alias] = capture
                // fp is the file path without extension

                // Construct filenames for light and dark modes
                const filePath = fp + ".excalidraw"
                const lightSvg = filePath + ".light.svg"
                const darkSvg = filePath + ".dark.svg"

                const altText = alias ? alias.slice(1) : fp

                // We output raw HTML.
                // CrawlLinks (links.ts) will later find these img tags and resolve the relative paths/slugs correctly.
                return {
                  type: 'html',
                  value: `
<div class="excalidraw-container">
  <img src="${lightSvg}" class="excalidraw-light" alt="${altText}" />
  <img src="${darkSvg}" class="excalidraw-dark" alt="${altText}" />
</div>
`
                }
              }
            ])
          }
        }
      ]
    },
    externalResources() {
      return {
        css: [{
          content: `
.excalidraw-container {
  position: relative;
  display: block;
  width: 100%;
}

.excalidraw-container img {
  width: 100%;
  height: auto;
  margin: 1rem 0;
  display: block;
}

:root[saved-theme=dark] .excalidraw-container .excalidraw-light {
  display: none !important;
}

:root[saved-theme=dark] .excalidraw-container .excalidraw-dark {
  display: block !important;
}

:root[saved-theme=light] .excalidraw-container .excalidraw-dark {
  display: none !important;
}

:root[saved-theme=light] .excalidraw-container .excalidraw-light {
  display: block !important;
}
`,
          inline: true
        }]
      }
    }
  }
}
