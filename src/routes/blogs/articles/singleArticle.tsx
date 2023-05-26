import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { IArticle, IBlog } from '../../../utils/interfaces/Interfaces'
import { GET_ONE_ARTICLE } from '../../../queries/articles'
import outputData from '../../../utils/ouputContentBlocks'
import { useContext, useState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import EditableArticle from '../../../components/editor/EditableArticle'
import { NotificationContext } from '../../../contexts/NotificationContext'

const Article = () => {
  const { setMessage } = useContext(NotificationContext)
  const { slug, blogSlug } = useParams()
  const { user } = useContext(UserContext)
  const [edit, setEdit] = useState(false)
  const { loading, error, data } = useQuery(GET_ONE_ARTICLE, {
    variables: {
      slug,
      blogSlug,
    },
    fetchPolicy: 'cache-and-network',
  })

  if (loading) return <div>Loading...</div>
  if (error) {
    setMessage({
      text: `Une erreur s'est produite`,
      type: 'error',
    })
    return <>Error</>
  }

  const {
    getOneArticle: article,
    getBlog: blog,
  }: { getOneArticle: IArticle; getBlog: IBlog } = data

  return (
    <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-16 flex flex-col items-center gap-8">
      {user && user.id === blog.user.id ? (
        <EditableArticle
          blogId={blog.id}
          blogSlug={blog.slug}
          articleId={article.id}
          articleCoverUrl={article.coverUrl}
          articleSlug={article.slug}
          articleTitle={article.title}
          articleVersion={article.version}
          setEdit={setEdit}
        />
      ) : (
        <>
          <header className="m-16 w-full flex flex-col justify-center items-center text-white gap-4">
            <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
              {article.title}
            </h1>
            {article.coverUrl ? (
              <figure className="absolute -z-10 h-96 w-full overflow-hidden flex justify-center items-center">
                <img
                  className="w-full"
                  src={`${import.meta.env.VITE_IMAGES_URL}${article.coverUrl}`}
                  alt={`couverture du blog ${name}`}
                />
              </figure>
            ) : (
              <div className="absolute -z-10 bg-gray-300 w-full h-full" />
            )}
          </header>
          <article className="mx-auto max-w-xl bg-white px-8 bg-opacity-80">
            {article.articleContent[
              article.articleContent.length - 1
            ].content.blocks.map((block, index) => {
              return outputData(block, index)
            })}
          </article>
        </>
      )}
    </main>
  )
}

export default Article
