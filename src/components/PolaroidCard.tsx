import { Link } from 'react-router-dom'
import { IBlog } from '../utils/interfaces/Interfaces'

const PolaroidCard = ({ blog }: { blog: IBlog }) => {
  const item = {
    slug: `/blogs/${blog.slug}`,
    img:
      blog && blog.coverUrl
        ? `${import.meta.env.VITE_IMAGES_URL}${blog.coverUrl}`
        : '/Tabasblog-default.png',
    title: blog.name,
  }

  return (
    <Link
      to={item.slug}
      className="w-full flex flex-col items-center group bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300 h-full"
    >
      <div className="p-4">
        <figure className="relative aspect-square h-full max-h-96 w-full overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="min-w-full min-h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
        </figure>
      </div>
      <span className="w-60 md:w-full mx-auto mb-4 px-2 break-words font-lobster text-xl md:text-3xl group-hover:text-secondary text-center transition-all duration-300">
        {item.title}
      </span>
    </Link>
  )
}

export default PolaroidCard
