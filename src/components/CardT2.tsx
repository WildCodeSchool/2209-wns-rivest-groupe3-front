import { Link } from 'react-router-dom'
import { IArticle } from '../utils/interfaces/Interfaces'

const CardT2 = ({ article }: { article: IArticle }) => {
  return (
    <Link
      to={`${article.slug}`}
      className="w-full group card card-side bg-base-100 m-auto shadow-article cursor-pointer transition-all duration-300"
    >
      <figure className="relative w-full overflow-hidden">
        <img
          src={
            article.coverUrl
              ? `${import.meta.env.VITE_IMAGES_URL}${article.coverUrl}`
              : '/Tabasblog-default.png'
          }
          alt="Shoes"
          className="w-full group-hover:scale-110 transition-all duration-300"
        />
        {/* <span className="absolute right-0 bottom-0 bg-primary text-white p-2">5 commentaires</span> */}
      </figure>
      <div className="card-body">
        <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">
          {article.title}
        </h2>
        <div className="w-full flex gap-2 justify-start">
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
          <span className="badge">#asie</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui, deserunt
          corporis? Aliquid nam necessitatibus, nobis temporibus atque, quia,
          sequi quam reiciendis possimus molestias eaque neque! Vero nemo
          tempora veniam corrupti.
        </p>
        <span className="italic text-sm text-end">
          Crée le 20/02/2022 par <strong>Kasix69</strong>
        </span>
      </div>
    </Link>
  )
}

export default CardT2
