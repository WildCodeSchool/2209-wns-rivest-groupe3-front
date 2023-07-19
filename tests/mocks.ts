import { MockedResponse } from '@apollo/client/testing'
import {
  CREATE_BLOG,
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_FOR_DISCOVER,
  GET_ONE_BLOG,
  GET_ALL_BLOGS_WITH_LIMIT_AND_TOTAL,
  GET_FIRST_BLOGS_AND_ARTICLES,
} from '../src/queries/blogs'

import { GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL } from '../src/queries/articles'

import { GET_TOKEN, GET_USER } from '../src/queries/user'

export const mocks: readonly MockedResponse<Record<string, any>>[] = [
  {
    request: {
      query: CREATE_BLOG,
    },
    result: {
      data: {
        createBlog: [],
      },
    },
  },
  {
    request: {
      query: GET_ALL_BLOGS_FOR_DISCOVER,
    },
    result: {
      data: {
        getAllBlogs: [],
      },
    },
  },
  {
    request: {
      query: GET_ALL_BLOGS,
    },
    result: {
      data: {
        getAllBlogs: [],
      },
    },
  },
  {
    request: {
      query: GET_ONE_BLOG,
    },
    result: {
      data: {
        getBlog: [],
      },
    },
  },
  {
    request: {
      query: GET_USER,
    },
    result: {
      data: {
        getOneUser: {},
      },
    },
  },
  {
    request: {
      query: GET_ALL_BLOGS_WITH_LIMIT_AND_TOTAL,
      variables: {
        limit: 6,
        offset: 0,
      },
    },
    result: {
      data: {
        getAllBlogs: [],
        getNumberOfBlogs: 10,
      },
    },
  },
  {
    request: {
      query: GET_ALL_ARTICLES_WITH_LIMIT_AND_TOTAL,
      variables: {
        limit: 6,
        offset: 0,
      },
    },
    result: {
      data: {
        getAllArticles: [],
        getNumberOfArticles: 10,
      },
    },
  },
  {
    request: {
      query: GET_FIRST_BLOGS_AND_ARTICLES,
      variables: {
        limit: 4,
      },
    },
    result: {
      data: {
        getAllBlogs: [],
        getAllArticles: [],
      },
    },
  },
]
