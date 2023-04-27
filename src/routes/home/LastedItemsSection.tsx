import { Link } from 'react-router-dom'
import Card from '../../components/Card'
import { IArticle, IBlog } from '../../utils/interfaces/Interfaces'

interface IProps {
  blogs?: IBlog[] | null
  articles?: IArticle[] | null
  title: string
  link: string
  bgColor: string
}

const LastedItemsSection = ({
  title,
  link,
  bgColor,
  blogs = null,
  articles = null,
}: IProps) => {
  return (
    <section
      className={`md:p-16 flex flex-col items-center justify-center gap-16 ${bgColor}`}
    >
      <h2 className="text-5xl font-bold text-center">{title}</h2>
      <article className="md:flex justify-center items-stretch gap-16">
        {blogs &&
          blogs.map((blog: any) => {
            return <Card key={blog.id} blog={blog} />
          })}
        {articles &&
          articles.map((article: any) => {
            return <Card key={article.id} article={article} />
          })}
      </article>
      <Link to={link} className="link link-hover text-xl">
        Voir plus
      </Link>
    </section>
  )
}

export default LastedItemsSection
