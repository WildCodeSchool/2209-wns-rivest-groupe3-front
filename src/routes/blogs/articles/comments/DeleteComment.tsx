import { useMutation } from '@apollo/client'
import {
  DELETE_COMMENT,
  GET_ALL_COMMENTS_OF_AN_ARTICLE,
} from '../../../../queries/comments'
import { useContext } from 'react'
import { NotificationContext } from '../../../../contexts/NotificationContext'
import { UserContext } from '../../../../contexts/UserContext'

const DeleteComment = ({
  commentId,
  authorId,
}: {
  commentId: string
  authorId: string
}) => {
  const { user } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [GET_ALL_COMMENTS_OF_AN_ARTICLE],
  })

  const deleteOnClick = async () => {
    deleteComment({ variables: { commentId: commentId } })
      .then(() => {
        setMessage({
          text: 'Commentaire supprimé avec succès',
          type: 'success',
        })
      })
      .catch((err) => {
        console.error(err)
        alert('Immpossible de suppprimer le commentaire')
      })
  }

  if (user?.id === authorId) {
    return (
      <button onClick={deleteOnClick} className="btn btn-secondary mt-1">
        Supprimer votre commentaire
      </button>
    )
  }
  return <></>
}

export default DeleteComment
