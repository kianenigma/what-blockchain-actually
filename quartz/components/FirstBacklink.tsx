import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"

interface FirstBacklinkOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: FirstBacklinkOptions = {
  hideWhenEmpty: true,
}

export default ((opts?: Partial<FirstBacklinkOptions>) => {
  const options: FirstBacklinkOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const FirstBacklink: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const currentSlug = simplifySlug(fileData.slug!)

    // Find the index file similar to BookPagination
    const indexFile = allFiles.find((f) => f.frontmatter?.["book-index"] === true)
    if (!indexFile) {
      return null
    }

    // Get ordered list of main chapters
    const orderedSlugs = indexFile.links!
    if (!orderedSlugs || orderedSlugs.length === 0) {
      return null
    }

    // Find the first file in the ordered list that mentions the current file
    let firstBacklinkFile = null
    for (const slug of orderedSlugs) {
      const file = allFiles.find((f) => simplifySlug(f.slug!) === slug)
      if (file && file.links?.includes(currentSlug)) {
        firstBacklinkFile = file
        break
      }
    }

    if (options.hideWhenEmpty && !firstBacklinkFile) {
      return null
    }

    if (!firstBacklinkFile) {
      return null
    }

    return (
      <div class={classNames(displayClass, "backlinks", "first-backlink")}>
        <h3>Introduced In</h3>
        <OverflowList>
          <li>
            <a href={resolveRelative(fileData.slug!, firstBacklinkFile.slug!)} class="internal">
              {firstBacklinkFile.frontmatter?.title}
            </a>
          </li>
        </OverflowList>
      </div>
    )
  }

  FirstBacklink.css = style
  FirstBacklink.afterDOMLoaded = overflowListAfterDOMLoaded

  return FirstBacklink
}) satisfies QuartzComponentConstructor

