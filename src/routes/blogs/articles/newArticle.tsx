import { useContext, useState, useRef, useCallback } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { UserContext } from '../../../contexts/UserContext'
import { createReactEditorJS } from 'react-editor-js'
import { EDITOR_JS_TOOLS } from '../../../components/editor/Tools'
import Image from '@editorjs/image'
import EditorJS from '@editorjs/editorjs'
import { NotificationContext } from '../../../contexts/NotificationContext'
import { CREATE_ARTICLE } from '../../../queries/articles'
import { useNavigate, useParams } from 'react-router-dom'
import { GET_ONE_BLOG } from '../../../queries/blogs'

enum LogLevels {
  VERBOSE = 'VERBOSE',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const ArticleEditor = () => {
  const token = localStorage.getItem('token')
  const { blogSlug } = useParams()
  const navigate = useNavigate()
  const { setMessage } = useContext(NotificationContext)

  const imageTool = {
    image: {
      class: Image,
      inlineToolbar: true,
      config: {
        buttonContent: 'Choisir une image',
        uploader: {
          async uploadByFile(file: any) {
            console.log(file)

            try {
              const response = await fetch(
                '/upload/blog/:blog/article/:article',
                {
                  method: 'POST',
                  body: file,
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              const { filename } = await response.json()
              return {
                success: 1,
                file: {
                  url: filename,
                },
              }
            } catch (error) {
              console.error(error)
              return { success: 0 }
            }
          },
        },
      },
    },
  }

  const [createArticle] = useMutation(CREATE_ARTICLE)

  const [title, setTitle] = useState<string>('Titre')
  const editableTitleElement = useRef<HTMLHeadingElement>(null)
  const updateTitle = (event: string | null) => {
    if (event !== null) {
      setTitle(event)
      if (editableTitleElement.current !== null) {
        editableTitleElement.current.textContent = event
      }
    }
  }

  const {
    data: {
      getBlog: { id: blogId },
    },
  } = useQuery(GET_ONE_BLOG, {
    variables: { slug: blogSlug },
  })

  const Editor = createReactEditorJS()
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
          Titre
        </h1>
      </header>
      <Editor
        defaultValue={{ blocks: dummyData }}
        tools={{ ...EDITOR_JS_TOOLS, ...imageTool }}
        onInitialize={handleInitialize}
        inlineToolbar={['link', 'bold', 'italic']}
        logLevel={LogLevels.ERROR}
      />
    </main>
  )
}

export default ArticleEditor
