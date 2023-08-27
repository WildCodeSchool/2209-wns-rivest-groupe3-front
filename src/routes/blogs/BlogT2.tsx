import StaticPagination from '../../components/buttons/StaticPagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'
import { IPropsBlogTemplate } from '../../utils/interfaces/Interfaces'
import { useContext, useState } from 'react'
import { UserContext } from '../../contexts/UserContext'
import Avatar from '../../components/Avatar'
import SubscribeBtn from '../../components/buttons/SubscribeBtn'
import ShareBtn from '../../components/buttons/ShareBtn'
import AddArticleBtn from '../../components/buttons/AddArticleBtn'
import EditBlogBtn from '../../components/buttons/EditBlogBtn'

const BlogT2 = ({
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
    <>
      <div className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-4 py-8">
        <header className="relative w-full mx-auto flex flex-col justify-center items-center text-white gap-4 py-8">
          <h1 className="text-5xl md:text-7xl text-center font-bold font-lobster bg-neutral/80 p-2">
            {name}
          </h1>
          <p className="max-w-2xl bg-neutral/80 p-2 prose">{blogDescription}</p>
          {coverUrl ? (
            <figure className="absolute -z-10 h-full w-full overflow-hidden flex justify-center items-center">
              <img
                className="object-cover min-w-full min-h-full"
                src={`${import.meta.env.VITE_IMAGES_URL}${coverUrl}`}
                alt={`couverture du blog ${name}`}
              />
            </figure>
          ) : (
            <div className="absolute -z-10 bg-primary/5 w-full h-full" />
          )}
        </header>
        <nav className="w-full flex flex-col-reverse sm:flex-row justify-between items-center gap-4">
          <div className="w-full max-w-xs lg:max-w-lg xl:max-w-xl">
            <SearchBar setSearchInput={setSearchInput} />
          </div>
          <div className="flex sm:justify-end items-center gap-4 sm:gap-2 sm:ml-auto">
            {editor.id === user?.id ? (
              <>
                <AddArticleBtn addArticle={addArticle} />
                <EditBlogBtn editBlog={editBlog} />
              </>
            ) : (
              <SubscribeBtn blog={blog} />
            )}
            <ShareBtn />
          </div>
        </nav>
        {articles.length ? (
          <section className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-2 sm:px-2 md:px-0">
            {articles
              .filter((article) =>
                article.title.toLowerCase().includes(searchInput)
              )
              .map((article, key) => (
                <Card key={key} article={article} blog={blog} />
              ))}
          </section>
        ) : (
          <span className="text-xl md:text-3xl m-auto px-2">
            Aucun article disponible pour le moment
          </span>
        )}
        {articles.length !== 0 && <StaticPagination />}
      </div>
      <aside className="py-16 bg-primary/10 w-full flex">
        <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4 md:gap-24">
          <div className="avatar">
            <Avatar imgUrl={editor.avatar} width="w-60 md:w-80" />
          </div>
          <div className="flex flex-col items-center gap-4 max-w-2xl">
            <a
              href={`/profile/${editor.id}`}
              className="font-lobster text-3xl md:text-5xl hover:text-secondary"
            >
              {editor.nickname}
            </a>
            <p className="text-xl md:text-3xl">
              {editor.description ?? 'Aucune description'}
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}

export default BlogT2
