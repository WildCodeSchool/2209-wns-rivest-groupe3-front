import axios from 'axios'
import { useEffect, useState } from 'react'

interface IPropsUpdate {
  type: 'avatar' | 'cover' | 'article'
  imgUrl: string
  updateUrl: string
  deleteUrl: string
  updateBackendUrlImg: (imgUrl: string | null) => Promise<any>
}

const UpdateImage = ({
  type,
  imgUrl,
  updateUrl,
  deleteUrl,
  updateBackendUrlImg,
}: IPropsUpdate) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: Blob | null
    imageUrl: string | null
    preview: string | null
  }>({
    image: null,
    imageUrl: null,
    preview: null,
  })
  const token = localStorage.getItem('token')
  const [dataImg, setDataImg] = useState<string | null>(null)

  useEffect(() => {
    setDataImg(`${import.meta.env.VITE_IMAGES_URL}${imgUrl}`)
  }, [])

  const resetImage = () => {
    setSelectedImage({
      image: null,
      imageUrl: '',
      preview: null,
    })
  }

  const deleteImg = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_IMAGES_URL}${deleteUrl}`, {
        headers: {
          Authorization: token,
        },
      })
      await updateBackendUrlImg(null)
    } catch (err) {
      console.error(err)
    }
  }

  const handleImageChange = (event: any) => {
    setSelectedImage({
      ...selectedImage,
      image: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    })
  }

  const updateImg = async () => {
    const formData = new FormData()

    if (selectedImage.image)
      formData.append('file', selectedImage.image, selectedImage.image.name)

    try {
      await axios.get(`${import.meta.env.VITE_IMAGES_URL}${imgUrl}`)
      const { data } = await axios.put(
        `${import.meta.env.VITE_IMAGES_URL}${updateUrl}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      await updateBackendUrlImg(data.filename)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/2 flex gap-2">
          {selectedImage.preview && (
            <button
              className="bg-secondary rounded-full text-white w-8 h-8 flex items-center justify-center hover:scale-110"
              onClick={resetImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <label className="bg-info rounded-full text-white w-8 h-8 flex items-center justify-center hover:scale-110">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <input
              type="file"
              name="file_upload"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <figure
          className={`${
            type === 'avatar' ? 'w-full max-w-sm aspect-square rounded-full' : 'w-48 h-24'
          } overflow-hidden flex justify-center items-center border border-white`}
        >
          {selectedImage.preview ? (
            <img
              src={selectedImage.preview}
              alt="blog cover"
              className="object-cover min-w-full min-h-full"
              width="400"
              height="400"
            />
          ) : dataImg ? (
            <img
              src={dataImg}
              alt="blog cover"
              className="object-cover min-w-full min-h-full"
              width="400"
              height="400"
            />
          ) : (
            <div className="bg-white h-full w-full" />
          )}
        </figure>
      </div>
      {selectedImage.preview ? (
        <div className="flex justify-center gap-4 w-full py-4">
          <button
            type="button"
            onClick={updateImg}
            className="btn btn-info w-2/5"
          >
            Sauvegarder
          </button>
          <button
            type="button"
            className="btn btn-secondary w-2/5"
            onClick={resetImage}
          >
            Annuler
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-secondary" onClick={deleteImg}>
          Supprimer
        </button>
      )}
    </div>
  )
}

export default UpdateImage
