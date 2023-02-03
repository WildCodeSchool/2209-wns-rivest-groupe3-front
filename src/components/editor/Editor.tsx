import React, { useState } from 'react'
import { IContentBlock } from '../../utils/interfaces/Interfaces'
import EditableBlock from './EditableBlock'
import { HiOutlinePlus, HiXMark } from 'react-icons/hi2'
import Toolbar from './Toolbar'

const Editor = ({ blocks }: { blocks: IContentBlock[] }) => {
  const [showToolBar, setShowToolBar] = useState(false)
  const [localBlocks, setLocalBlocks] = useState([...blocks])
  const updateBlocks = (index: number, text: string) => {
    localBlocks[index].data.text = text
    setLocalBlocks([...localBlocks])
  }
  const addNewBlock = (type: string) => {
    setLocalBlocks([
      ...localBlocks,
      { id: generateId(), type, data: { text: 'Start typing..' } },
    ])
    setShowToolBar(false)
  }
  const deleteBlock = (blockToDelete: IContentBlock) => {
    const newLocalBlocks = localBlocks.filter(
      (block) => block.id !== blockToDelete.id
    )
    setLocalBlocks(newLocalBlocks)
  }
  const generateId = () => {
    return Math.random().toString(36).substring(2, 12)
  }
  return (
    <div className="w-full max-w-5xl border p-5 rounded-xl pb-10">
      {localBlocks.map((block, index) => {
        return (
          <div className="relative">
            <button
              className="btn glass btn-circle m-auto center flex justify-center absolute -left-16 btn-sm hover:bg-slate-400"
              onClick={() => {
                deleteBlock(block)
              }}
            >
              <HiXMark />
            </button>
            <EditableBlock
              block={block}
              key={block.id}
              updateBlock={updateBlocks}
              blockIndex={index}
            />
          </div>
        )
      })}
      <button
        className="btn btn-ghost btn-circle m-auto center flex justify-center"
        onClick={() => setShowToolBar(!showToolBar)}
      >
        {showToolBar ? <HiXMark /> : <HiOutlinePlus />}
      </button>
      {showToolBar && <Toolbar addNewBlock={addNewBlock} />}
    </div>
  )
}

export default Editor
