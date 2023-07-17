import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { GET_ONE_BLOG } from '../../../queries/blogs'

import NewEditableArticle from '../../../components/editor/NewEditableArticle'
import ErrorComponent from '../../../components/ErrorComponent'

const ArticleEditor = () => {
  const { blogSlug } = useParams()
  const { loading, data, error } = useQuery(GET_ONE_BLOG, {
    variables: {
      blogSlug,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <div>Chargement...</div>
  if (error)
    return (
      <main className="min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <ErrorComponent error={error} />
      </main>
    )

  const {
    data: {
      getBlog: { id: blogId },
    },
  } = data
  return (
    <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-16 flex flex-col items-center gap-8">
      <NewEditableArticle blogId={blogId} blogSlug={blogSlug || ''} />
    </main>
  )
}

export default ArticleEditor
