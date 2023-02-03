import PostImage from './PostImage'
import UpdateImage from './UpdateImage'

interface IPropsImageHandler {
  type: 'avatar' | 'cover' | 'article'
  imgUrl: string | null | undefined
  blogId?: string | null
  articleId?: string | null
}

const ImageHandler = ({
  type,
  imgUrl,
  blogId = null,
  articleId = null,
}: IPropsImageHandler) => {
  const dataFilename = imgUrl ? imgUrl.split('/').at(-1) : null

  const url = urlAPI(type, dataFilename, blogId, articleId)

  function urlAPI(
    type: 'avatar' | 'cover' | 'article',
    filename: string | undefined | null,
    blogId: string | null,
    articleId: string | null
  ): {
    postUrl: string
    updateUrl: string
    deleteUrl: string
  } {
    let postUrl = ''
    let updateUrl = ''
    let deleteUrl = ''

    switch (type) {
      case 'avatar':
        postUrl = '/upload/avatar'
        updateUrl = `/update-avatar/${filename}`
        deleteUrl = `/delete/avatars/${filename}`
        break
      case 'cover':
        postUrl = `/upload/blog/${blogId}/cover`
        updateUrl = `/update/blogs/${blogId}/covers/${filename}`
        deleteUrl = `/delete/blogs/${blogId}/covers/${filename}`
        break
      case 'article':
        postUrl = `/upload/blog/${blogId}/article/${articleId}`
        updateUrl = `/update/blogs/${blogId}/articles/${articleId}/files/${filename}`
        deleteUrl = `/delete/blogs/${blogId}/articles/${articleId}/files/${filename}`
        break
    }
    return { postUrl, updateUrl, deleteUrl }
  }

  return dataFilename && imgUrl ? (
    <UpdateImage imgUrl={imgUrl} updateUrl={url.updateUrl} deleteUrl={url.deleteUrl} />
  ) : (
    <PostImage postUrl={url.postUrl} />
  )
}

export default ImageHandler
