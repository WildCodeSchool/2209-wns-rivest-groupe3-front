import { useContext, useState } from 'react'
import Avatar from '../../components/Avatar'
import StaticPagination from '../../components/buttons/StaticPagination'
import SubscribeBtn from '../../components/buttons/SubscribeBtn'
import CardT2 from '../../components/CardT2'
import SearchBar from '../../components/inputs/SearchBar'
import { UserContext } from '../../contexts/UserContext'
import { IPropsBlogTemplate } from '../../utils/interfaces/Interfaces'

const BlogT1 = ({
  blog,
  editor,
  articles,
  addArticle,
  editBlog,
}: IPropsBlogTemplate) => {
  const { user } = useContext(UserContext)
  const { name, description, coverUrl } = blog
  const blogDescription = description?.length
    ? description
    : 'Aucune description'

  const [searchInput, setSearchInput] = useState('')
  return (
    <main className="relative min-h-screen w-full mx-auto my-8 flex flex-col items-center gap-8">
      <header className="relative h-96 w-full m-auto bg-opacity-25 flex flex-col justify-center items-center text-white gap-4">
        {coverUrl ? (
          <figure className="absolute -z-10 h-96 w-full overflow-hidden flex justify-center items-center">
            <img
              className="w-full"
              src={`${import.meta.env.VITE_IMAGES_URL}${coverUrl}`}
              alt="couverture"
            />
          </figure>
        ) : (
          <div className="absolute -z-10 bg-primary/5 w-full h-full" />
        )}
        <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
          {name}
        </h1>
        <p className="max-w-2xl bg-neutral/80 p-2 prose">{blogDescription}</p>
      </header>
      <section className="flex justify-between items-start w-full max-w-screen-2xl relative">
        <aside className="w-96 h-full p-8 bg-primary/5 rounded-md sticky top-16">
          <div className="flex flex-col justify-center items-center h-full w-full gap-8">
            <div className="avatar">
              <Avatar imgUrl={editor.avatar} width="w-80" />
            </div>
            <a
              href={`/profile/${editor.id}`}
              className="font-lobster text-5xl hover:text-secondary"
            >
              {editor.nickname}
            </a>
            <p className="text-xl">
              {editor.description ?? 'Aucune description'}
            </p>
          </div>
        </aside>
        <article className="flex flex-col items-center w-full">
          <nav className="navbar bg-white p-4 gap-8 justify-between sticky top-16 z-30">
            <div className="flex gap-2">
              <button className="btn btn-outline">Filtre</button>
              <SearchBar setSearchInput={setSearchInput} />
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
              <SubscribeBtn blog={blog} />
            )}
          </nav>
          <div className="space-y-4 p-4 pr-0">
            {articles.length ? (
              articles
                .filter((article) =>
                  article.title.toLowerCase().includes(searchInput)
                )
                .map((article) => <CardT2 key={article.id} article={article} />)
            ) : (
              <span className="text-3xl my-24">
                Aucun article disponible pour le moment
              </span>
            )}
          </div>
          <StaticPagination />
        </article>
      </section>
    </main>
  )
}

export default BlogT1
