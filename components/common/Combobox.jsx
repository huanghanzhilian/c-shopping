import { Fragment, useState } from 'react'

import { Combobox as HUICombobox, Transition } from '@headlessui/react'

import { HiCheck, HiChevronDown } from 'react-icons/hi'

import { Control, useController } from 'react-hook-form'

const Combobox = props => {
  //? Props
  const { list, name, control, placeholder } = props

  //? Form Hook
  const { field } = useController({ name, control })

  //? States
  const [query, setQuery] = useState('')

  //? Handlers
  const filteredList =
    query === ''
      ? list
      : list.filter(item => {
          return item.name.toLowerCase().includes(query.toLowerCase())
        })

  //? Render(s)
  return (
    <HUICombobox value={field.value} name={field.name} onChange={field.onChange}>
      <div className="relative max-w-xl">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <HUICombobox.Input
            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 outline-none text-gray-900 focus:ring-0"
            displayValue={item => item.name}
            onChange={event => setQuery(event.target.value)}
            placeholder={placeholder}
            autoComplete="off"
          />
          <HUICombobox.Button className="absolute inset-y-0 right-0 flex-center px-2">
            <HiChevronDown className="icon" aria-hidden="true" />
          </HUICombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery('')}
        >
          <HUICombobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg border border-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            {filteredList.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                未找到任何项目!
              </div>
            ) : (
              filteredList.map(item => (
                <HUICombobox.Option
                  key={item.code}
                  className={`relative cursor-pointer transition-colors select-none py-3 pl-10 pr-4 hover:bg-teal-100 text-white
                  ${field.value?.code === item.code ? 'bg-teal-50' : ''}
                  `}
                  value={item}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={`block truncate lg:text-sm ${
                          field.value?.code === item.code ? 'font-semibold' : 'font-normal'
                        }`}
                      >
                        {item.name}
                      </span>
                      {field.value?.code === item.code ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex-center pl-3  ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <HiCheck className="text-teal-600 icon" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </HUICombobox.Option>
              ))
            )}
          </HUICombobox.Options>
        </Transition>
      </div>
    </HUICombobox>
  )
}

export default Combobox
