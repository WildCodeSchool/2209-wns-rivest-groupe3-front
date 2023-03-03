import { Link } from 'react-router-dom'

interface IUser {
  id: string
  nickname: string
}
interface IBlog {
  id: string
  name: string
  description: string
  createdAt: Date
  slug: string
  user: IUser
}

const BlogCard = ({ blog }: { blog: IBlog }) => {
  const {
    name,
    description,
    createdAt,
    slug,
    user: { nickname },
  } = blog

  const date = createdAt.toString().split('T')[0].replaceAll('-', '/')

  return (
    <Link
      to={`/blogs/${slug}`}
      className="w-full group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300"
    >
      <figure className="relative w-full overflow-hidden">
        <img
          src="/src/assets/Tabasblog-default.png"
          alt="Shoes"
          className="w-full group-hover:scale-110 transition-all duration-300"
        />
        <span className="absolute right-0 bottom-0 bg-primary text-white p-2">
          5 commentaires
        </span>
      </figure>
      <div className="card-body">
        <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">
          {name}
        </h2>
        <div className="w-full flex gap-2 justify-start">
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
        </div>
        <p>{description}</p>
        <span className="italic text-sm text-end">
          {`Crée le ${date} par`} <strong>{nickname}</strong>
        </span>
      </div>
    </Link>
  )
}

export default BlogCard
