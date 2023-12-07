import { Metadata } from 'next'

export const metadata = {
  title: '首页',
}

export default async function Home({ searchParams }) {
  const query = searchParams.query || ''
  const currentPage = searchParams.page || 1
  return (
    <main className="xl:mt-28 container">
      <div>Hello World</div>
      <div>query: {query}</div>
      <div>currentPage: {currentPage}</div>
    </main>
  )
}
