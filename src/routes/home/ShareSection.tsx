import React, { useEffect, useState } from 'react'

interface Avatar {
  id: number
  size: string
  position: string
  imgUrl: string
}

const ShareSection: React.FC = () => {
  const [avatars, setAvatars] = useState<Avatar[]>([])

  const generateAvatars = () => {
    const avatarSizes = ['w-16', 'w-24', 'w-32']
    const positions = [
      'top-[10%] left-1/4',
      'top-[10%] right-1/4',
      'top-[40%] xl:top-[30%] left-[10%] hidden lg:flex',
      'top-[40%] xl:top-[30%] right-[10%] hidden lg:flex',
      'top-[60%] left-1/4 hidden lg:flex',
      'top-[50%] right-1/4 hidden lg:flex',
      'top-[70%] left-[10%]',
      'top-[80%] left-[40%]',
      'top-[80%] left-[60%]',
      'top-[70%] left-[85%]',
    ]
    const newAvatars: Avatar[] = []

    for (let i = 0; i < 10; i++) {
      newAvatars.push({
        id: i,
        size: avatarSizes[Math.floor(Math.random() * avatarSizes.length)],
        position: positions[i],
        imgUrl: `https://randomuser.me/api/portraits/${
          i % 2 ? 'men' : 'women'
        }/${Math.floor(Math.random() * 100)}.jpg`,
      })
    }

    setAvatars(newAvatars)
  }

  useEffect(() => {
    generateAvatars()
  }, [])

  return (
    <section className="group/share flex flex-col justify-center items-center h-screen gap-8 px-2 py-8">
      <h1 className="text-3xl md:text-5xl font-lobster font-bold text-center bg-white/50 z-10">
        Toi aussi rejoins la communauté d’aventuriers Tabasblog
      </h1>
      <div className="h-px w-0 group-hover/share:w-full max-w-sm bg-neutral transition-all duration-1000 hidden md:flex" />
      <div className="flex md:hidden justify-center gap-4">
        {avatars.slice(0, 4).map((avatar, index) => (
          <img
            key={avatar.id}
            className={`opacity-100 w-16 rounded-full`}
            src={avatar.imgUrl}
            alt="avatar"
            style={{ transitionDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      <p className="text-center text-xl md:text-3xl max-w-md bg-white/50 z-10">
        Rends ton blog visible via les réseaux sociaux. Les autres utilisateurs
        pourront te laisser des commentaires.
      </p>
      <button className="btn btn-secondary">Creer mon blog</button>
      <div className="w-full hidden md:flex absolute min-h-screen">
        {avatars.map((avatar, index) => (
          <img
            key={avatar.id}
            className={`absolute opacity-0 group-hover/share:opacity-100 transform-gpu transition-opacity duration-500 ease-in-out ${avatar.position} ${avatar.size} rounded-full`}
            src={avatar.imgUrl}
            alt="avatar"
            style={{ transitionDelay: `${index * 100}ms` }}
          />
        ))}
        <img
          src="/texture-1.png"
          className="absolute left-0 bottom-0 w-full max-w-4xl opacity-50"
        />
      </div>
    </section>
  )
}

export default ShareSection
