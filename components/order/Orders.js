'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

import { useGetOrdersQuery } from '@/store/services'

import { formatNumber } from 'utils'

import { ArrowLink, Skeleton } from 'components'

export default function Orders() {
  //? States
  const [pendingOrder, setPendingOrder] = useState(0)
  const [successOrder, setSuccessOrder] = useState(0)

  //? Get Order Query
  const { data, isLoading } = useGetOrdersQuery({ page: 1, pageSize: 100 })

  //? Handle Get Order Response
  useEffect(() => {
    if (data) {
      const pending = data?.data?.orders.filter(item => item.delivered === false)
      const success = data?.data?.orders.filter(item => item.delivered === true)

      setPendingOrder(pending.length)
      setSuccessOrder(success.length)
    }
  }, [data])

  //? Local Components
  const StatusSkeleton = () => (
    <Skeleton.Item
      animated="background"
      height=" h-16 lg:h-14"
      width="w-12 lg:w-28"
      className="rounded-sm"
    />
  )

  //? Render(s)
  return (
    <section>
      <div className="py-6 lg:py-0">
        <div className="flex justify-between px-5 mb-7">
          <h4 className="inline-block py-1 text-sm border-b-2 border-red-500 md:text-base">
            我的订单
          </h4>
          <ArrowLink path="profile/orders">查看全部</ArrowLink>
        </div>
        <div className="flex justify-evenly lg:py-20">
          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image src="/icons/status-processing.svg" fill alt="当前订单" />
                <span className="absolute order-badge">{formatNumber(pendingOrder)}</span>
              </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">
                  {formatNumber(pendingOrder)} 条记录
                </span>
                <span className="text-xs lg:text-sm">当前订单</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image src="/icons/status-delivered.svg" fill alt="成功订单" />
                <span className="absolute order-badge">{formatNumber(successOrder)}</span>
              </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">
                  {formatNumber(successOrder)} 条记录
                </span>
                <span className="text-xs lg:text-sm">成功订单</span>
              </div>
            </div>
          )}

          <div className="section-divide-x" />

          {isLoading ? (
            <StatusSkeleton />
          ) : (
            <div className="flex flex-col items-center lg:flex-row lg:gap-x-2">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14">
                <Image src="/icons/status-returned.svg" fill alt="退款订单" />
                <span className="absolute order-badge">0</span>
              </div>
              <div className="text-gray-700">
                <span className="hidden lg:block lg:text-black lg:text-md">0 条记录</span>
                <span className="text-xs lg:text-sm">退款订单</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="section-divide-y" />
    </section>
  )
}
