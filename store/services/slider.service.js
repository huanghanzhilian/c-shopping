import apiSlice from './api'

export const sliderApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getSingleSlider: builder.query({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'GET',
      }),
      providesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    getSliders: builder.query({
      query: ({ category }) => ({
        url: `/api/slider?category=${category}`,
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'Slider',
                id: _id,
              })),
              'Slider',
            ]
          : ['Slider'],
    }),

    updateSlider: builder.mutation({
      query: ({ id, body }) => ({
        url: `/api/slider/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'Slider', id: arg.id }],
    }),

    createSlider: builder.mutation({
      query: ({ body }) => ({
        url: '/api/slider',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Slider'],
    }),

    deleteSlider: builder.mutation({
      query: ({ id }) => ({
        url: `/api/slider/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Slider'],
    }),
  }),
})

export const {
  useGetSingleSliderQuery,
  useUpdateSliderMutation,
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSlidersQuery,
} = sliderApiSlice
