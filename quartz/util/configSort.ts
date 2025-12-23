import fs from "fs"
import path from "path"
import { QuartzPluginData } from "../plugins/vfile"
import { simplifySlug } from "./path"

const CONTENT_FOLDERS = ["What", "Summaries", "Scaling", "Polkadot", "Misc"] as const

/**
 * Read and parse index.md to extract ordered file links
 */
function readIndexFile(): string[] {
  try {
    const indexPath = path.join(process.cwd(), "content", "index.md")
    const content = fs.readFileSync(indexPath, "utf-8")

    // Extract wikilinks like [[Link]] or [[Link|Display]]
    const wikilinkRegex = /\[\[([^\]]+)\]\]/g
    const links: string[] = []
    let match

    while ((match = wikilinkRegex.exec(content)) !== null) {
      const linkText = match[1]
      // Handle [[Link|Display]] format - take the link part
      const link = linkText.split("|")[0].trim()
      if (link && link !== "index") {
        links.push(link)
      }
    }

    return links
  } catch (error) {
    console.warn("Could not read index.md for sorting:", error)
    return []
  }
}

/**
 * Create order maps from index.md at config time
 */
function createOrderMaps() {
  const orderedLinks = readIndexFile()

  // Create folder order map (hardcoded)
  const folderOrderMap: Record<string, number> = {}
  CONTENT_FOLDERS.forEach((folder, index) => {
    folderOrderMap[folder] = index
  })

  // Create file order map from index.md links
  // Key by the slugified last segment (filename) for matching
  const fileOrderMap: Record<string, number> = {}
  orderedLinks.forEach((link, index) => {
    // If link has a path, get the last segment, otherwise use the whole link
    const parts = link.split("/")
    const lastPart = parts[parts.length - 1] || link
    // Slugify the segment to match how Quartz slugifies filenames
    const slugified = slugifySegment(lastPart)
    fileOrderMap[slugified] = index
  })

  return { folderOrderMap, fileOrderMap }
}

/**
 * Check if a slug is in the Content folder
 */
function isInContentFolder(slug: string | undefined): boolean {
  if (!slug) return false
  const normalized = simplifySlug(slug as any)
  return normalized.startsWith("Content/") || normalized === "Content"
}

/**
 * Get the folder segment name from a slug
 */
function getContentFolderSegment(slug: string): string | null {
  const normalized = simplifySlug(slug as any)
  if (!normalized.startsWith("Content/")) return null
  const parts = normalized.split("/")
  if (parts.length < 2) return null
  return parts[1]
}

/**
 * Slugify a string (same logic as Quartz's sluggify for a single segment)
 */
function slugifySegment(s: string): string {
  return s
    .replace(/\s/g, "-")
    .replace(/&/g, "-and-")
    .replace(/%/g, "-percent")
    .replace(/\?/g, "")
    .replace(/#/g, "")
}

/**
 * Get the last segment (filename) from a slug
 */
function getLastSegment(slug: string): string {
  const normalized = simplifySlug(slug as any)
  const parts = normalized.split("/")
  return parts[parts.length - 1] || normalized
}

/**
 * Alphabetical sort helper
 */
function alphabeticalSort(a: string, b: string): number {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: "base",
  })
}

// Create order maps once at module load time
const { folderOrderMap, fileOrderMap } = createOrderMaps()

/**
 * Creates a self-contained sort function for FileTrieNode (used by Explorer)
 * Returns a function whose toString() returns the complete serializable string
 */
