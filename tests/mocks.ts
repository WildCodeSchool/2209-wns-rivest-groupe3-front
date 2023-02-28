import { MockedResponse } from '@apollo/client/testing'
import {
  CREATE_BLOG,
  GET_ALL_BLOGS,
  GET_ALL_BLOGS_FOR_DISCOVER,
  GET_ONE_BLOG,
} from '../src/queries/blogs'
import { GET_USER } from '../src/queries/user'

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
]
