import { Link } from "react-router-dom"

const Card = () => {
  return (
    <Link to="/blogs/blogname" className="w-full group card bg-base-100 shadow-card m-auto cursor-pointer transition-all duration-300">
      <figure className="relative w-full overflow-hidden">
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" className="w-full group-hover:scale-110 transition-all duration-300"/>
        <span className="absolute right-0 bottom-0 bg-primary text-white p-2">5 commentaires</span>
      </figure>
      <div className="card-body">
        <h2 className="card-title font-lobster text-3xl group-hover:text-secondary transition-all duration-300">Voyage en Thaïlande !</h2>
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
        <span className="italic text-sm text-end">Crée le 20/02/2022 par <strong>Kasix69</strong></span>
      </div>
    </Link>
  )
}

export default Card
