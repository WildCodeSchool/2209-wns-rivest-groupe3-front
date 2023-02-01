import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { IArticle } from '../utils/interfaces/Interfaces'
import outputData from '../utils/ouputContentBlocks'

const Article = () => {
  const { slug, blogSlug } = useParams()

  const GET_ONE_ARTICLE = gql`
    query GetOneArticle($slug: String!, $blogSlug: String!) {
      getOneArticle(slug: $slug, blogSlug: $blogSlug) {
        id
        postedAt
        show
        slug
        title
        articleContent {
          version
          id
          current
          content {
            time
            version
            blocks {
              id
              type
              data {
                text
                level
                style
                items
              }
            }
          }
        }
        version
      }
    }
  `

  const { loading, error, data } = useQuery(GET_ONE_ARTICLE, {
    variables: {
      slug,
      blogSlug,
    },
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>error</div>

  const { getOneArticle: article }: { getOneArticle: IArticle } = data

  return (
    <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <header className="m-16 w-full flex flex-col justify-center items-center text-white gap-4">
        <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
          {article.title}
        </h1>
      </header>
      <article className="mx-auto max-w-xl">
        {article.articleContent[0].content.blocks.map((block, index) => {
          return outputData(block, index)
        })}
      </article>
    </main>
  )
}

export default Article
