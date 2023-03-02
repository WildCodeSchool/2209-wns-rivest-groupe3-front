import {
  useContext,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react'
import { useMutation } from '@apollo/client'
import type EditorJS from '@editorjs/editorjs'
import { NotificationContext } from '../../contexts/NotificationContext'
import { UserContext } from '../../contexts/UserContext'
import { CREATE_ARTICLE, UPDATE_ARTICLE } from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { IArticle } from '../../utils/interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'

const EditableArticle = ({
  blogId,
  blogSlug,
  articleData,
  isUpdate,
  setEdit,
}: {
  blogId: string
  blogSlug: string
  articleData?: IArticle
  isUpdate?: boolean
  setEdit?: Dispatch<SetStateAction<boolean>>
}) => {
  const { setMessage } = useContext(NotificationContext)
  const [createArticle] = useMutation(CREATE_ARTICLE)
  const [updateArticle] = useMutation(UPDATE_ARTICLE)
  const navigate = useNavigate()

  const dataToEdit =
    articleData?.articleContent[articleData.articleContent.length - 1].content
      .blocks || dummyData

  const [title, setTitle] = useState<string>(articleData?.title || 'Titre')
  const editableTitleElement = useRef<HTMLHeadingElement>(null)

  const updateTitle = (event: string | null) => {
    if (event !== null) {
      setTitle(event)
      if (editableTitleElement.current !== null) {
        editableTitleElement.current.textContent = event
      }
    }
  }

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
        if (isUpdate && articleData && setEdit) {
          const {
            data: {
              updateArticle: { slug },
            },
          } = await updateArticle({
            variables: {
              blogId,
              show: publish,
              version: articleData.version + 1,
              articleContent: savedArticleData,
              articleId: articleData.id,
              title,
            },
          })
          setEdit(false)
          navigate(`/blogs/${blogSlug}/${slug}`)
          return
        }
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

  return (
    <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
      <div className="sticky top-8 mr-auto ml-3 flex items-center gap-3 z-10 flex-col -mb-16">
        <div className="flex items-center gap-3">
          <button
            className="btn btn-info mt-10"
            onClick={() => handleSave({ publish: false })}
          >
            Enregistrer
            <br />
            comme brouillon
          </button>
          <button
            className="btn btn-primary mt-10"
            onClick={() => handleSave({ publish: true })}
          >
            Publier
          </button>
        </div>
        <div className="flex items-center flex-col">
          <label htmlFor="title">Titre de l'article</label>
          <input
            type="text"
            className="border border-neutral rounded p-1 text-center"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>
      </div>
      <header className="m-16 mt-0 w-full flex flex-col justify-center items-center text-white gap-4">
        <h1
          className="text-7xl font-bold font-lobster bg-neutral/80 p-2"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            updateTitle(e.currentTarget.textContent)
          }}
          ref={editableTitleElement}
        >
          {title}
        </h1>
      </header>
      <EditorWrapper blocks={dataToEdit} handleInitialize={handleInitialize} />
    </main>
  )
}

const dummyData = [
  {
    id: 'oUq2g_tl8y',
    type: 'header',
    data: {
      text: 'Editor.JS',
      level: 1,
    },
  },
  {
    id: 'zbGZFPM-iI',
    type: 'paragraph',
    data: {
      text: 'Editor.js is now out of date... 😭\nSo we are going to build our own ! 🚀\nStart by editing me, or add a new block by clicking the + button below..',
    },
  },
]

export default EditableArticle
