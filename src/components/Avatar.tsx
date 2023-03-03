const Avatar = ({
  imgUrl,
  width = 'w-96',
}: {
  imgUrl: string | null | undefined
  width?: string
}) => {
  const url = `http://localhost:8000${imgUrl}`
  return (
    <figure className={`${width} aspect-square rounded-full overflow-hidden flex justify-center items-center border border-white`}>
      {imgUrl ? (
        <img
          src={url}
          alt="blog cover"
          className="object-cover min-w-full min-h-full"
          width="400"
          height="400"
        />
      ) : (
        <img
          src="https://ocsheriff.gov/sites/ocsd/files/styles/square_270/public/2022-05/John%20Doe_icon.png?h=8a7fc05e&itok=Gv2mcIrT"
          className="object-cover min-w-full min-h-full"
          width="400"
          height="400"
        />
      )}
    </figure>
  )
}

export default Avatar
