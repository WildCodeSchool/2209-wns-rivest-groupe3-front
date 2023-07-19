const ProgressionBar = ({ step }: { step: number }) => {
  return (
    <ul className="steps text-sm md:text-base gap-4 w-full">
      <li className={`step ${step >= 1 ? 'step-primary' : ''}`}>
        Je m'enregistre ou crée mon compte
      </li>
      <li className={`step ${step >= 2 ? 'step-primary' : ''}`}>
        Je définis mon blog
      </li>
      <li className={`step ${step === 3 ? 'step-primary' : ''}`}>
        Je choisis un template
      </li>
    </ul>
  )
}

export default ProgressionBar
