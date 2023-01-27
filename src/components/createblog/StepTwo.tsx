const StepTwo = ({
  setName,
  setDescription,
  nameAlert,
  descriptionAlert
}: {
  setName: React.Dispatch<React.SetStateAction<string | null>>
  setDescription: React.Dispatch<React.SetStateAction<string | null>>
  nameAlert: string | null
  descriptionAlert: string | null
}) => {
  return (
    <section className="flex justify-between items-center flex-row w-full my-10">

      <aside className="w-1/5">
<h1> Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi blanditiis inventore expedita harum labore illum 
  nostrum laboriosam debitis, quas non aperiam quis accusantium doloribus nihil magni saepe cupiditate assumenda voluptates? </h1>
      </aside>
      <aside className="w-3/5">

      <input
        type="text"
        placeholder="Nom de ton blog"
        className="input input-bordered w-full m-4 font-semibold text-lg focus:input-primary"
        onChange={(e) => setName(e.target.value)}
        />
      {nameAlert && 
      <span className="text text-error m-4"> {nameAlert} </span>
      }
      <input
        type="textarea"
        placeholder="Ajoute une courte description"
        className="input input-bordered w-full m-4 h-36 placeholder:text-justify px-8 py-4 focus:input-primary"
        onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionAlert && 
        <span className="text text-error m-4"> {descriptionAlert} </span>
        }
        </aside>
    </section>
  )
}

export default StepTwo
