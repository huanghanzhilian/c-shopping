'use client'

import { DashboardAside } from '@/components'
import { useTitle } from '@/hooks'
import { siteTitle } from '@/utils'
import Image from 'next/image'

const AdminPage = () => {
  useTitle(`${siteTitle}-管理中心`)
  return (
    <>
      <div className="lg:hidden">
        <DashboardAside />
      </div>
      <section className="hidden py-20 lg:block">
        <Image
          src="/icons/chart.png"
          alt="图表"
          width={208}
          height={208}
          className="mx-auto mb-8"
        />

        <p className="text-center">情况分析</p>
        <span className="block my-3 text-base text-center text-amber-500">(开发中)</span>
      </section>
    </>
  )
}

export default AdminPage
