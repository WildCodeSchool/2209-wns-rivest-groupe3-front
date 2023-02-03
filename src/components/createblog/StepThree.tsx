import { useContext } from 'react'
import { ModalContext } from '../../contexts/ModalContext'

const StepThree = ({
  setTemplate,
  template,
}: {
  setTemplate: React.Dispatch<React.SetStateAction<number | null>>
  template: number | null
}) => {
  const template1 = [
    '/src/assets/Template1_1.png',
    '/src/assets/Template1_2.png',
    '/src/assets/Template1_3.png',
  ]
  const template2 = [
    '/src/assets/Template2_1.png',
    '/src/assets/Template2_2.png',
    '/src/assets/Template2_3.png',
  ]

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
    <section className="flex justify-center items-center flex-col w-full my-10">
      <div className="flex justify-center gap-2 text-white mx-auto w-full">
        <label
          className={`flex flex-col justify-start gap-6 font-bold cursor-pointer bg-ghost rounded py-12 px-6 ${
            template === 1 ? 'btn-primary' : 'btn-ghost text-primary'
          }`}
        >
          <img
            src="/src/assets/Template1_1.png"
            alt="template 1"
            className="w-80"
          />
          <span className="w-full text-center text-xl">Template 1</span>
          <input
            readOnly
            className="hidden"
            type="radio"
            name="template"
            checked={template === 1}
            onClick={() => setTemplate(1)}
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
          <img
            src="/src/assets/Template2_2.png"
            alt="template 2"
            className="w-80"
          />
          <span className="w-full text-center text-xl">Template 2</span>
          <input
            readOnly
            className="hidden"
            type="radio"
            name="template"
            checked={template === 2}
            onClick={() => setTemplate(2)}
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
