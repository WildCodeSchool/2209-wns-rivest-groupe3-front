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
    <section className="flex justify-between items-center flex-row w-full my-10">
      <aside className="w-1/5">
        <h1>
          Définis un nom pour ton blog et décris en quelques mots son sujet.
        </h1>
      </aside>
      <aside className="w-3/5">
        <input
          type="text"
          name="name"
          placeholder="Nom de ton blog"
          className="input input-bordered w-full m-4 font-semibold text-lg focus:input-primary"
          onChange={(e) => handleChange('name', e.target.value)}
        />
        {nameAlert && (
          <span className="text text-error m-4"> {nameAlert} </span>
        )}
        <input
          type="textarea"
          name="description"
          placeholder="Ajoute une courte description"
          className="input input-bordered w-full m-4 h-36 placeholder:text-justify px-8 py-4 focus:input-primary"
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {descriptionAlert && (
          <span className="text text-error m-4"> {descriptionAlert} </span>
        )}
      </aside>
    </section>
  )
}

export default StepTwo
