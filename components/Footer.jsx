import Image from 'next/image'

import { Icons, Services, LogoChinese, ResponsiveImage } from 'components'
import { siteTitle } from '@/utils'

export default function Footer() {
  return (
    <footer className="pt-4 mt-8 border-t border-gray-200 bg-gray-50">
      <div className="container px-3  space-y-8 mx-auto ">
        {/* Logo & scroll to top */}
        <div className="flex justify-between">
          <div>
            <LogoChinese className="w-32 h-10 mb-6" />
            <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-5">
              <span>我们每周 7 天、每天 24 小时为您解答</span>
              <span className="hidden lg:block bg-gray-300 w-[2px]" />
              <span>支持电话86-1899909999</span>
            </div>
          </div>
          <div className="min-w-max">
            <button
              type="button"
              onClick={() => window.scrollTo(0, 0)}
              className="flex items-center px-3 py-1 border border-gray-300 rounded-md"
            >
              <span className="text-sm ">回到顶部</span>
              <Icons.ArrowUp className="text-gray-400 h-7 w-7" />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <Services />
        </div>

        <div className="space-y-8 lg:flex lg:items-start lg:justify-between">
          {/* socials */}
          <div className="flex items-center justify-between">
            <p className="lg:mr-20">更多联系方式！</p>
            <div className="flex gap-x-5">
              <Icons.Twitter className="w-8 h-8 text-gray-400" />
              <Icons.Linkedin className="w-8 h-8 text-gray-400" />
              <Icons.Instagram className="w-8 h-8 text-gray-400" />
              <Icons.Youtube className="w-8 h-8 text-gray-400" />
            </div>
          </div>

          {/* Newslatter */}
          <div className="flex-1 max-w-lg">
            <form className="flex gap-x-3">
              <input placeholder="你的邮件" className="input" type="email" />
              <button
                type="submit"
                className="px-2 text-white bg-gray-200 rounded-md whitespace-nowrap"
              >
                提交你的邮箱
              </button>
            </form>
          </div>
        </div>

        {/* info */}
        <div className="space-y-6 lg:flex lg:justify-between">
          <div className="space-y-3 lg:max-w-2xl">
            <h5 className="font-semibold text-black">{siteTitle}在线商店，在线评论、选择和购买</h5>
            <p className="text-justify text-gray-700">
              安全的网购需要店铺能够在短时间内为顾客提供多样、优质、价格合理的商品，并有退货保障；
              {siteTitle}。在线商店多年来一直在努力开发的功能，并通过这种方式拥有了固定客户
            </p>
          </div>

          <div className="flex justify-center gap-x-2"></div>
        </div>
      </div>

      <div className="flex items-center justify-center py-3 mt-6 bg-gray-600 gap-x-3">
        <ResponsiveImage
          dimensions="h-16 w-16"
          className="overflow-hidden border-4 border-red-600 rounded-full"
          src="/developer.jpg"
          alt={`黄继鹏（继小鹏）`}
        />
        <p className="text-white">
          <a href="/" target="_blank" className="text-sky-400">
            黄继鹏（继小鹏）
          </a>
          开发{' '}
        </p>
      </div>
    </footer>
  )
}
