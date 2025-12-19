import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative, simplifySlug } from "../util/path"
import style from "./styles/bookPagination.scss"

interface BookPaginationOptions {
  sort?: (f1: File, f2: File) => number
}

export default ((opts?: Partial<BookPaginationOptions>) => {
  const BookPagination: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const indexFile = allFiles.find((f) => f.frontmatter?.["book-index"] === true)
    if (!indexFile) {
      return null
    }

    const orderedSlugs = indexFile.links!
    const currentSlug = simplifySlug(fileData.slug!)
    const currentIndex = orderedSlugs.indexOf(currentSlug)

    if (currentIndex === -1) {
      return null
    }
    console.log(indexFile.links)
    console.log(fileData.slug)
    console.log(currentIndex)

    const prevSlug = currentIndex > 0 ? orderedSlugs[currentIndex - 1] : null
    const nextSlug = currentIndex < orderedSlugs.length - 1 ? orderedSlugs[currentIndex + 1] : null

    const prevFile = prevSlug ? allFiles.find(f => simplifySlug(f.slug!) === prevSlug) : null
    const nextFile = nextSlug ? allFiles.find(f => simplifySlug(f.slug!) === nextSlug) : null

    if (!prevFile && !nextFile) {
      return null
    }

    return (
      <div class={classNames(displayClass, "book-pagination")}>
        {prevFile && (
          <a href={resolveRelative(fileData.slug!, prevFile.slug!)} class="book-pagination-prev">
            <div class="book-pagination-label">« Previous Chapter</div>
            <div class="book-pagination-title">{prevFile.frontmatter?.title ?? prevFile.slug}</div>
            {prevFile.frontmatter?.description && (
              <div class="book-pagination-desc">{prevFile.frontmatter.description}</div>
            )}
          </a>
        )}
        <div class="spacer"></div>
        {nextFile && (
          <a href={resolveRelative(fileData.slug!, nextFile.slug!)} class="book-pagination-next">
            <div class="book-pagination-label">Next Chapter »</div>
            <div class="book-pagination-title">{nextFile.frontmatter?.title ?? nextFile.slug}</div>
            {nextFile.frontmatter?.description && (
              <div class="book-pagination-desc">{nextFile.frontmatter.description}</div>
            )}
          </a>
        )}
      </div>
    )
  }

  BookPagination.css = style
  return BookPagination
}) satisfies QuartzComponentConstructor

