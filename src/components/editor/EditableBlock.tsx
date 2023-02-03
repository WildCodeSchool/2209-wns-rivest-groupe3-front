import parse from 'html-react-parser'
import { useState } from 'react'
import { IContentBlock } from '../../utils/interfaces/Interfaces'

const EditableBlock = ({
  block,
  updateBlock,
  blockIndex,
}: {
  block: IContentBlock
  updateBlock: any
  blockIndex: number
}) => {
  const [text, setText] = useState('')
  const updateState = (event: string | null) => {
    if (event !== null && event.length > 0) {
      setText(event)
    }
  }

  switch (block.type) {
    case 'header':
      switch (block.data.level) {
        case 1:
          return (
            <h1
              className="whitespace-pre-line text-5xl font-bold font-lobster m-3 mt-6 ml-0 outline-none"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={() => {
                if (text.length > 0) {
                  updateBlock(blockIndex, text)
                }
              }}
              onInput={(e) => {
                updateState(e.currentTarget.innerText)
              }}
            >
              {block.data.text}
            </h1>
          )
        case 2:
          return (
            <h2
              className="whitespace-pre-line text-4xl font-bold font-lobster m-3 mt-6 ml-0 outline-none"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={() => {
                if (text.length > 0) {
                  updateBlock(blockIndex, text)
                }
              }}
              onInput={(e) => {
                updateState(e.currentTarget.innerText)
              }}
            >
              {block.data.text}
            </h2>
          )
        default:
          return (
            <h3
              className="whitespace-pre-line text-4xl font-bold font-lobster m-3 mt-6 ml-0 outline-none"
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={() => {
                if (text.length > 0) {
                  updateBlock(blockIndex, text)
                }
              }}
              onInput={(e) => {
                updateState(e.currentTarget.innerText)
              }}
            >
              {block.data.text}
            </h3>
          )
      }
    default:
      return (
        <p
          className="whitespace-pre-line outline-none"
          contentEditable
          suppressContentEditableWarning={true}
          onBlur={() => {
            if (text.length > 0) {
              updateBlock(blockIndex, text)
            }
          }}
          onInput={(e) => {
            updateState(e.currentTarget.innerText)
          }}
        >
          {block.data.text}
        </p>
      )
  }
}

export default EditableBlock
