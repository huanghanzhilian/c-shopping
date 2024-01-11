'use client'

import { useEffect, useState } from 'react'

import { sorts } from 'utils'

import { Icons, Modal } from 'components'

import { useUrlQuery, useDisclosure } from '@/hooks'

const Sort = ({ handleChangeRoute }) => {
  //? Assets
  const [isSort, sortHandlers] = useDisclosure()
  const query = useUrlQuery()

  //? State
  const [sort, setSort] = useState(sorts[0])

  //? Handlers
  const handleSortChange = item => {
    setSort(sorts[item.value - 1])
    handleChangeRoute({ sort: item.value })
    sortHandlers.close()
  }

  useEffect(() => {
    if (query.sort) {
      setSort(sorts[+query.sort - 1])
    } else {
      setSort(sorts[0])
    }
  }, [query])

  useEffect(() => {
    setSort(sorts[0])
  }, [query.category])

  //? Render(s)
  return (
    <>
      <div className="xl:hidden">
        <button type="button" className="flex items-center gap-x-1" onClick={sortHandlers.open}>
          <Icons.Sort className="w-6 h-6 icon" />
          <span>{sort?.name}</span>
        </button>

        <Modal isShow={isSort} onClose={sortHandlers.close} effect="bottom-to-top">
          <Modal.Content
            onClose={sortHandlers.close}
            className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
          >
            <Modal.Header onClose={sortHandlers.close}>排序</Modal.Header>
            <Modal.Body>
              <div className="divide-y">
                {sorts.map((item, i) => (
                  <div key={i} className="flex items-center">
                    <button
                      className="block w-full py-3 text-right text-gray-700"
                      type="button"
                      name="sort"
                      onClick={() => handleSortChange(item)}
                    >
                      {item.name}
                    </button>
                    {sort?.value === item.value && <Icons.Check className="icon" />}
                  </div>
                ))}
              </div>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </div>
      <div className="hidden xl:flex xl:gap-x-4 xl:items-center ">
        <div className="flex items-center gap-x-1">
          <Icons.Sort className="icon " />
          <span>排序：</span>
        </div>
        {sorts.map((item, i) => (
          <button
            key={i}
            className={`py-0.5  text-sm ${
              sort?.value === item.value ? 'text-red-500' : 'text-gray-600'
            }`}
            type="button"
            name="sort"
            onClick={() => handleSortChange(item)}
          >
            {item.name}
          </button>
        ))}
      </div>
    </>
  )
}

export default Sort
