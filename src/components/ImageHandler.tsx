import { useState } from 'react'
import axios from 'axios'
import DragAndDrop from './inputs/DragAndDrop'

const ImageHandler = () => {
  const [selectedImage, setSelectedImage] = useState<{
    image: Blob | null
    imageUrl: string
    preview: string | null
  }>({
    image: null,
    imageUrl: '',
    preview: null,
  })

  const resetImage = () => {
    setSelectedImage({
      image: null,
      imageUrl: '',
      preview: null,
    })
  }

  const handleImageChange = (event: any) => {
    setSelectedImage({
      ...selectedImage,
      image: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    })
  }

  const handleImageUpload = async () => {
    const formData = new FormData()
    if (selectedImage.image)
      formData.append('file', selectedImage.image, selectedImage.image.name)

    const token = localStorage.getItem('token')
    try {
      const { data } = await axios.post(
        `http://localhost:8000/upload`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      console.log(data)
      setSelectedImage({ ...selectedImage, imageUrl: data.filename })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <DragAndDrop
      handleImageUpload={handleImageUpload}
      handleImageChange={handleImageChange}
      image={selectedImage}
      reset={resetImage}
    />
  )
}

export default ImageHandler
