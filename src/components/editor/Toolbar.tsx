import { BiHeading, BiParagraph, BiImage, BiListUl } from 'react-icons/bi'

const Toolbar = ({ addNewBlock }: { addNewBlock: any }) => {
  return (
    <div className="flex gap-3 text-2xl max-w-fit m-auto outline rounded outline-slate-300 p-2 mt-1">
      <BiHeading
        className="p-1 rounded cursor-pointer hover:bg-slate-300"
        onClick={() => addNewBlock('header')}
      />
      <BiParagraph
        className="p-1 rounded cursor-pointer hover:bg-slate-300"
        onClick={() => addNewBlock('paragraph')}
      />
      <BiImage
        className="p-1 rounded cursor-pointer hover:bg-slate-300"
        onClick={() => addNewBlock('image')}
      />
      <BiListUl
        className="p-1 rounded cursor-pointer hover:bg-slate-300"
        onClick={() => addNewBlock('list')}
      />
    </div>
  )
}

export default Toolbar
