import { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { IUserContext } from '../contexts/UserContext'
import { GET_USER } from '../queries/user'

import Card from '../components/Card'
import Avatar from '../components/Avatar'
import { IUser } from '../utils/interfaces/Interfaces'

const PublicProfile = () => {
  const { user } = useContext<IUserContext>(UserContext)

  const navigate = useNavigate()
  const { profileId } = useParams()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { getOneUserId: profileId },
  })

  const onClickProfile = () => {
    navigate('/settings')
  }

  const onClickCreateBlog = () => {
    navigate('/createblog')
  }

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur lors de la récupération de l'utilisateur </p>

  const profile: IUser = data.getOneUser || null

  return (
    profile && (
      <main className="py-16 min-h-screen w-full max-w-screen-2xl mx-auto my-8 flex flex-col items-center gap-8">
        <section className="py-16 bg-gradient-to-r from-primary to-black w-full flex">
          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-8 md:gap-16 lg:gap-24">
            <div className="avatar">
              <Avatar imgUrl={profile.avatar} width="w-80" border="border-8" />
            </div>
            <div className="flex flex-col items-start gap-8 max-w-2xl text-white">
              <h1 className="text-5xl font-bold text-center font-lobster">
                Profil de {profile.nickname}
              </h1>
              <p className="text-xl">
                {profile.description ?? 'Aucune description pour le moment'}
              </p>

              {profileId === user?.id ? (
                <div className="flex flex-col sm:flex-row justify-start w-full gap-4">
                  <button
                    id="create-blog-button"
                    className="btn btn-info hover:!bg-transparent"
                    onClick={() => onClickCreateBlog()}
                  >
                    Créer un blog
                  </button>
                  <button
                    id="edit-profile-button"
                    className="btn btn-info hover:!bg-transparent"
                    onClick={() => onClickProfile()}
                  >
                    Editer mes informations
                  </button>
                </div>
              ) : (
                <button className="btn btn-info">Suivre</button>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 flex flex-col items-center justify-center gap-16">
          <h2 className="text-5xl font-bold text-center">
            Blogs de {profile.nickname} ({profile.blogs.length})
          </h2>
          {profile.blogs.length ? (
            <article className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-16 md:px-2">
              {profile.blogs.map((blog, key) => (
                <Card blog={blog} />
              ))}
            </article>
          ) : (
            <span>Aucun blog pour le moment</span>
          )}
        </section>
      </main>
    )
  )
}

export default PublicProfile
