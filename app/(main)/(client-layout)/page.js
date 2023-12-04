import Link from 'next/link'

import { usersRepo } from '@/helpers'

export default async function Home() {
  const users = await usersRepo.getAll()
  return (
    <main>
      <div>Hello World</div>
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
