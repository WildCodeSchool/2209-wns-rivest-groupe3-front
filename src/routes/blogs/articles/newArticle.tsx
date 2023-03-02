import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { GET_ONE_BLOG } from '../../../queries/blogs'

import EditableArticle from '../../../components/editor/EditableArticle'

const ArticleEditor = () => {
  const { blogSlug } = useParams()

  const {
    data: {
      getBlog: { id: blogId },
    },
  } = useQuery(GET_ONE_BLOG, {
    variables: { slug: blogSlug },
  })

  return <EditableArticle blogId={blogId} blogSlug={blogSlug || ''} />
}

export default ArticleEditor