export function createExplorerSortFn(): (a: any, b: any) => number {
  const functionString = `(function() {
    const folderOrderMap = ${JSON.stringify(folderOrderMap)};
    const fileOrderMap = ${JSON.stringify(fileOrderMap)};

    function simplifySlug(slug) {
      if (!slug) return "";
      return slug.replace(/\\/index$/, "").replace(/^\\//, "") || "/";
    }

    function isInContentFolder(slug) {
      if (!slug) return false;
      const normalized = simplifySlug(slug);
      return normalized.startsWith("Content/") || normalized === "Content";
    }

    function getContentFolderSegment(slug) {
      const normalized = simplifySlug(slug);
      if (!normalized.startsWith("Content/")) return null;
      const parts = normalized.split("/");
      if (parts.length < 2) return null;
      return parts[1];
    }

    function slugifySegment(s) {
      return s
        .replace(/\\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\\?/g, "")
        .replace(/#/g, "");
    }

    function getLastSegment(slug) {
      const normalized = simplifySlug(slug);
      const parts = normalized.split("/");
      return parts[parts.length - 1] || normalized;
    }

    function alphabeticalSort(a, b) {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: "base",
      });
    }

    return function(a, b) {
      const aSlug = a.slug;
      const bSlug = b.slug;
      const aInContent = isInContentFolder(aSlug);
      const bInContent = isInContentFolder(bSlug);

      // If either is not in Content folder, use alphabetical
      if (!aInContent || !bInContent) {
        if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
          return alphabeticalSort(a.displayName, b.displayName);
        }
        return a.isFolder ? -1 : 1;
      }

      // Folders vs files: folders first
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;

      if (a.isFolder && b.isFolder) {
        // Both are folders: use hardcoded order
        const aSegment = getContentFolderSegment(aSlug);
        const bSegment = getContentFolderSegment(bSlug);

        if (!aSegment || !bSegment) {
          return alphabeticalSort(a.displayName, b.displayName);
        }

        const aOrder = folderOrderMap[aSegment];
        const bOrder = folderOrderMap[bSegment];

        if (aOrder !== undefined && bOrder !== undefined) {
          return aOrder - bOrder;
        }
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return alphabeticalSort(a.displayName, b.displayName);
      } else {
        // Both are files: use order from index.md
        // Extract last segment (filename) from slugs
        const aLastSegment = getLastSegment(aSlug);
        const bLastSegment = getLastSegment(bSlug);

        const aOrder = fileOrderMap[aLastSegment];
        const bOrder = fileOrderMap[bLastSegment];

        if (aOrder !== undefined && bOrder !== undefined) {
          return aOrder - bOrder;
        }
        if (aOrder !== undefined) return -1;
        if (bOrder !== undefined) return 1;
        return alphabeticalSort(a.displayName, b.displayName);
      }
    };
  })()`

  // Create a function that when toString() is called, returns the complete string
  const fn = new Function("return " + functionString)()
  fn.toString = () => functionString
  return fn
}

/**
 * Check if a file contains "Introduction" in its slug or title
 */
function containsIntroduction(file: QuartzPluginData): boolean {
  const slug = file.slug || ""
  const title = file.frontmatter?.title || ""
  return slug.toLowerCase().includes("introduction") || title.toLowerCase().includes("introduction")
}

/**
 * Sort function for QuartzPluginData (used by FolderPage)
 */
export function folderPageSortFn(a: QuartzPluginData, b: QuartzPluginData): number {
    const aSlug = a.slug
    const bSlug = b.slug

    // Exception: files containing "Introduction" always come first
    const aIsIntroduction = containsIntroduction(a)
    const bIsIntroduction = containsIntroduction(b)
    if (aIsIntroduction && !bIsIntroduction) return -1
    if (!aIsIntroduction && bIsIntroduction) return 1

    const aInContent = isInContentFolder(aSlug)
    const bInContent = isInContentFolder(bSlug)

    // If either is not in Content folder, use alphabetical
    if (!aInContent || !bInContent) {
      const aName = a.frontmatter?.title || aSlug || ""
      const bName = b.frontmatter?.title || bSlug || ""
      return alphabeticalSort(aName, bName)
    }

    // Both are in Content folder
    // Determine if they are folders or files
    const aIsFolder = aSlug?.endsWith("/index") || aSlug?.endsWith("index")
    const bIsFolder = bSlug?.endsWith("/index") || bSlug?.endsWith("index")

    // Folders vs files: folders first
    if (aIsFolder && !bIsFolder) return -1
    if (!aIsFolder && bIsFolder) return 1

    if (aIsFolder && bIsFolder) {
      // Both are folders: use hardcoded order
      const aSegment = getContentFolderSegment(aSlug!)
      const bSegment = getContentFolderSegment(bSlug!)

      if (!aSegment || !bSegment) {
        return alphabeticalSort(aSlug || "", bSlug || "")
      }

      const aOrder = folderOrderMap[aSegment]
      const bOrder = folderOrderMap[bSegment]

      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder
      }
      if (aOrder !== undefined) return -1
      if (bOrder !== undefined) return 1
      return alphabeticalSort(aSlug || "", bSlug || "")
    } else {
      // Both are files: use order from index.md
      // Extract last segment (filename) from slugs
      const aLastSegment = getLastSegment(aSlug!)
      const bLastSegment = getLastSegment(bSlug!)

      const aOrder = fileOrderMap[aLastSegment]
      const bOrder = fileOrderMap[bLastSegment]

      if (aOrder !== undefined && bOrder !== undefined) {
        return aOrder - bOrder
      }
      if (aOrder !== undefined) return -1
      if (bOrder !== undefined) return 1

      // Fallback: use title if available, otherwise slug
      const aName = a.frontmatter?.title || aSlug || ""
      const bName = b.frontmatter?.title || bSlug || ""
      return alphabeticalSort(aName, bName)
    }
}

