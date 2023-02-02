export interface IBlog {
  id: string
  name: string
  slug: string
  description: string
  template: number
  createdAt: Date
  user: IUser
  articles: IArticle[]
}

export interface IUser {
  id: string
  nickname: string
  city?: string
  firstName?: string
  lastName?: string
  description?: string
  avatar?: string
  createdAt?: Date
  lastLogin?: Date
}

export interface IArticle {
  id: string
  title: string
  slug: string
  blogId: string
  createdAt: Date
  postedAt: Date
  show: boolean
  country: string
  version: number
  articleContent: IArticleContent[]
}
export interface IArticleContent {
  version: number
  id: string
  current: boolean
  content: IContent
}
export interface IContent {
  time: number
  version: number
  blocks: IContentBlock[]
}
export interface IContentBlock {
  id: string
  type: string
  data: IContentBlockData
}
export interface IContentBlockData {
  text?: string
  level?: number
  style?: string
  items?: string[]
  html?: string
  caption?: string
  url?: string
  alt?: string
}
