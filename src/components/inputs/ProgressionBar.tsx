const ProgressionBar = ({ step }: { step: string }) => {
  return (
    <ul className="steps my-10 w-5/6">
      {step === 'first' ? (
        <li className="step step-primary">
          Je m'enregistre ou crée mon compte
        </li>
      ) : (
        <li className="step">Je m'enregistre ou crée mon compte</li>
      )}
      {step === 'second' ? (
        <li className="step step-primary"> Je définis mon blog </li>
      ) : (
        <li className="step"> Je définis mon blog </li>
      )}
      {step === 'third' ? (
        <li className="step step-primary"> Je choisis un template </li>
      ) : (
        <li className="step"> Je choisis un template </li>
      )}
    </ul>
  )
}

export default ProgressionBar
