import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { HiCheck, HiChevronDown } from 'react-icons/hi'

export default function SelectBox(props) {
  //? Props
  const { list, placeholder, onChange, value } = props

  //? Render(s)
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative w-64 mt-1">
        <Listbox.Button className="relative w-full h-8 overflow-hidden text-center bg-white border border-gray-200 rounded-lg cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          {value?.name ? (
            <span className="block truncate">{value.name}</span>
          ) : (
            <span className="block truncate ">{placeholder}</span>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiChevronDown className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-40 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {list?.map((item, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={item}
              >
                <span
                  className={`block truncate ${
                    value?._id === item._id ? 'font-bold' : 'font-normal'
                  }`}
                >
                  {item.name}
                </span>
                {value?._id === item._id ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                    <HiCheck className="w-5 h-5" aria-hidden="true" />
                  </span>
                ) : null}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
