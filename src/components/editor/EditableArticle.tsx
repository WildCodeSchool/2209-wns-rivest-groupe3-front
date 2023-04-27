import {
  useContext,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import type EditorJS from '@editorjs/editorjs'
import { NotificationContext } from '../../contexts/NotificationContext'
import { GET_ONE_ARTICLE, UPDATE_ARTICLE } from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { IArticle } from '../../utils/interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'

const EditableArticle = ({
  blogId,
  blogSlug,
  articleSlug,
  articleTitle,
  articleVersion,
  setEdit,
}: {
  blogId: string
  blogSlug: string
  setEdit: Dispatch<SetStateAction<boolean>>
  articleSlug?: string
  articleTitle?: string
  articleVersion?: number
  isUpdate?: boolean
}) => {
  const { setMessage } = useContext(NotificationContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>(articleTitle || 'Titre')
  const [contentVersion, setContentVersion] = useState<number>(
    articleVersion || 0
  )

  const [updateArticle] = useMutation(UPDATE_ARTICLE)
  const { loading, error, data } = useQuery(GET_ONE_ARTICLE, {
    variables: {
      allVersions: true,
      slug: articleSlug,
      blogSlug,
    },
    fetchPolicy: 'no-cache',
  })
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
            updateArticle: { slug },
          },
        } = await updateArticle({
          variables: {
            blogId,
            show: publish,
            version: contentVersion + 1,
            articleContent: savedArticleData,
            title,
          },
        })
        setEdit(false)
        navigate(`/blogs/${blogSlug}/${slug}`)
        return
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

  if (loading) return <div>Loading...</div>
  if (error) {
    setMessage({
      text: `Une erreur s'est produite`,
      type: 'error',
    })
    return <>Error</>
  }
  if (data) {
    const { getOneArticle: article }: { getOneArticle: IArticle } = data

    const dataToEdit =
      article.articleContent.filter(
        (content) => content.version === contentVersion
      )[0].content.blocks || dummyData

    return (
      <>
        <div className="fixed top-12 left-0 mr-auto ml-3 flex items-center gap-3 z-10 flex-col">
          <div className="flex items-center gap-3">
            <button
              className="btn btn-info mt-10"
              onClick={() => handleSave({ publish: false })}
            >
              {article?.show ? <>Marquer</> : <>Enregistrer</>}
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
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <em>Version du contenu de l'article : </em>
            <select
              name="version"
              value={contentVersion}
              onChange={(e) => setContentVersion(parseInt(e.target.value))}
            >
              {article.articleContent.map((contentVersion) => (
                <option key={contentVersion.id} value={contentVersion.version}>
                  {contentVersion.version}
                </option>
              ))}
            </select>
          </div>
        </div>
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
  return <></>
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

export default EditableArticle
