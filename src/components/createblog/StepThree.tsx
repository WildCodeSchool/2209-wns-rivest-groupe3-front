import { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext'

interface IStepThree {
  handleChange: (
    type: 'name' | 'description' | 'template',
    value: string | number
  ) => void
  template: number | null
}

const StepThree = ({ handleChange, template }: IStepThree) => {
  const template1 = ['/Template1_1.png', '/Template1_2.png', '/Template1_3.png']
  const template2 = ['/Template2_1.png', '/Template2_2.png', '/Template2_3.png']

  const { setTitle, setImages } = useContext(ModalContext)

  const getPreviewImages = () => {
    if (template === 1) {
      setTitle('Template 1')
      setImages(template1)
    }

    if (template === 2) {
      setTitle('Template 2')
      setImages(template2)
    }
  }

  return (
    <section className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
      <div className="flex justify-center gap-2 text-white mx-auto w-full">
        <label
          className={`flex flex-col justify-start gap-6 font-bold cursor-pointer bg-ghost rounded py-12 px-6 ${
            template === 1 ? 'btn-primary' : 'btn-ghost text-primary'
          }`}
        >
          <img src="/Template1_1.png" alt="template 1" className="w-80" />
          <span className="w-full text-center text-xl">Template 1</span>
          <input
            readOnly
            className="hidden"
            type="radio"
            name="template"
            checked={template === 1}
            onClick={() => handleChange('template', 1)}
          />
          <label
            htmlFor="my-modal-3"
            className={`btn ${template !== 1 && 'hidden'}`}
            onClick={getPreviewImages}
          >
            Visualiser
          </label>
        </label>
        <label
          className={`flex flex-col justify-start gap-6 font-bold cursor-pointer bg-ghost rounded py-12 px-6 ${
            template === 2 ? 'btn-primary' : 'btn-ghost text-primary'
          }`}
        >
          <img src="/Template2_2.png" alt="template 2" className="w-80" />
          <span className="w-full text-center text-xl">Template 2</span>
          <input
            readOnly
            className="hidden"
            type="radio"
            name="template"
            checked={template === 2}
            onClick={() => handleChange('template', 2)}
          />
          <label
            htmlFor="my-modal-3"
            className={`btn ${template !== 2 && 'hidden'}`}
            onClick={getPreviewImages}
          >
            Visualiser
          </label>
        </label>
      </div>
    </section>
  )
}

export default StepThree
