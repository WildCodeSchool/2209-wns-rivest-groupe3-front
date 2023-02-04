import { useContext, useState, useMemo, useCallback } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import Editor from '../../../components/editor/Editor'

const ArticleEditor = () => {
  const { user } = useContext(UserContext)
  const [title, setTitle] = useState('')
  const updateTitle = (event: string | null) => {
    if (event !== null && event.length > 0) setTitle(event)
  }

  const dummyData = [
    {
      id: 'oUq2g_tl8y',
      type: 'header',
      data: {
        text: 'Holmes made Editor',
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
      <button className="btn btn-primary mt-10">Enregistrer</button>
      <header className="m-16 w-full flex flex-col justify-center items-center text-white gap-4">
        <h1
          className="text-7xl font-bold font-lobster bg-neutral/80 p-2"
          contentEditable
          suppressContentEditableWarning={true}
          onInput={(e) => {
            updateTitle(e.currentTarget.textContent)
          }}
        >
          Titre
        </h1>
      </header>
      <Editor blocks={dummyData} />
    </main>
  )
}

export default ArticleEditor
