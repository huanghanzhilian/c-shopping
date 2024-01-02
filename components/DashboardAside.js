import Link from 'next/link'

import { Icons, BoxLink, Logout, LogoH } from 'components'

export default function ProfileAside() {
  const profilePaths = [
    {
      name: '商品新增',
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: '商品管理',
      Icon: Icons.Save,
      path: '/admin/products',
    },
    {
      name: '订单管理',
      Icon: Icons.Bag,
      path: '/admin/orders',
    },
    {
      name: '分类管理',
      Icon: Icons.Category,
      path: '/admin/categories',
    },
    {
      name: '分类规格',
      Icon: Icons.Location,
      path: '/admin/details',
    },
    {
      name: '用户管理',
      Icon: Icons.Users,
      path: '/admin/users',
    },
    {
      name: '评论管理',
      Icon: Icons.Comment,
      path: '/admin/reviews',
    },
    {
      name: '滑块管理',
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: '横幅管理',
      Icon: Icons.Image,
      path: '/admin/banners',
    },
  ]

  //? Render(s)
  return (
    <aside className="sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 min-w-max top-6">
      <Link passHref href="/admin">
        <LogoH className="w-40 h-12 mx-auto" />
      </Link>

      <div className="mt-4">
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            <item.Icon className="icon text-black" />
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  )
}
