import { Metadata } from 'next'

export const metadata = {
  title: 'My Page Title',
}

import { usersRepo } from '@/helpers'

export default async function Home({ searchParams }) {
  const query = searchParams.query || ''
  const currentPage = searchParams.page || 1
  const users = await usersRepo.getAll()
  return (
    <main>
      <div>Hello World</div>
      <div>query: {query}</div>
      <div>currentPage: {currentPage}</div>
      {users?.length &&
        users.map(user => (
          <div key={user.id}>
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.role}</div>
          </div>
        ))}
    </main>
  )
}
