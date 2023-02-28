import Pagination from '../../components/buttons/Pagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'
import { IPropsBlogTemplate } from '../../utils/interfaces/Interfaces'
import { useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const BlogT2 = ({
  blog,
  editor,
  articles,
  addArticle,
  editBlog,
}: IPropsBlogTemplate) => {
  const { user } = useContext(UserContext)
  const { name, description } = blog
  const blogDescription = description?.length ? description : 'Aucune description'
  return (
    <>
      <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <header className="relative h-96 w-full m-auto flex flex-col justify-center items-center text-white gap-4">
          <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
            {name}
          </h1>
          <p className="max-w-2xl bg-neutral/80 p-2 prose">
            {blogDescription}
          </p>
          <figure className="absolute w-full h-96 overflow-hidden flex items-center bg-gray-300 -z-10">
            <img
              src="https://placeimg.com/1000/800/arch"
              alt={`couverture du blog ${name}`}
              className="w-full"
            />
          </figure>
        </header>
        <nav className="navbar bg-base-100 justify-between">
          <div className="flex gap-2">
            <button className="btn btn-outline">Filtre</button>
            <SearchBar />
          </div>
          <div className="flex gap-2">
            {editor.id === user?.id ? (
              <>
                <button className="btn btn-info" onClick={editBlog}>
                  Modifier
                </button>
                <button className="btn btn-info" onClick={addArticle}>
                  Ajouter un article
                </button>
              </>
            ) : (
              <button className="btn btn-outline">Suivre</button>
            )}
            <button className="btn btn-outline">Partager</button>
          </div>
        </nav>
        <h2 className="text-5xl font-bold font-lobster ">Articles</h2>
        <section className="w-full flex justify-center gap-8">
          {articles.length ? (
            articles.map((article) => (
              <Card key={article.id} article={article} />
            ))
          ) : (
            <span className="text-3xl my-24">
              Aucun article disponible pour le moment
            </span>
          )}
        </section>
        {articles.length !== 0 && <Pagination />}
      </main>
      <section className="py-16 bg-gray-300 w-full flex">
        <div className="flex justify-center items-center w-full gap-24">
          <div className="avatar">
            <div className="w-80 mask mask-squircle mx-auto">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-lobster text-5xl">{editor.nickname}</h2>
            <p className="text-3xl">
              {editor.description ?? 'Aucune description'}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogT2
