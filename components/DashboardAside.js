import Link from 'next/link'

import { Icons, BoxLink, Logout, Logo } from 'components'

export default function ProfileAside() {
  const profilePaths = [
    {
      name: '新增商品',
      Icon: Icons.Plus,
      path: '/admin/products/create',
    },
    {
      name: '管理商品',
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
      name: '滑块',
      Icon: Icons.Slider,
      path: '/admin/sliders',
    },
    {
      name: '横幅',
      Icon: Icons.Image,
      path: '/admin/banners',
    },
  ]

  //? Render(s)
  return (
    <aside className="sticky mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:pt-4 min-w-max top-6">
      <Link passHref href="/admin">
        {/* <Logo className="w-40 h-12 mx-auto" /> */}
        <div className="w-40 h-12 mx-auto bg-red-200"></div>
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
