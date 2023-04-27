import Image from '@editorjs/image'
import { createReactEditorJS } from 'react-editor-js'
import type EditorJS from '@editorjs/editorjs'

import { EDITOR_JS_TOOLS } from './Tools'
import { IContentBlock } from '../../utils/interfaces/Interfaces'
import { useEffect } from 'react'

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
}: {
  blocks: IContentBlock[]
  handleInitialize: (instance: any) => void
  editorCore: React.MutableRefObject<EditorJS | null>
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
