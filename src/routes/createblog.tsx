import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import ProgressionBar from '../components/inputs/ProgressionBar'
import Register from './register'
import StepThree from '../components/createblog/StepThree'
import StepTwo from '../components/createblog/StepTwo'
import { UserContext } from '../contexts/UserContext'
import { nameValidation, descriptionValidation } from '../utils/blogValidation'
import { NotificationContext } from '../contexts/NotificationContext'
import { CREATE_BLOG } from '../queries/blogs'

const CreateBlog = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [alert, setAlert] = useState<{
    name: string | null
    description: string | null
  }>({ name: null, description: null })
  const [newBlog, setNewBlog] = useState({
    name: '',
    description: '',
    template: 1,
  })
  const { user, setIsCreatingBlog } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)

  const [createBlog] = useMutation(CREATE_BLOG)

  const navigate = useNavigate()

  useEffect(() => {
    setIsCreatingBlog(true)
    if (user) setStep(2)
  }, [user])

  const validateBlog = async () => {
    await nameValidation
      .validate({ name: newBlog.name })
      .then(() => {
        setAlert({ ...alert, name: null })
        !alert.description && setStep(3)
      })
      .catch((err: any) => {
        const messages = err.errors
        messages.map((message: string) => {
          setAlert((alert) => ({ ...alert, name: message }))
        })
      })

    await descriptionValidation
      .validate({ description: newBlog.description })
      .then(() => {
        setAlert({ ...alert, description: null })
        !alert.name && setStep(3)
      })
      .catch((err: any) => {
        const messages = err.errors
        messages.map((message: string) => {
          setAlert((alert) => ({ ...alert, description: message }))
        })
      })
  }

  const changeStep = async (type: 'previous' | 'next') => {
    if (type === 'previous') {
      if (step === 2) setStep(1)
      else if (step === 3) setStep(2)
    } else {
      if (step === 1) setStep(2)
      else if (step === 2) await validateBlog()
    }
  }

  const handleChange = (
    type: 'name' | 'description' | 'template',
    value: string | number
  ) => {
    if (type === 'name' || type === 'description' || type === 'template')
      setNewBlog((blog) => ({ ...blog, [type]: value }))
  }

  const createNewBlog = async () => {
 
    try {
      setIsCreatingBlog(false)
      const result = await createBlog({
        variables: newBlog,
      })

      const userName = user?.nickname

      const createdBlog = result.data.createBlog
      const blogName = createdBlog.name
      const slug = createdBlog.slug

      setMessage({
        text: `Félicitations ${userName}, tu viens de créer ton blog ${blogName} !`,
        type: 'success',
      })

      navigate(`/blogs/${slug}`)
    } catch (err) {
      console.error(err)
      setMessage({
        text: `Une erreur s'est produite`,
        type: 'error',
      })
    }
  }

  return (
    <section className="min-h-screen max-w-screen-lg flex flex-col justify-between items-center mx-auto pt-16">
      <article className="w-full flex justify-center items-center flex-col gap-4 md:gap-16 px-4 md:pt-16 lg:pt-24">
        <ProgressionBar step={step} />

        {step === 1 && <Register />}

        {step === 2 && <StepTwo handleChange={handleChange} alert={alert} />}

        {step === 3 && (
          <StepThree handleChange={handleChange} template={newBlog.template} />
        )}

        <div className="group flex w-full justify-end gap-4 mb-8">
          {step === 2 ? (
            <button className="btn" onClick={() => changeStep('next')}>
              Etape suivante
            </button>
          ) : step === 3 ? (
            <>
              <button
                className="btn btn-ghost"
                onClick={() => changeStep('previous')}
              >
                Précédent
              </button>
              <div className="btn" onClick={createNewBlog}>
                Voir mon blog
              </div>
            </>
          ) : null}
        </div>
      </article>
    </section>
  )
}

export default CreateBlog
