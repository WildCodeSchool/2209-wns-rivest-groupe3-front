import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import ProgressionBar from '../components/inputs/ProgressionBar'
import Login from './login'
import StepThree from '../components/createblog/StepThree'
import StepTwo from '../components/createblog/StepTwo'

import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { blogSchema } from '../utils/blogValidation'

const CreateBlog = () => {
  const [step, setStep] = useState<string>('first')
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [template, setTemplate] = useState<number | null>(1)

  const { user, setIsCreatingBlog } = useContext(UserContext)
  const { setMessage } = useContext(NotificationContext)
  const navigate = useNavigate()

  useEffect(() => {
    setIsCreatingBlog(true)
    if (user !== null) {
      setStep('second')
    }
  }, [user])

  const validateBlog = () => {
    let blogData = {
      name,
      description,
    }

    blogSchema
      .validate(blogData)
      .then(() => {
        setStep('third')
      })
      .catch((err: any) => {
        setMessage({ text: err.errors[0].message, type: 'error' })
      })
  }

  const nextStep = () => {
    if (step === 'first') {
      setStep('second')
    } else if (step === 'second') {
      setStep('third')
    }
  }

  const previousStep = () => {
    if (step === 'second') {
      setStep('first')
    } else if (step === 'third') {
      setStep('second')
    }
  }

  const templateAlert = () => {
    setMessage({ text: "Tu n'as pas choisi de template", type: 'error' })
  }

  const CREATE_BLOG = gql`
    mutation Mutation(
      $description: String!
      $name: String!
      $template: Float!
    ) {
      createBlog(description: $description, name: $name, template: $template) {
        name
        id
        slug
      }
    }
  `
  const [createBlog] = useMutation(CREATE_BLOG)

  const createNewBlog = () => {
    setIsCreatingBlog(false)
    createBlog({
      variables: {
        name,
        description,
        template,
      },
    })
      .then((res) => {
        const { name, slug } = res.data.createBlog
        const userName = user?.nickname

        setMessage({
          text: `Félicitations ${userName}, tu viens de créer ton blog ${name} !`,
          type: 'success',
        })

        navigate(`/blogs/${slug}`)
      })
      .catch((err) => {
        setMessage({
          text: "Une erreur s'est produite...",
          type: 'error',
        })
        console.error(err)
      })
  }

  return (
    <section className="min-h-screen flex justify-center items-center flex-col m-8 w-full">
      <ProgressionBar step={step}></ProgressionBar>
      {step === 'first' ? <Login></Login> : null}
      {/* 
      Remplacer par le composant de login ou de register, et non la page entière */}
      {step === 'second' ? (
        <StepTwo setName={setName} setDescription={setDescription}></StepTwo>
      ) : null}
      {step === 'third' ? (
        <StepThree setTemplate={setTemplate} template={template}></StepThree>
      ) : null}

      <div className="group">
        {step === 'first' ? null : (
          <button className="btn btn-ghost" onClick={() => previousStep()}>
            Précédent
          </button>
        )}
        {step === 'second' ? (
          <button
            className="btn"
            onClick={() => {
              step === 'second' ? validateBlog() : nextStep()
            }}
          >
            Etape suivante
          </button>
        ) : null}
        {step === 'third' ? (
          <div
            className="btn"
            onClick={() => {
              template ? createNewBlog() : templateAlert()
            }}
          >
            Voir mon blog
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default CreateBlog
