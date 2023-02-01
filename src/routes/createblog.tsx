import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

import ProgressionBar from '../components/inputs/ProgressionBar'
import Register from './register'
import StepThree from '../components/createblog/StepThree'
import StepTwo from '../components/createblog/StepTwo'

import { UserContext } from '../contexts/UserContext'
import { nameValidation, descriptionValidation } from '../utils/blogValidation'
import { NotificationContext } from '../contexts/NotificationContext'

const CreateBlog = () => {
  const [step, setStep] = useState<string>('first')
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [template, setTemplate] = useState<number | null>(1)
  const [nameAlert, setNameAlert] = useState<string | null>(null)
  const [descriptionAlert, setDescriptionAlert] = useState<string | null>(null)

  const { user, setIsCreatingBlog } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    setIsCreatingBlog(true)
    if (user !== null) {
      setStep('second')
    }
  }, [user])

  const validateBlog = () => {
    let nameInput = { name }
    let descriptionInput = { description }

    nameValidation
      .validate(nameInput)
      .then(() => {
        setNameAlert(null)
        !descriptionAlert && setStep('third')
      })
      .catch((err: any) => {
        const messages = err.errors
        messages.map((message: string) => {
          setNameAlert(message)
        })
      })

    descriptionValidation
      .validate(descriptionInput)
      .then(() => {
        setDescriptionAlert(null)
        !nameAlert && setStep('third')
      })
      .catch((err: any) => {
        const messages = err.errors
        messages.map((message: string) => {
          setDescriptionAlert(message)
        })
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

  const { setMessage } = useContext(NotificationContext)

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

  const createNewBlog = async () => {
    try {
      setIsCreatingBlog(false)
      const result = await createBlog({
        variables: {
          name,
          description,
          template,
        },
      })

      const userName = user?.nickname

      const createdBlog = result.data.createBlog
      const blogName = createdBlog.name
      const slug = createdBlog.slug

      setMessage({
        text: `Félicitations ${userName}, tu viens de créer ton blog ${blogName} !`,
        type: 'success',
      })

      template === 1 && navigate(`/blogs/${slug}/T1`)
      template === 2 && navigate(`/blogs/${slug}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <section className="min-h-screen max-w-screen flex justify-center items-center flex-col m-8">
      <article className="flex justify-center items-center w-5/6 flex-col">
        <ProgressionBar step={step}></ProgressionBar>

        {step === 'first' ? <Register></Register> : null}

        {step === 'second' ? (
          <StepTwo
            setName={setName}
            setDescription={setDescription}
            nameAlert={nameAlert}
            descriptionAlert={descriptionAlert}
          ></StepTwo>
        ) : null}

        {step === 'third' ? (
          <StepThree setTemplate={setTemplate} template={template}></StepThree>
        ) : null}

        <div className="group flex w-full justify-end">
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
            <div className="btn" onClick={createNewBlog}>
              Voir mon blog
            </div>
          ) : null}
        </div>
      </article>
    </section>
  )
}

export default CreateBlog
