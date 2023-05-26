import { AiOutlineEdit } from 'react-icons/ai'

const EditBlogBtn = ({ editBlog }: { editBlog: () => void }) => {
  return (
    <button
      className="btn btn-info flex items-center gap-2 w-12 aspect-square p-2 sm:w-fit sm:aspect-auto sm:px-4"
      onClick={editBlog}
    >
      <AiOutlineEdit size={'1.5rem'} />
      <span className="hidden lg:flex">Modifier</span>
    </button>
  )
}

export default EditBlogBtn
