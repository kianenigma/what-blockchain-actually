import { Date, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  /**
   * Whether to display reading time
   */
  showReadingTime: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function ContentMetadata({ cfg, fileData, allFiles, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      if (fileData.dates) {
        segments.push(<Date date={getDate(cfg, fileData)!} locale={cfg.locale} />)
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        // Special Logic: If book-index is true, calculate total time
        if (fileData.frontmatter?.["book-index"]) {
          let totalMinutes = 0
          for (const file of allFiles) {
            if (file.text) {
              const { minutes } = readingTime(file.text)
              totalMinutes += minutes
            }
          }

          const hours = Math.floor(totalMinutes / 60)
          const minutes = Math.ceil(totalMinutes % 60)

          // Format based on duration
          let timeDisplay
          if (hours > 0) {
            timeDisplay = `${hours}h ${minutes}m total reading time`
          } else {
            timeDisplay = i18n(cfg.locale).components.contentMeta.readingTime({
              minutes: Math.ceil(totalMinutes),
            })
          }

          segments.push(<span>{timeDisplay}</span>)
        } else {
          // Standard single-page logic
          const { minutes, words: _words } = readingTime(text)
          const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
            minutes: Math.ceil(minutes),
          })
          segments.push(<span>{displayedTime}</span>)
        }
      }

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segments}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
