// Keep React import to avoid TS issue
import React from 'react'
import { assert, describe, it, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WrappedContextProvider } from './WrappedContextProvider'

import Home from '../src/routes/home'
import Discover from '../src/routes/discover'
// import ListingBlogs from '../src/routes/blogs/ListingBlogs'
import Articles from '../src/routes/articles'
import Profile from '../src/routes/profile'
import UserSettings from '../src/routes/userSettings'
import UserInformations from '../src/components/userSettings/UserInformations'

describe('Test display of the Routes pages', () => {
  it('should render Home component', async () => {
    render(<WrappedContextProvider children={<Home />} />)
    expect(await screen.findByText('Loading...')).toBeInTheDocument()
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

  // it('should render Linsting blogs Page', async () => {
  //   render(<WrappedContextProvider children={<ListingBlogs />} />)
  //   expect(await screen.findByText('Blogs')).toBeInTheDocument()
  // })

  it('should render Article Page', async () => {
    render(<WrappedContextProvider children={<Articles />} />)
    expect(await screen.findByText('Articles')).toBeInTheDocument()
  })

  it('should render User settings page', async () => {
    render(<WrappedContextProvider children={<UserSettings />} />)
    expect(await screen.findByText('Chargement...')).toBeInTheDocument()
  })

  // it('should render User settings main component', async () => {
  //   render(<WrappedContextProvider children={<UserInformations />} />)
  //   expect(await screen.findByText('Mes informations')).toBeInTheDocument()
  // })

  it('should render Profile page', async () => {
    render(<WrappedContextProvider children={<Profile />} />)
    expect(await screen.findByText('Chargement...')).toBeInTheDocument()
    expect(await screen.findByText('Profil')).toBeInTheDocument()
  })
})
