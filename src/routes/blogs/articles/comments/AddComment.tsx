import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { NotificationContext } from '../../../../contexts/NotificationContext'
import { CREATE_COMMENT } from '../../../../queries/comments'
import { IArticle } from '../../../../utils/interfaces/Interfaces'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreatCommentProps } from '../../../../components/inputs/inputsInterfaces'
import { commentSchema } from '../../../../utils/commentCreateValidation'

const AddComment = ({ articleId }: { articleId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatCommentProps>({
    resolver: yupResolver(commentSchema),
  })

  const { setMessage } = useContext(NotificationContext)
  const [content, setContent] = useState(null)

  const [createComment] = useMutation(CREATE_COMMENT)

  const onSubmit = async (data: FieldValues) => {
    
  }

  return <button>Ajouter un commentaire</button>
}

export default AddComment
