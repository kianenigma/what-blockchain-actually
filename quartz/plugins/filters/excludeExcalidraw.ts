import { QuartzFilterPlugin } from "../types"

/**
 * Filter plugin that excludes all Excalidraw-related content from being published.
 * This includes:
 * - All markdown files in the Excalidraw folder
 * - All pages with slugs starting with "Excalidraw/"
 */
export const ExcludeExcalidraw: QuartzFilterPlugin = () => ({
  name: "ExcludeExcalidraw",
  shouldPublish(_ctx, [_tree, vfile]) {
    const slug = vfile.data?.slug
    // Exclude all Excalidraw content
    if (slug && (slug.includes("Excalidraw") || slug.startsWith("Excalidraw/"))) {
      return false
    }
    return true
  },
})

