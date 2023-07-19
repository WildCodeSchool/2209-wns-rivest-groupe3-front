import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate'
import { IArticle } from '../utils/interfaces/Interfaces'

const CardT2 = ({ article }: { article: IArticle }) => {
  const item = {
    slug: article ? `/blogs/${article?.blog?.slug}/${article.slug}` : '#',
    img: article?.coverUrl
      ? `${import.meta.env.VITE_IMAGES_URL}${article.coverUrl}`
      : '/Tabasblog-default.png',
    title: article?.title || '',
    description: 'Aucune description disponible.',
    createdAt: article ? formatDate(article.postedAt) : null,
    userName: article?.blog?.user.nickname,
  }
  return (
    <Link
      to={`${article.slug}`}
      className="w-full group card lg:card-side bg-base-100 m-auto shadow-article cursor-pointer transition-all duration-300"
    >
      <figure className="relative w-full h-48 md:h-80 lg:w-2/3 overflow-hidden">
        <img
          src={item.img}
          alt={item.title}
          className="min-w-full min-h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
        {/* <span className="absolute right-0 bottom-0 bg-primary text-white p-2">5 commentaires</span> */}
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">
          {item.title}
        </h2>
        {/* <div className="w-full flex gap-2 justify-start">
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
        </div> */}
        <p>{item.description}</p>
        {item.createdAt && (
          <span className="italic text-sm text-end">
            Créé le {item.createdAt} par <strong>{item.userName}</strong>
          </span>
        )}
      </div>
    </Link>
  )
}

export default CardT2
