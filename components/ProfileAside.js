import Image from "next/image";
import Link from "next/link";

import { Icons, BoxLink, Logout, Orders } from "components";

export default function ProfileAside({user}) {
  const profilePaths = [
    {
      name: "订单",
      icon: <Icons.Bag className='icon text-black' />,
      path: "/profile/orders",
    },
    {
      name: "我的列表",
      icon: <Icons.Heart className='icon text-black' />,
      path: "/profile/lists",
    },
    {
      name: "视图",
      icon: <Icons.Comment className='icon text-black' />,
      path: "/profile/comments",
    },
    {
      name: "地址",
      icon: <Icons.Location className='icon text-black' />,
      path: "/profile/addresses",
    },
    {
      name: "最近访问",
      icon: <Icons.Clock className='icon text-black' />,
      path: "/profile/user-history",
    },
    {
      name: "用户帐户信息",
      icon: <Icons.User className='icon text-black' />,
      path: "/profile/personal-info",
    },
  ];

  if (!user) return null;

  return (
    <aside className='mt-6 lg:border lg:border-gray-200 lg:rounded-md lg:py-4'>
      <div className='px-5 py-2 flex justify-between items-center '>
        <div className='relative w-12 h-12'>
          <Image src='/images/person.svg' layout='fill' />
        </div>
        <span className='ml-auto mr-2 font-bold '>{user.name}</span>
        <Link href='/profile/personal-info'>
          <span>
            <Icons.Edit className='text-blue-400 w-6 h-6' />
          </span>
        </Link>
      </div>

      <div className='lg:hidden'>
        <Orders />
      </div>

      <div className='mt-7'>
        <div className='hidden lg:block'>
          <BoxLink name='活动步骤' path='/profile'>
            <Icons.Home className='icon text-black' />
          </BoxLink>
        </div>
        {profilePaths.map((item, index) => (
          <BoxLink key={index} path={item.path} name={item.name}>
            {item.icon}
          </BoxLink>
        ))}
        <Logout />
      </div>
    </aside>
  );
}
