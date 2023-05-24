import { Link } from 'react-router-dom'
import PolaroidCard from '../../components/PolaroidCard'
import { IBlog } from '../../utils/interfaces/Interfaces'

interface IProps {
  blogs?: IBlog[] | null
  title: string
  content: string
  link: string
  bgColor: string
}

const LastedItemsSection = ({
  title,
  content,
  link,
  bgColor,
  blogs = null,
}: IProps) => {
  return (
    <section
      className={`md:p-16 group/section flex flex-col items-center justify-center gap-4 md:gap-8 ${bgColor} py-8`}
    >
      <h2 className="text-3xl md:text-5xl font-lobster font-bold md:text-center px-8">
        {title}
      </h2>
      <div className='w-full px-8'>
        <div className="h-px w-0 group-hover/section:w-full max-w-sm bg-neutral transition-all duration-1000 md:mx-auto" />
      </div>
      <p className="text-xl md:text-3xl md:text-center max-w-lg px-8">
        {content}
      </p>
      <article className="flex flex-col md:flex-row justify-center md:items-stretch gap-8 md:gap-16 my-4">
        {blogs &&
          blogs.map((blog: any) => {
            return <PolaroidCard key={blog.id} blog={blog} />
          })}
      </article>
      <Link
        to={link}
        className="link link-hover font-lobster underline text-3xl hover:text-secondary transition-all duration-300"
      >
        Voir plus
      </Link>
    </section>
  )
}

export default LastedItemsSection
