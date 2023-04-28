import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate';
import { IArticle, IBlog } from '../utils/interfaces/Interfaces'

const Card = ({ blog, article }: { blog?: IBlog; article?: IArticle }) => {
  const item = {
    slug: blog
      ? `/blogs/${blog.slug}`
      : article
      ? `/blogs/${article?.blog?.slug}/${article.slug}`
      : '#',
    img: blog && blog.coverUrl
      ? `${import.meta.env.VITE_IMAGES_URL}${blog.coverUrl}`
      : '/Tabasblog-default.png',
    title: blog?.name || article?.title || '',
    description: blog?.description || 'Aucune description disponible.',
    createdAt: blog
      ? formatDate(blog.createdAt)
      : article
      ? formatDate(article.postedAt)
      : null,
    userName: blog?.user.nickname || article?.blog?.user.nickname,
  }

  if (blog || article)
    return (
      <Link
        to={item.slug}
        className="w-full max-w-lg group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300 h-full"
      >
        <figure className="relative w-full h-80 overflow-hidden">
          <img
            src={item.img}
            alt="Shoes"
            className="min-w-full min-h-full object-cover group-hover:scale-110 transition-all duration-300"
          />
          {/* <span className="absolute right-0 bottom-0 bg-primary text-white p-2">
            5 commentaires
          </span> */}
        </figure>
        <div className="card-body p-2 sm:p-4 h-80">
          <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">
            {item.title}
          </h2>
          <div className="w-full flex gap-2 justify-start">
            <span className="badge">#asie</span>
            <span className="badge">#UK</span>
            <span className="badge">#paysBasque</span>
          </div>
          <div className="h-48 w-full overflow-hidden relative">
            <div className="absolute top-1/2 w-full h-1/2 bg-gradient-to-b from-transparent to-white" />
            <p>{item.description}</p>
          </div>
          {item.createdAt && (
            <span className="italic text-sm text-end">
              Créé le {item.createdAt} par <strong>{item.userName}</strong>
            </span>
          )}
        </div>
      </Link>
    )

  return <></>
}

export default Card
