/**
 * Fetches the latest release information from GitHub API
 * This is called at build time to embed release data in the static site
 */
export interface GitHubRelease {
  tagName: string
  publishedAt: string
  url: string
}

async function fetchLatestRelease(
  owner: string,
  repo: string,
): Promise<GitHubRelease | null> {
  try {
    const url = `https://api.github.com/repos/${owner}/${repo}/releases/latest`
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        // GitHub API allows unauthenticated requests, but rate limits are higher with auth
        // For public repos, we can use without auth
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`No releases found for ${owner}/${repo}`)
        return null
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return {
      tagName: data.tag_name,
      publishedAt: data.published_at,
      url: data.html_url,
    }
  } catch (error) {
    console.warn(`Failed to fetch GitHub release for ${owner}/${repo}:`, error)
    return null
  }
}

// Cache the release data to avoid multiple fetches
let releaseCache: Promise<GitHubRelease | null> | null = null

/**
 * Gets the latest release for the configured repository.
 * This function caches the result to avoid multiple API calls during build.
 */
export function getLatestRelease(): Promise<GitHubRelease | null> {
  if (!releaseCache) {
    releaseCache = fetchLatestRelease("kianenigma", "what-blockchain-actually")
  }
  return releaseCache
}

