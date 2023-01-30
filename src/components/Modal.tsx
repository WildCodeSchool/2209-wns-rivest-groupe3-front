import { useContext } from 'react'
import { ModalContext } from '../contexts/ModalContext'

const Modal = () => {
  const { title, images } = useContext(ModalContext)

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-lg font-bold">{title}</h1>

          <div className="carousel w-full">
            {images.map((image, index) => {
              return (
                <div
                  key={index}
                  id={index.toString()}
                  className="carousel-item relative w-full"
                >
                  <img src={image} className="w-full" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href={`#${index - 1}`} className="btn btn-circle flex">
                      ❮
                    </a>
                    <a
                      href={`#${index + 1}`}
                      className="btn btn-circle rounded-full"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
