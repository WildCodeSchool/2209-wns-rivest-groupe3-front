import { useContext, useState, useRef, useCallback } from 'react'
import { useMutation } from '@apollo/client'
import type EditorJS from '@editorjs/editorjs'
import { NotificationContext } from '../../contexts/NotificationContext'
import { CREATE_ARTICLE } from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { useNavigate } from 'react-router-dom'
import EditorTools from './EditorTools'
import { TbEditCircle } from 'react-icons/tb'

const NewEditableArticle = ({
  blogId,
  blogSlug,
}: {
  blogId: string
  blogSlug: string
}) => {
  const { setMessage } = useContext(NotificationContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>('Titre')
  const [showTools, setShowTools] = useState(true)

  const [createArticle] = useMutation(CREATE_ARTICLE)
  const editorCore = useRef<EditorJS | null>(null)
  const handleInitialize = useCallback((instance: any) => {
    editorCore.current = instance
  }, [])

  const handleSave = useCallback(
    async ({ publish }: { publish: boolean }) => {
      if (!editorCore.current) {
        return
      }
      const savedArticleData = await editorCore.current.save()
      try {
        const {
          data: {
            createArticle: { slug },
          },
        } = await createArticle({
          variables: {
            blogId,
            title: title,
            show: publish,
            version: 1,
            articleContent: savedArticleData,
          },
        })
        setMessage({
          text: 'Article enregistré avec succès',
          type: 'success',
        })
        setShowTools(false)
        navigate(`/blogs/${blogSlug}/${slug}`)
      } catch (error) {
        console.error(error)
        setMessage({
          text: `Une erreur s'est produite`,
          type: 'error',
        })
      }
    },
    [title]
  )

  const dataToEdit = dummyData

  return (
    <>
      {!showTools ? (
        <div
          onClick={() => setShowTools(true)}
          className="fixed top-50 mt-2 left-10  flex items-center cursor-pointer gap-3 z-10 flex-col bg-white px-8 border py-2 rounded-md shadow-md"
        >
          <TbEditCircle size={'1.5rem'} />
        </div>
      ) : (
        <EditorTools
          handleSave={handleSave}
          title={title}
          setTitle={setTitle}
          isNew={true}
          setShowTools={setShowTools}
        />
      )}
      <header className="mt-0 w-full flex flex-col justify-center items-center text-white gap-4">
        <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
          {title}
        </h1>
      </header>
      <EditorWrapper
        blocks={dataToEdit}
        handleInitialize={handleInitialize}
        editorCore={editorCore}
        uploadUrl=""
      />
    </>
  )
}

const dummyData = [
  {
    id: 'oUq2g_tl8y',
    type: 'header',
    data: {
      text: 'Chapitre 1',
      level: 1,
    },
  },
  {
    id: 'zbGZFPM-iI',
    type: 'paragraph',
    data: {
      text: 'Votre histoire commence ici... Commencez par effacer ou éditer ce contenu... ✍️',
    },
  },
]

export default NewEditableArticle
