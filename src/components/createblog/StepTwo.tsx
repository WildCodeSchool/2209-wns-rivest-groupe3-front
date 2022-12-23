const StepTwo = ({
  setName,
  setDescription,
}: {
  setName: React.Dispatch<React.SetStateAction<string | null>>
  setDescription: React.Dispatch<React.SetStateAction<string | null>>
}) => {
  return (
    <section className="flex justify-center items-center flex-col w-full my-10">
      <input
        type="text"
        placeholder="Nom de ton blog"
        className="input input-bordered w-1/2 m-4 font-semibold text-lg focus:input-primary"
        onChange={(e) => setName(e.target.value)}
      />
      {/* {errors.description && <span>Ce champ est requis</span>} */}
      <input
        type="textarea"
        placeholder="Ajoute une courte description"
        className="input input-bordered w-5/6 m-4 h-36 placeholder:text-justify px-8 py-4 focus:input-primary"
        onChange={(e) => setDescription(e.target.value)}
      />
      {/* {errors.description && <span>Ce champ est requis</span>} */}
    </section>
  )
}

export default StepTwo
