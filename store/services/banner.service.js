import apiSlice from './api'

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBanners: builder.query({
      query: ({ category }) => ({
        url: `/api/banner?category=${category}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result?.data.map(({ _id }) => ({
                type: 'Banner',
                id: _id,
              })),
              'Banner',
            ]
          : ['Banner'],
    }),

    getSingleBanner: builder.query({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    updateBanner: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/banner/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Banner', id: arg.id }],
    }),

    createBanner: builder.mutation({
      query: ({ body }) => ({
        url: '/api/banner',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Banner'],
    }),

    deleteBanner: builder.mutation({
      query: ({ id }) => ({
        url: `/api/banner/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Banner'],
    }),
  }),
})

export const {
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannersQuery,
} = bannerApiSlice
