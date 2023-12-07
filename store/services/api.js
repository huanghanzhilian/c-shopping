import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) headers.set('authorization', token)
      return headers
    },
  }),
  tagTypes: ['User', 'Category'],
  endpoints: builder => ({}),
})

export default apiSlice
