interface IStepTwo {
  handleChange: (
    type: 'name' | 'description' | 'template',
    value: string | number
  ) => void
  alert: {
    name: string | null
    description: string | null
  }
}

const StepTwo = ({ handleChange, alert }: IStepTwo) => {
  const { name: nameAlert, description: descriptionAlert } = alert
  return (
    <section className="w-full flex flex-col justify-around gap-4 md:flex-row">
      <aside className="md:w-1/5 md:text-xl">
          Définis un nom pour ton blog et décris en quelques mots son sujet.
      </aside>
      <aside className="md:w-3/5 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nom de ton blog"
          className="input input-bordered w-full focus:input-primary"
          onChange={(e) => handleChange('name', e.target.value)}
        />
        {nameAlert && (
          <span className="text text-error"> {nameAlert} </span>
        )}
        <textarea
          name="description"
          placeholder="Ajoute une courte description"
          className="input input-bordered w-full h-36 focus:input-primary py-2"
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {descriptionAlert && (
          <span className="text text-error"> {descriptionAlert} </span>
        )}
      </aside>
    </section>
  )
}

export default StepTwo
