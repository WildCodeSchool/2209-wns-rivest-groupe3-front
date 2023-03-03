import { Link } from 'react-router-dom'
import { IArticle, IBlog } from '../utils/interfaces/Interfaces'

const Card = ({ blog, article }: { blog?: IBlog; article?: IArticle }) => {
  if (blog)
    return (
      <Link
        to={`/blogs/${blog.slug}`}
        className="w-full group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300 h-full"
      >
        <figure className="relative w-full overflow-hidden">
          <img
            src={
              blog.coverUrl
                ? `http://localhost:8000${blog.coverUrl}`
                : '/src/assets/Tabasblog-default.png'
            }
            alt="Shoes"
            className="w-full group-hover:scale-110 transition-all duration-300"
          />
          <span className="absolute right-0 bottom-0 bg-primary text-white p-2">
            5 commentaires
          </span>
        </figure>
        <div className="card-body">
          <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">
            {blog.name}
          </h2>
          <div className="w-full flex gap-2 justify-start">
            <span className="badge">#asie</span>
            <span className="badge">#UK</span>
            <span className="badge">#paysBasque</span>
          </div>
          <p>{blog.description}</p>
          <span className="italic text-sm text-end">
            Créé le{' '}
            {new Intl.DateTimeFormat('fr-FR').format(new Date(blog.createdAt))}{' '}
            par <strong>{blog.user.nickname}</strong>
          </span>
        </div>
      </Link>
    )
  if (article)
    return (
      <Link
        to={`${article.slug}`}
        className="group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300 "
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
            {article.title}
          </h2>
          <div className="w-full flex gap-2 justify-start">
            <span className="badge">#asie</span>
            <span className="badge">#UK</span>
            <span className="badge">#paysBasque</span>
          </div>
          <p>Article description / summary</p>
        </div>
      </Link>
    )

  return <></>
}

export default Card
