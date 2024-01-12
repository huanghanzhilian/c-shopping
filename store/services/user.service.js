import apiSlice from './api'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'User',
        'Review',
        'Details',
        'Order',
        'Product',
        'Category',
        'Slider',
        'Banner',
      ],
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: '/api/auth/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        'User',
        'Review',
        'Details',
        'Order',
        'Product',
        'Category',
        'Slider',
        'Banner',
      ],
    }),
    getUsers: builder.query({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.users.map(({ _id }) => ({
                type: 'User',
                id: _id,
              })),
              'User',
            ]
          : ['User'],
    }),

    editUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/user',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, err, arg) => [{ type: 'User', id: arg.body._id }],
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useCreateUserMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useEditUserMutation,
} = userApiSlice
