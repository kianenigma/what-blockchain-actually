import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface GithubControlsOptions {
  /**
   * GitHub repository URL (e.g., "https://github.com/owner/repo")
   */
  repoUrl: string
  /**
   * Git branch name (e.g., "main" or "master")
   */
  branch?: string
  /**
   * Text to display on the "Suggest Edit" button
   */
  suggestEditText?: string
  /**
   * Text to display on the "Ask a Question" button
   */
  askQuestionText?: string
  /**
   * URL for the "Ask a Question" discussion page
   */
  discussionsUrl?: string
}

const defaultOptions: GithubControlsOptions = {
  repoUrl: "https://github.com/kianenigma/what-blockchain-actually",
  branch: "v4",
  suggestEditText: "Suggest Edit",
  askQuestionText: "Ask a Question",
  discussionsUrl: "https://github.com/kianenigma/what-blockchain-actually/discussions/new?category=q-a",
}

export default ((opts?: Partial<GithubControlsOptions>) => {
  const options = { ...defaultOptions, ...opts }

  const GithubControls: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    // Construct the GitHub edit URL for "Suggest Edit" button
    // Prefer relativePath (relative to content directory) over filePath (absolute or relative to repo)
    let githubPath: string | null = null

    if (fileData.relativePath) {
      // relativePath is relative to the content directory, so prepend "content/"
      const relativePathStr = String(fileData.relativePath)
      githubPath = relativePathStr.startsWith("content/")
        ? relativePathStr
        : `content/${relativePathStr}`
    } else if (fileData.filePath) {
      // filePath might be absolute or relative to repo root
      const filePathStr = String(fileData.filePath)
      // If it contains "content/", extract the part from "content/" onwards
      const contentIndex = filePathStr.indexOf("content/")
      if (contentIndex !== -1) {
        githubPath = filePathStr.substring(contentIndex)
      } else {
        // Assume it's already relative to repo root
        githubPath = filePathStr
      }
    }

    // Construct the full GitHub edit URL
    // Ensure the path ends with .md extension
    let finalPath = githubPath
    if (finalPath && !finalPath.endsWith(".md")) {
      finalPath = `${finalPath}.md`
    }
    const editUrl = finalPath
      ? `${options.repoUrl}/edit/${options.branch}/${finalPath}`
      : null

    // Get the chapter/page title for prefilling the discussion
    const chapterTitle = fileData.frontmatter?.title
    let discussionsUrl: string = options.discussionsUrl ?? defaultOptions.discussionsUrl!
    if (chapterTitle) {
      // Format: "<Chapter Name>: Your Question"
      const prefilledTitle = `${chapterTitle}: Your Question`
      // URL encode the title and add it as a query parameter
      const encodedTitle = encodeURIComponent(prefilledTitle)
      // Check if URL already has query parameters
      const separator = discussionsUrl.includes("?") ? "&" : "?"
      discussionsUrl = `${discussionsUrl}${separator}title=${encodedTitle}`
    }

    return (
      <div class={classNames(displayClass, "github-controls")}>
        {editUrl && (
          <a
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            class="github-controls-button github-controls-button-edit"
          >
            {options.suggestEditText}
          </a>
        )}
        <a
          href={discussionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="github-controls-button github-controls-button-question"
        >
          {options.askQuestionText}
        </a>
      </div>
    )
  }

  GithubControls.css = `
.github-controls {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
}

.github-controls-button {
  display: inline-block;
  padding: 0;
  background: none;
  color: var(--gray);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: normal;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.github-controls-button:hover {
  opacity: 1;
  text-decoration: underline;
}

.github-controls-button:visited {
  color: var(--gray);
}
`

  return GithubControls
}) satisfies QuartzComponentConstructor

