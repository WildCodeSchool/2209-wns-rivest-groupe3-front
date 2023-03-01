import slugify from "slugify"

export const slugifyOptions = {
    replacement: '-',
    remove: /[*+~.()'"!:@]/g,
    lower: true,
    strict: true,
    locale: 'vi',
    trim: true,
  }
  

export const slugPreview = (name: string, arr: string[]): string => {
    const baseSlug = slugify(name, slugifyOptions)

    let isBlogExists = true
    let newSlug = baseSlug
    let i = 0

    while (isBlogExists) {
      if (arr.includes(newSlug)) {
        i++
        newSlug = `${baseSlug}_${i}`
      } else {
        isBlogExists = false
      }
    }
    return newSlug
  }