const StepThree = ({
  setTemplate,
  template,
}: {
  setTemplate: React.Dispatch<React.SetStateAction<number | null>>
  template: number | null
}) => {
  return (
    <section className="flex justify-center items-center flex-col w-full my-10">
      {/* TODO Assigner le template id à setTemplate */}
      <button className="btn" onClick={() => setTemplate(1)}>
        {' '}
        Choisir ce template{' '}
      </button>
    </section>
  )
}

export default StepThree
