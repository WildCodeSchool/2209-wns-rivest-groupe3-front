// Keep React import to avoid TS issue
import React from 'react'
import { assert, describe, it, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WrappedContextProvider } from './WrappedContextProvider'

import Home from '../src/routes/home'
import Discover from '../src/routes/discover'
import ListingBlogs from '../src/routes/blogs/ListingBlogs'
import Articles from '../src/routes/articles'
import Profile from '../src/routes/profile'
import Register from '../src/routes/register'
import Login from '../src/routes/login'
import CreateBlog from '../src/routes/createblog'
import NotFound from '../src/routes/notFound'

describe('Test display of the Routes pages', () => {
  it('should render Home component', async () => {
    render(<WrappedContextProvider children={<Home />} />)
    expect(
      await screen.findByText('Raconte nous tes aventures !')
    ).toBeInTheDocument()
  })

  it('should render Discover component', async () => {
    render(<WrappedContextProvider children={<Discover />} />)
    expect(
      await screen.findByText('Blogs les plus récents')
    ).toBeInTheDocument()
  })

  it('should render Linsting blogs Page', async () => {
    render(<WrappedContextProvider children={<ListingBlogs />} />)
    expect(await screen.findByText('Blogs')).toBeInTheDocument()
  })

  it('should render Article Page', async () => {
    render(<WrappedContextProvider children={<Articles />} />)
    expect(await screen.findByText('Articles')).toBeInTheDocument()
  })

  it('should render Profile page', async () => {
    render(<WrappedContextProvider children={<Profile />} />)
    expect(await screen.findByText('Profil')).toBeInTheDocument()
  })

  // it('should render User settings page', async () => {
  //   render(<WrappedContextProvider children={<UserSettings />} />)
  //   expect(
  //     await screen.findByText("Erreur lors de la récupération de l'utilisateur")
  //   ).toBeInTheDocument()
  // })

  it('should render Register page', async () => {
    render(<WrappedContextProvider children={<Register />} />)
    expect(
      await screen.findByText('Créez votre compte maintenant !')
    ).toBeInTheDocument()
  })

  it('should render Login page', async () => {
    render(<WrappedContextProvider children={<Login />} />)
    expect(
      await screen.findByText(
        /Bienvenue sur notre application ! Pour accéder à toutes les fonctionnalités, veuillez vous connecter en utilisant vos identifiants de connexion. Si vous n'avez pas encore de compte, vous pouvez en créer un en cliquant sur le bouton "Inscription" en haut à droite de la page. Nous espérons que vous apprécierez votre expérience sur notre application !/i
      )
    ).toBeInTheDocument()
  })

  it('should render Create blog page', async () => {
    render(<WrappedContextProvider children={<CreateBlog />} />)
    expect(
      await screen.findByText("Je m'enregistre ou crée mon compte")
    ).toBeInTheDocument()
  })

  it('should render 404 page', async () => {
    render(<WrappedContextProvider children={<NotFound />} />)
    expect(await screen.findByText('404 not found')).toBeInTheDocument()
  })
})
