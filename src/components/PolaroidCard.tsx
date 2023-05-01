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
      className="w-full max-w-lg group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300 h-full"
    >
      <div className="aspect-square h-96 p-4">
        <figure className="relative h-full w-full overflow-hidden">
          <img
            src={item.img}
            alt={item.title}
            className="min-w-full min-h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
        </figure>
      </div>
      <h2 className="mb-4 font-lobster text-3xl group-hover:text-secondary text-center transition-all duration-300">
        {item.title}
      </h2>
    </Link>
  )
}

export default PolaroidCard
