import Image from '@editorjs/image'
import { createReactEditorJS } from 'react-editor-js'
import type EditorJS from '@editorjs/editorjs'

import { EDITOR_JS_TOOLS } from './Tools'
import { IContentBlock } from '../../utils/interfaces/Interfaces'
import { useEffect } from 'react'
import axios from 'axios'

enum LogLevels {
  VERBOSE = 'VERBOSE',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const EditorWrapper = ({
  blocks,
  handleInitialize,
  editorCore,
  uploadUrl,
}: {
  blocks: IContentBlock[]
  handleInitialize: (instance: any) => void
  editorCore: React.MutableRefObject<EditorJS | null>
  uploadUrl: string
}) => {
  const token = localStorage.getItem('token')
  const imageTool = {
    image: {
      class: Image,
      inlineToolbar: true,
      config: {
        buttonContent: 'Choisir une image',
        uploader: {
          async uploadByFile(file: any) {
            try {
              const formData = new FormData()
              formData.append('file', file)
              const { data } = await axios.post(
                `${import.meta.env.VITE_IMAGES_URL}${uploadUrl}`,
                formData,
                {
                  headers: {
                    Authorization: token,
                  },
                }
              )
              const { filename } = data
              return {
                success: 1,
                file: {
                  url: `${import.meta.env.VITE_IMAGES_URL}${filename}`,
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

  const Editor = createReactEditorJS()

  useEffect(() => {
    const reloadEditor = async () => {
      await editorCore.current?.isReady
      await editorCore.current?.render({ blocks })
    }
    if (editorCore.current !== null) {
      reloadEditor()
    }
  }, [blocks])

  return (
    <Editor
      defaultValue={{ blocks }}
      tools={{ ...EDITOR_JS_TOOLS, ...imageTool }}
      onInitialize={handleInitialize}
      inlineToolbar={['link', 'bold', 'italic']}
      logLevel={LogLevels.ERROR}
    />
  )
}

export default EditorWrapper
