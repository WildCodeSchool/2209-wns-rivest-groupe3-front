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
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''

    const formData = new FormData()
    if (selectedImage.image) formData.append('file', selectedImage.image)
    formData.append('upload_preset', uploadPreset)
    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      )
      setSelectedImage({ ...selectedImage, imageUrl: data.url })
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
