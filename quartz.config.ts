import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"
import { folderPageSortFn } from "./quartz/util/configSort"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "What is a Blockchain, Actually?",
    pageTitleSuffix: "",
    // TODO: I think false is better for SEO?
    enableSPA: false,
    enablePopovers: true,
    // we use a custom simple analytics script
    analytics: null,
    locale: "en-US",
    baseUrl: "blog.kianenigma.com/what-blockchain-actually",
    ignorePatterns: ["private", "templates", ".obsidian", "**/*.excalidraw.md",],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FEFCFB",
          lightgray: "#E8E6E3",
          gray: "#9B9690",
          darkgray: "#2D2925",
          dark: "#1A1612",
          secondary: "#6B4E3D",
          tertiary: "#8B7565",
          highlight: "rgba(107, 78, 61, 0.1)",
          textHighlight: "#6B4E3D",
        },
        darkMode: {
          light: "#1A1816",
          lightgray: "#3A3632",
          gray: "#8B8278",
          darkgray: "#E8E4DF",
          dark: "#F5F2ED",
          secondary: "#D4B896",
          tertiary: "#B8A68A",
          highlight: "rgba(212, 184, 150, 0.15)",
          textHighlight: "#D4B896",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),

      // Note: must come before ObsidianFlavoredMarkdown
      Plugin.Excalidraw(),
      Plugin.BeautifulMermaid(),

      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: folderPageSortFn,
      }),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
      Plugin.LLMTxt(),
      Plugin.RobotsTxt(),
    ],
  },
}

export default config
