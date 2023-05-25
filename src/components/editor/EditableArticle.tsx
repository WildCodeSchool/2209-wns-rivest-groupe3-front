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
import { GET_ONE_ARTICLE, UPDATE_ARTICLE } from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { IArticle, IContentType } from '../../utils/interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import EditorTools from './EditorTools'
import ImageHandler from '../imagehandler/ImageHandler'

const EditableArticle = ({
  blogId,
  blogSlug,
  articleId,
  articleCoverUrl,
  articleSlug,
  articleTitle,
  articleVersion,
  setEdit,
}: {
  blogId: string
  blogSlug: string
  articleId: string
  articleVersion: number
  articleSlug: string
  articleTitle: string
  articleCoverUrl?: string
  setEdit: Dispatch<SetStateAction<boolean>>
}) => {
  const { setMessage } = useContext(NotificationContext)
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>(articleTitle || 'Titre')
  const [coverUrl, setCoverUrl] = useState<string | null>(
    articleCoverUrl || null
  )
  const [contentVersion, setContentVersion] = useState<number>(articleVersion)
  const [newContentVersion, setNewContentVersion] =
    useState<number>(articleVersion)

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

      const versionToStore =
        newContentVersion !== articleVersion
          ? newContentVersion
          : contentVersion

      try {
        const {
          data: {
            updateArticle: { slug },
          },
        } = await updateArticle({
          variables: {
            blogId,
            articleId,
            show: publish,
            version: versionToStore,
            articleContent: savedArticleData,
            title,
            coverUrl,
          },
        })
        setEdit(false)
        setContentVersion(versionToStore)
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
    [title, coverUrl, newContentVersion, contentVersion]
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
        <EditorTools
          handleSave={handleSave}
          title={title}
          setTitle={setTitle}
          isNew={false}
          contentVersion={contentVersion}
          article={article}
          setContentVersion={setContentVersion}
          coverUrl={coverUrl}
          setCoverUrl={setCoverUrl}
          blogId={blogId}
          setNewContentVersion={setNewContentVersion}
          // setEdit={setEdit}
        />
        <header className="mt-0 w-full flex flex-col justify-center items-center text-white gap-4">
          <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
            {title}
          </h1>
          {article.coverUrl ? (
            <figure className="absolute -z-10 h-96 w-full overflow-hidden flex justify-center items-center">
              <img
                className="w-full"
                src={`${import.meta.env.VITE_IMAGES_URL}${article.coverUrl}`}
                alt={`couverture du blog ${name}`}
              />
            </figure>
          ) : (
            <div className="absolute -z-10 bg-primary/5 w-full h-full" />
          )}
        </header>
        <div className="bg-white px-8 bg-opacity-80">
          <EditorWrapper
            blocks={dataToEdit}
            handleInitialize={handleInitialize}
            editorCore={editorCore}
          />
        </div>
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
