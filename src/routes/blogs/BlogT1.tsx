import { useContext, useState } from 'react'
import Avatar from '../../components/Avatar'
import AddArticleBtn from '../../components/buttons/AddArticleBtn'
import EditBlogBtn from '../../components/buttons/EditBlogBtn'
import ShareBtn from '../../components/buttons/ShareBtn'
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
    <main className="relative min-h-screen w-full mx-auto mt-8 md:my-8 flex flex-col items-center md:gap-8">
      <header className="relative w-full max-w-screen-2xl mx-auto flex flex-col justify-center items-center text-white gap-4 py-8 mt-8">
        <h1 className="text-5xl md:text-7xl font-bold font-lobster bg-neutral/80 p-2">
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
      <section className="flex flex-col-reverse md:flex-row justify-between items-start w-full max-w-screen-2xl relative">
        <aside className="w-full md:max-w-sm h-full p-8 bg-primary/10 rounded-md md:sticky top-16">
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
        <article className="flex flex-col items-center w-full mb-4">
          <nav className="flex flex-col sm:flex-row-reverse md:flex-col xl:flex-row-reverse w-full bg-white px-2 py-4 md:py-0 md:pr-0 md:pl-4 gap-4 justify-between items-start md:sticky top-16 z-30">
            <div className="flex justify-between items-center gap-2">
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
          <div className="w-full sm:w-80 xl:w-5/12 md:w-full lg:max-w-lg xl:max-w-xl">
              <SearchBar setSearchInput={setSearchInput} />
            </div>
          </nav>
          <div className="space-y-4 md:p-4 md:pr-0">
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
