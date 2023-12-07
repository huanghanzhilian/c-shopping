import apiSlice from './api'

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCategories: builder.query({
      query: () => ({
        url: '/api/category',
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result?.data?.categories.map(({ _id }) => ({
                type: 'Category',
                id: _id,
              })),
              'Category',
            ]
          : ['Category'],
    }),

    getSingleCategory: builder.query({
      query: ({ id }) => ({
        url: `/api/category/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
    }),

    updateCategory: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/category/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
    }),

    createCategory: builder.mutation({
      query: ({ body }) => ({
        url: '/api/category',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Category'],
    }),
  }),
})

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} = categoryApiSlice
