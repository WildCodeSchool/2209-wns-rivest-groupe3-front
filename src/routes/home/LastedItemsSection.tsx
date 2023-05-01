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
      className={`md:p-16 group/section flex flex-col items-center justify-center gap-8 ${bgColor}`}
    >
      <h2 className="text-5xl font-lobster font-bold text-center">{title}</h2>
      <div className="h-px w-0 group-hover/section:w-96 bg-neutral transition-all duration-1000" />
      <p className="text-3xl text-center max-w-lg">{content}</p>
      <article className="md:flex justify-center items-stretch gap-16 my-4">
        {blogs &&
          blogs.map((blog: any) => {
            return <PolaroidCard key={blog.id} blog={blog} />
          })}
      </article>
      <Link to={link} className="link link-hover font-lobster underline text-3xl hover:text-secondary transition-all duration-300">
        Voir plus
      </Link>
    </section>
  )
}

export default LastedItemsSection
