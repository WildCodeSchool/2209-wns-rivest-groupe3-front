const ProgressionBar = ({ step }: { step: number }) => {
  return (
    <ul className="steps my-10 w-5/6">
      {step >= 1 ? (
        <li className="step step-primary">
          Je m'enregistre ou crée mon compte
        </li>
      ) : (
        <li className="step">Je m'enregistre ou crée mon compte</li>
      )}
      {step >= 2 ? (
        <li className="step step-primary"> Je définis mon blog </li>
      ) : (
        <li className="step"> Je définis mon blog </li>
      )}
      {step === 3 ? (
        <li className="step step-primary"> Je choisis un template </li>
      ) : (
        <li className="step"> Je choisis un template </li>
      )}
    </ul>
  )
}

export default ProgressionBar
