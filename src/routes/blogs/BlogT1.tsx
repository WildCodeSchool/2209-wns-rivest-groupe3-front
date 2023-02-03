import Pagination from '../../components/buttons/Pagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'
import { IBlog, IUser } from '../../utils/interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import EditDrag from './EditDrag'

const BlogT1 = ({ blog, user }: { blog: IBlog; user: IUser | null }) => {
  const navigate = useNavigate()

  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      {isEditing && <EditDrag setIsEditing={setIsEditing} />}
      <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <header className="h-96 w-full m-auto bg-[url('https://placeimg.com/1000/800/arch')] bg-opacity-25 flex flex-col justify-center items-center text-white gap-4">
          <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
            {blog.name}
          </h1>
          <p className="max-w-2xl bg-neutral/80 p-2">{blog.description}</p>
        </header>
        <nav className="navbar bg-base-100 justify-between">
          <div className="flex gap-2">
            <button className="btn btn-outline">Filtre</button>
            <SearchBar />
          </div>
          <div className="flex gap-2">
            {user?.id === blog.user.id && (
              <>
                <button
                  className="btn btn-info"
                  onClick={() => setIsEditing((isEditing) => !isEditing)}
                >
                  Modifier
                </button>
                <button className="btn btn-info" onClick={() => navigate(`_`)}>
                  Ajouter un article
                </button>
              </>
            )}
            <button className="btn btn-outline">Suivre</button>
            <button className="btn btn-outline">Partager</button>
          </div>
        </nav>
        <h2 className="text-5xl font-bold font-lobster ">Articles</h2>
        <section className="w-full flex justify-center gap-8">
          {blog.articles.map((article) => {
            return <Card key={article.id} article={article} />
          })}
        </section>

        <Pagination />
      </main>
      <section className="py-16 bg-gray-300 w-full flex">
        <div className="flex justify-center items-center w-full gap-24">
          <div className="avatar">
            <div className="w-80 mask mask-squircle mx-auto">
              <img src="https://placeimg.com/192/192/people" />
            </div>
          </div>
          <div className="space-y-4 max-w-2xl">
            <h2 className="font-lobster text-5xl">{blog.user.nickname}</h2>
            <p className="text-3xl">{blog.user.description}</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogT1
