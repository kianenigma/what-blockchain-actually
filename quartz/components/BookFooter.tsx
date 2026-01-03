import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"
import { GitHubRelease } from "../util/githubRelease"

interface Options {
  links: Record<string, string>
  latestRelease?: GitHubRelease | null
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    const release = opts?.latestRelease

    // Format release date
    const formatReleaseDate = (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }

    return (
      <footer class={`${displayClass ?? ""}`}>
        {release && (
          <p>
            Latest release:{" "}
            <a href={release.url} target="_blank" rel="noopener noreferrer">
              {release.tagName}
            </a>{" "}
            ({formatReleaseDate(release.publishedAt)})
          </p>
        )}
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
          <li>
          Created by <a href="https://kianenigma.com">@kianenigma</a>
          </li>
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
