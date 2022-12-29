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
      <div className="flex justify-center gap-2 text-white mx-auto w-full">
        <label
          className={`flex flex-col justify-start gap-2 font-bold cursor-pointer rounded py-2 px-6 ${
            template === 1 ? 'btn-primary' : 'btn-ghost text-primary'
          }`}
        >
          <img
            src="/src/assets/template-1.png"
            alt="template 1"
            className="w-24 rounded"
          />
          <span>Template 1</span>
          <input
            className="hidden"
            type="radio"
            name="template"
            checked={template === 1}
            onClick={() => setTemplate(1)}
          />
        </label>
        <label
          className={`flex flex-col justify-start gap-2 font-bold cursor-pointer bg-ghost rounded py-2 px-6 ${
            template === 2 ? 'btn-primary' : 'btn-ghost text-primary'
          }`}
        >
          <img
            src="/src/assets/template-2.png"
            alt="template 2"
            className="w-24 rounded"
          />
          <span>Template 2</span>
          <input
            className="hidden"
            type="radio"
            name="template"
            checked={template === 2}
            onClick={() => setTemplate(2)}
          />
        </label>
      </div>
    </section>
  )
}

export default StepThree
