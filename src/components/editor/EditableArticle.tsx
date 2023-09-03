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
import {
  DELETE_ARTICLE,
  GET_ONE_ARTICLE,
  UPDATE_ARTICLE,
} from '../../queries/articles'
import EditorWrapper from './EditorWrapper'
import { IArticle } from '../../utils/interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import EditorTools from './EditorTools'
import ErrorComponent from '../ErrorComponent'
import { TbEditCircle } from 'react-icons/tb'

const EditableArticle = ({
  blogId,
  blogSlug,
  articleId,
  articleCoverUrl,
  articleSlug,
  articleTitle,
  articleVersion,
}: {
  blogId: string
  blogSlug: string
  articleId: string
  articleVersion: number
  articleSlug: string
  articleTitle: string
  articleCoverUrl?: string
}) => {
  const { setMessage } = useContext(NotificationContext)
  const navigate = useNavigate()

  const [showTools, setShowTools] = useState(false)
  const [title, setTitle] = useState<string>(articleTitle || 'Titre')
  const [coverUrl, setCoverUrl] = useState<string | null>(
    articleCoverUrl || null
  )
  const [contentVersion, setContentVersion] = useState<number>(articleVersion)
  const [newContentVersion, setNewContentVersion] =
    useState<number>(articleVersion)

  const [updateArticle] = useMutation(UPDATE_ARTICLE)
  const [deleteArticle] = useMutation(DELETE_ARTICLE)

  const { loading, error, data, refetch } = useQuery(GET_ONE_ARTICLE, {
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
        await updateArticle({
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
        setShowTools(false)
        setContentVersion(versionToStore)
        setMessage({
          text: 'Article enregistré avec succès',
          type: 'success',
        })
        return
      } catch (error) {
        console.error(error)
        setShowTools(false)
        setMessage({
          text: `Une erreur s'est produite`,
          type: 'error',
        })
      }
    },
    [title, coverUrl, newContentVersion, contentVersion]
  )

  if (loading) return <div>Chargement...</div>
  if (error) {
    setMessage({
      text: `Une erreur s'est produite`,
      type: 'error',
    })
    return <ErrorComponent error={error} />
  }
  if (data) {
    const { getOneArticle: article }: { getOneArticle: IArticle } = data

    const handleDelete = async () => {
      const confirm = window.confirm(
        'Cette action est irréversible\nÊtes-vous sûr?'
      )
      if (confirm) {
        try {
          await deleteArticle({
            variables: {
              articleId: article.id,
              blogId,
            },
          })
          navigate(`/blogs/${blogSlug}`)
        } catch (error) {
          setMessage({
            text: `Une erreur s'est produite`,
            type: 'error',
          })
        }
      }
    }
    const dataToEdit = article.articleContent.filter(
      (content) => content.version === contentVersion
    )

    if (!dataToEdit.length) {
      refetch({
        allVersions: true,
        slug: articleSlug,
        blogSlug,
      })
      return <div>Chargement...</div>
    }

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
            isNew={false}
            contentVersion={contentVersion}
            article={article}
            setContentVersion={setContentVersion}
            coverUrl={coverUrl}
            setCoverUrl={setCoverUrl}
            blogId={blogId}
            setNewContentVersion={setNewContentVersion}
            setShowTools={setShowTools}
            handleDelete={handleDelete}
          />
        )}

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
            blocks={dataToEdit[0].content.blocks}
            handleInitialize={handleInitialize}
            editorCore={editorCore}
            uploadUrl={`/upload/blog/${blogId}/article/${articleId}`}
          />
        </div>
      </>
    )
  }
  return <></>
}

export default EditableArticle
