import Pagination from '../../components/buttons/Pagination'
import Card from '../../components/Card'
import SearchBar from '../../components/inputs/SearchBar'
import { useParams } from 'react-router-dom'

const BlogT1 = ({
  setIsEditing,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { blogslug } = useParams()

  return (
    <>
      <main className="relative min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <header className="h-96 w-full m-auto bg-[url('https://placeimg.com/1000/800/arch')] bg-opacity-25 flex flex-col justify-center items-center text-white gap-4">
          <h1 className="text-7xl font-bold font-lobster bg-neutral/80 p-2">
            Voyage machin
          </h1>
          <p className="max-w-2xl bg-neutral/80 p-2">
            Si vous êtes passionné de voyage et que vous avez envie de partager
            vos expériences avec le monde entier, alors vous êtes au bon
            endroit. Notre site vous offre tout ce dont vous avez besoin pour
            créer votre propre blog de voyage et raconter vos aventures. Bon
            voyage !
          </p>
        </header>
        <nav className="navbar bg-base-100 justify-between">
          <div className="flex gap-2">
            <button className="btn btn-outline">Filtre</button>
            <SearchBar />
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-info"
              onClick={() => setIsEditing((isEditing) => !isEditing)}
            >
              Modifier
            </button>
            <button className="btn btn-outline">Suivre</button>
            <button className="btn btn-outline">Partager</button>
          </div>
        </nav>
        <section className="w-full grid grid-cols-3 grid-row-3 gap-8">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
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
            <h2 className="font-lobster text-5xl">A propos</h2>
            <p className="text-3xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
              quia beatae quaerat explicabo, quisquam blanditiis ut repellendus
              velit cum doloribus tenetur aperiam nihil perspiciatis dignissimos
              iste, ipsa veniam dolor accusamus?
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogT1
