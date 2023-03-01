import StaticPagination from '../../components/buttons/StaticPagination'
import CardT2 from '../../components/CardT2'
import SearchBar from '../../components/inputs/SearchBar'

const BlogT2 = ({
  setIsEditing,
}: {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
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
        <section className="flex justify-between items-start w-full relative">
          <aside className="w-96 h-full p-8 bg-gray-300 rounded-md sticky top-16">
            <div className="flex flex-col justify-center items-center h-full w-full gap-8">
              <div className="avatar">
                <div className="w-80 mask mask-squircle mx-auto">
                  <img src="https://placeimg.com/192/192/people" />
                </div>
              </div>
              <h2 className="font-lobster text-5xl">A propos</h2>
              <p className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis quia beatae quaerat explicabo, quisquam blanditiis ut
                repellendus velit cum doloribus tenetur aperiam nihil
                perspiciatis dignissimos iste, ipsa veniam dolor accusamus?
              </p>
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
            </div>
          </aside>
          <article className="flex flex-col items-center">
            <nav className="navbar bg-white p-4 gap-8 justify-between sticky top-16 z-30">
              <button className="btn btn-outline">Filtre</button>
              <SearchBar />
            </nav>
            <div className="space-y-4 p-4 pr-0">
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
              <CardT2 />
            </div>
            <StaticPagination />
          </article>
        </section>
      </main>
    </>
  )
}

export default BlogT2
