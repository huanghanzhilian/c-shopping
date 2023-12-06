import Link from 'next/link'
import { Fragment } from 'react'

import { Menu, Transition } from '@headlessui/react'

import { Icons, Logout, Person } from 'components'

export default function UserDropdown(props) {
  //? Props
  const { name } = props

  //? Render(s)
  return (
    <Menu as="div" className="dropdown">
      <Menu.Button className="dropdown__button">
        <Icons.User className="icon" />
        <Icons.ArrowDown className="icon" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-56 dropdown__items">
          <Menu.Item>
            <div className=" transition-colors hover:bg-gray-100">
              <Link
                href="/profile"
                className="px-7 py-4 flex justify-between items-center text-xs font-medium text-gray-700 flex-center gap-x-1 md:text-sm"
              >
                <Person className="w-6 h-6" />
                <span className="text-gray-700 flex-auto ml-3">{name}</span>
                <Icons.ArrowRight2 className="text-gray-700 icon" />
              </Link>
            </div>
          </Menu.Item>

          <Logout />
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
