'use client'

import { FavoritesListEmpty, PageContainer, ProfileLayout } from 'components'
import { useTitle } from '@/hooks'

const Lists = () => {
  useTitle('我的收藏')
  //? Render(s)
  return (
    <main>
      <PageContainer title="我的收藏">
        <section className="py-20">
          <FavoritesListEmpty className="mx-auto h-52 w-52" />
          <p className="text-center">您的收藏夹列表为空</p>
          <span className="block my-3 text-base text-center text-amber-500">（即将上线）</span>
        </section>
      </PageContainer>
    </main>
  )
}

export default Lists
