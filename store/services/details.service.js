import apiSlice from './api'

export const detailsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDetails: builder.query({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Details', id: arg.id }],
    }),

    deleteDetails: builder.mutation({
      query: ({ id }) => ({
        url: `/api/details/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Details'],
    }),

    createDetails: builder.mutation({
      query: ({ body }) => ({
        url: '/api/details',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Details'],
    }),

    updateDetails: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/details/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: result => [{ type: 'Details', id: result?.category_id }],
    }),
  }),
})

export const {
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useCreateDetailsMutation,
  useUpdateDetailsMutation,
} = detailsApiSlice
