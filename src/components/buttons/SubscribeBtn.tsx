import { gql, useMutation } from '@apollo/client'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotificationContext } from '../../contexts/NotificationContext'
import { UserContext } from '../../contexts/UserContext'
import { GET_ONE_BLOG } from '../../queries/blogs'
import { IBlog } from '../../utils/interfaces/Interfaces'
import { AiOutlineBell } from 'react-icons/ai'
import { BiBellOff } from 'react-icons/bi'

const SUBSCRIBE_TO_A_BLOG = gql`
  mutation SubscribeToBlog($blogId: String!) {
    subscribeToBlog(blogId: $blogId) {
      id
      createdAt
      user {
        nickname
      }
      blog {
        id
        name
      }
    }
  }
`

const UNSUBSCRIBE_TO_A_BLOG = gql`
  mutation UnsubscribeToBlog($subscribeId: String!, $blogId: String!) {
    unsubscribeToBlog(subscribeId: $subscribeId, blogId: $blogId)
  }
`

const SubscribeBtn = ({ blog }: { blog: IBlog }) => {
  const { user } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)
  const [subscribeToABlog] = useMutation(SUBSCRIBE_TO_A_BLOG, {
    refetchQueries: [
      {
        query: GET_ONE_BLOG,
        variables: { slug: blog.slug },
      },
    ],
  })
  const [unsubscribeToABlog] = useMutation(UNSUBSCRIBE_TO_A_BLOG, {
    refetchQueries: [
      {
        query: GET_ONE_BLOG,
        variables: { slug: blog.slug },
      },
    ],
  })

  const subscription = blog.subscriptions.find(
    (subscription) => subscription.user.id === user?.id
  )
  const navigate = useNavigate()

  const subscribe = async () => {
    if (user) {
      try {
        await subscribeToABlog({
          variables: {
            blogId: blog.id,
          },
        })
        setMessage({
          text: `Félicitations, vous suivez le blog ${blog.name} !`,
          type: 'success',
        })
      } catch (err) {
        console.error(err)
        setMessage({
          text: `Une erreur s'est produite`,
          type: 'error',
        })
      }
    } else {
      navigate('/login')
    }
  }

  const unsubscribe = async () => {
    if (user) {
      if (subscription) {
        try {
          await unsubscribeToABlog({
            variables: {
              blogId: blog.id,
              subscribeId: subscription.id,
            },
          })
          setMessage({
            text: `Vous ne suivez plus le blog ${blog.name}.`,
            type: 'success',
          })
        } catch (err) {
          console.error(err)
          setMessage({
            text: `Une erreur s'est produite`,
            type: 'error',
          })
        }
      }
    } else {
      navigate('/login')
    }
  }

  return subscription ? (
    <button
      className="btn btn-info flex items-center gap-2 w-12 aspect-square p-2 sm:w-fit sm:aspect-auto sm:px-4"
      onClick={unsubscribe}
    >
      <BiBellOff size={'1.5rem'} />
      <span className="hidden lg:flex">Ne plus suivre</span>
    </button>
  ) : (
    <button
      className="btn btn-outline flex items-center gap-2 w-12 aspect-square p-2 sm:w-fit sm:aspect-auto sm:px-4"
      onClick={subscribe}
    >
      <AiOutlineBell size={'1.5rem'} />
      <span className="hidden lg:flex">Suivre</span>
    </button>
  )
}

export default SubscribeBtn
