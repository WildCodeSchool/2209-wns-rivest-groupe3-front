import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { NotificationContext } from '../../../../contexts/NotificationContext'
import { GET_ALL_COMMENTS_OF_AN_ARTICLE } from '../../../../queries/comments'
import { IArticle } from '../../../../utils/interfaces/Interfaces'
import { formatDate } from '../../../../utils/formatDate'

const Comments = () => {
  const { setMessage } = useContext(NotificationContext)
  const { slug, blogSlug } = useParams()
  
  const { loading, error, data } = useQuery(GET_ALL_COMMENTS_OF_AN_ARTICLE, {
    variables: {
      blogSlug,
      slug,
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

  const { getOneArticle: article }: { getOneArticle: IArticle } = data

  if (article.comments.length === 0) {
    return (
      <div>
        <p>
          Cet article ne contient pas encore de commentaire. Vouslez-vous être
          la première personne à donner votre avis ?
        </p>
      </div>
    )
  }

  return (
    <div>
      {article.comments?.map((comment) => (
        <div key={comment.id} className="border-2 p-2 mb-5">
          <p className="p-3">{comment.content}</p>
          <div className="flex justify-between items-start p-3">
            <p className="font-bold font-lobster">{comment.user.nickname}</p>
            <div>
              <p className="text-xs italic">
                Créé le : {formatDate(comment.createdAt)}
              </p>
              <p className="text-xs italic">
                Mis à jour le : {formatDate(comment.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Comments
