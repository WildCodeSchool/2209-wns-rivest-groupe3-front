import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { NotificationContext } from '../../../../contexts/NotificationContext'
import {
  CREATE_COMMENT,
  GET_ALL_COMMENTS_OF_AN_ARTICLE,
} from '../../../../queries/comments'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateCommentProps } from '../../../../components/inputs/inputsInterfaces'
import { commentSchema } from '../../../../utils/commentCreateValidation'
import { UserContext } from '../../../../contexts/UserContext'

const AddComment = ({ articleId }: { articleId: string }) => {
  const { user } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField
  } = useForm<CreateCommentProps>({
    resolver: yupResolver(commentSchema),
  })

  const [createComment] = useMutation(CREATE_COMMENT, {
    refetchQueries: [GET_ALL_COMMENTS_OF_AN_ARTICLE],
  })

  const onSubmit = async (data: FieldValues) => {
    const comment = {
      content: data.content,
      articleId: articleId,
    }
    createComment({ variables: { ...comment } })
      .then(() => {
        setMessage({
          text: 'Commentaire ajouté avec succès',
          type: 'success',
        })
        resetField('content')
      })
      .catch((err) => {
        console.error(err)
        alert('Immpossible de créer un commentaire')
      })
  }

  if (user?.id) {
    return (
      <form>
        <label className="form-control">
          <span className="label label-text">Ajouter un commentaire</span>
          <input
            {...register('content')}
            className={
              errors.content ? 'input input-error' : 'input input-bordered'
            }
            id="content"
            type="content"
            placeholder="Votre commentaire ici"
            defaultValue=""
          />
        </label>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit(onSubmit)}
            className="btn btn-primary mt-2 "
          >
            Publier
          </button>
        </div>
      </form>
    )
  } else {
    return (
      <p className="text-center">
        Veuillez vous connecter pour laisser un commentaire.
      </p>
    )
  }
}

export default AddComment
