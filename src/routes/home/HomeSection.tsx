interface IProps {
  order: number
  title: string
  content: string
  img: string
}

const HomeSection = ({ order, title, content, img }: IProps) => {
  return (
    <article
      className={`relative group w-full md:h-[54rem] flex flex-col ${
        order % 2 ? 'md:flex-row-reverse bg-primary/10' : 'md:flex-row'
      } md:justify-evenly items-center gap-4 md:gap-8 p-8`}
    >
      {!order && (
        <img
          src="/texture-3.png"
          className="hidden md:flex absolute left-0 bottom-0 w-full opacity-50"
        />
      )}
      {order === 1 && (
        <img
          src="/tache-left.png"
          alt="tâche"
          className="hidden md:flex absolute -left-16 bottom-full translate-y-1/2 text-primary"
        />
      )}
      {order === 2 && (
        <img
          src="/tache-right.png"
          alt="tâche"
          className="hidden md:flex absolute max-w-xl -right-0 top-full -translate-y-1/3 text-primary"
        />
      )}

      <div className="flex flex-col items-start gap-4 md:gap-8 max-w-xl">
        <h2 className="text-3xl md:text-5xl font-bold font-lobster">{title}</h2>
        <div className="h-px w-0 group-hover:w-full max-w-sm bg-neutral transition-all duration-1000" />
        <p className="text-xl md:text-3xl">{content}</p>
      </div>
      <figure className="w-60 md:w-full max-w-sm overflow-x-hidden overflow-y-visible scale-100 group-hover:md:scale-110 group-hover:rotate-3 transition-all duration-1000">
        <img
          src={img}
          alt={title}
          className="w-full"
        />
      </figure>
    </article>
  )
}

export default HomeSection
