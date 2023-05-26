import { OutputData } from '@editorjs/editorjs'

export interface IBlog {
  id: string
  name: string
  slug: string
  description: string
  template: number
  createdAt: Date
  user: IUser
  coverUrl: string | null
  articles: IArticle[]
  subscriptions: ISubscription[]
}

export interface ISubscription {
  id: string
  user: {
    id: string
    nickname: string
  }
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
  blogs: IBlog[]
}

export interface IArticle {
  id: string
  title: string
  slug: string
  blogId: string
  coverUrl: string
  createdAt: Date
  postedAt: Date
  show: boolean
  country: string
  version: number
  articleContent: IArticleContent[]
  comments: IComment[]
  blog?: IBlog
}
export interface IArticleContent {
  version: number
  id: string
  current: boolean
  content: IContentType
}

export interface IComment {
  id: string
  content: string
  createdAt: Date
  updatedAt: Date
  user: IUser
}
export interface IContentType extends OutputData {
  time: number
  version: string
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
  caption?: string
  url?: string
  alt?: string
}
export interface IArticleCard {
  id: string
  title: string
  postedAt: Date
  createdAt: Date
}

export interface IPropsBlogTemplate {
  blog: IBlog
  editor: IUser
  articles: IArticle[]
  editBlog: () => void
  addArticle: () => void
}
