import { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'
import ProgressionBar from '../components/inputs/ProgressionBar'
import Login from './login'
import StepThree from '../components/createblog/StepThree'
import StepTwo from '../components/createblog/StepTwo'

import { UserContext } from '../contexts/UserContext'
import { blogSchema } from '../utils/blogValidation'

const CreateBlog = () => {
  const [step, setStep] = useState<string>('first')
  const [name, setName] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [template, setTemplate] = useState<number | null>(1)

  const { user, setIsCreatingBlog } = useContext(UserContext)
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
        // TODO Toaster qui affiche le message d'erreur
        const messages = err.errors
        messages.map((message: string) => {
          alert(message)
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

  const templateAlert = () => {
    // TODO Toaster d'alerte 'Tu n'as pas choisi de template'
    alert("Tu n'as pas choisi de template")
  }

  const CREATE_BLOG = gql`
    mutation Mutation($description: String!, $name: String!, $template: Float!) {
      createBlog(description: $description, name: $name, template: $template) {
        name
        id
      }
    }
  `
  const [createBlog] = useMutation(CREATE_BLOG)

  const createNewBlog = () => {
    setIsCreatingBlog(false)
    console.log(user)
    createBlog({
      variables: {
        name,
        description,
        template,
      },
    })
      .then((res) => {
        const blogName = res.data.createBlog.name
        const userName = user?.nickname
        // TODO : concaténation pour définir l'URL de la page du blog ?

        alert(
          `Félicitations ${userName}, tu viens de créer ton blog ${blogName} !`
        )

        navigate(`/blogs/${blogName}`)
        
      })
      .catch((err) => {
        console.log(err)
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
