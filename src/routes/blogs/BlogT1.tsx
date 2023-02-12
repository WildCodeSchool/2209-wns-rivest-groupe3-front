import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/buttons/Pagination'
import CardT2 from '../../components/CardT2'
import SearchBar from '../../components/inputs/SearchBar'
import { UserContext } from '../../contexts/UserContext'
import { IPropsBlogTemplate } from '../../utils/interfaces/Interfaces'

const BlogT1 = ({
  blog,
  editor,
  articles,
  addArticle,
  editBlog
}: IPropsBlogTemplate) => {
  const { user } = useContext(UserContext)
  const { name, description } = blog
  const blogDescription = description?.length ? description : 'Aucune description'
  return (
    <main className="relative min-h-screen w-full mx-auto my-8 flex flex-col items-center gap-8">
      <header className="h-96 w-full m-auto bg-[url('https://placeimg.com/1000/800/arch')] bg-opacity-25 flex flex-col justify-center items-center text-white gap-4">
        <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
          {name}
        </h1>
        <p className="max-w-2xl bg-neutral/80 p-2 prose">{blogDescription}</p>
      </header>
      <section className="flex justify-between items-start w-full max-w-screen-2xl relative">
        <aside className="w-96 h-full p-8 bg-gray-300 rounded-md sticky top-16">
          <div className="flex flex-col justify-center items-center h-full w-full gap-8">
            <div className="avatar">
              <div className="w-80 mask mask-squircle mx-auto">
                <img src="https://placeimg.com/192/192/people" />
              </div>
            </div>
            <h2 className="font-lobster text-5xl">{editor.nickname}</h2>
            <p className="text-xl">
              {editor.description ?? 'Aucune description'}
            </p>
            <div className="flex gap-2">
              <button className="btn btn-outline">Suivre</button>
              <button className="btn btn-outline">Partager</button>
            </div>
          </div>
        </aside>
        <article className="flex flex-col items-center w-full">
          <nav className="navbar bg-white p-4 gap-8 justify-between sticky top-16 z-30">
            <div className="flex gap-2">
              <button className="btn btn-outline">Filtre</button>
              <SearchBar />
            </div>
            {editor.id === user?.id ? (
              <div className="flex gap-2">
                <button className="btn btn-info" onClick={editBlog}>
                  Modifier
                </button>
                <button className="btn btn-info" onClick={addArticle}>
                  Ajouter un article
                </button>
              </div>
            ) : (
              <button className="btn btn-outline">Suivre</button>
            )}
          </nav>
          <div className="space-y-4 p-4 pr-0">
            {articles.length ? (
              articles.map((article) => (
                <CardT2 key={article.id} article={article} />
              ))
            ) : (
              <span className="text-3xl my-24">
                Aucun article disponible pour le moment
              </span>
            )}
          </div>
          <Pagination />
        </article>
      </section>
    </main>
  )
}

export default BlogT1
