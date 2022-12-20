import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProgressionBar from '../components/inputs/ProgressionBar'
import Login from './login'
import StepThree from '../components/createblog/StepThree'
import StepTwo from '../components/createblog/StepTwo'

const CreateBlog = () => {
  const [step, setStep] = useState<string>('first')

  const nextStep = () => {
    if (step === 'first') {
      setStep('second')
      console.log(step)
    } else if (step === 'second') {
      setStep('third')
      console.log(step)
    }
  }

  const previousStep = () => {
    if (step === 'second') {
      setStep('first')
    } else if (step === 'third') {
      setStep('second')
    }
  }

  return (
    <section className="flex justify-center flex-col m-8">
      <ProgressionBar step={step}></ProgressionBar>
      {step === 'first' ? <Login></Login> : null}
      {/* 
      Remplacer par le composant de login ou de register, et non la page entière */}
      {step === 'second' ? <StepTwo></StepTwo> : null}
      {step === 'third' ? <StepThree></StepThree> : null}

      <div className="group">
        {step === 'first' ? null : (
          <button className="btn btn-ghost" onClick={() => previousStep()}>
            Précédent
          </button>
        )}
        {step === 'third' ? null : (
          <button className="btn" onClick={() => nextStep()}>
            Etape suivante
          </button>
        )}
        {step === 'third' ? (
          <Link to="/blog" className="btn">
            {/* Modifier le link vers la page blog du user */}
            Voir mon blog
          </Link>
        ) : null}
      </div>
    </section>
  )
}

export default CreateBlog
