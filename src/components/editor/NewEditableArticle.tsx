import {
  useContext,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import type EditorJS from '@editorjs/editorjs'
import { NotificationContext } from '../../contexts/NotificationContext'
import { CREATE_ARTICLE } from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { useNavigate } from 'react-router-dom'
import EditorTools from './EditorTools'

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
      <EditorTools
        handleSave={handleSave}
        title={title}
        setTitle={setTitle}
        isNew={true}
      />
      <header className="mt-0 w-full flex flex-col justify-center items-center text-white gap-4">
        <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
          {title}
        </h1>
      </header>
      <EditorWrapper
        blocks={dataToEdit}
        handleInitialize={handleInitialize}
        editorCore={editorCore}
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
