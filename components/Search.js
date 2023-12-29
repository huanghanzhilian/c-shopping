import { useDisclosure } from '@/hooks'
import { Icons, SearchModal } from 'components'

export default function Search() {
  //? Assets
  const [isShowSearchModal, searchModalHanlders] = useDisclosure()

  //? Render(s)
  return (
    <>
      <SearchModal isShow={isShowSearchModal} onClose={searchModalHanlders.close} />
      <div
        onClick={searchModalHanlders.open}
        className="flex flex-row flex-grow max-w-3xl rounded-md bg-zinc-200/80"
      >
        {/* <input
          disabled={true}
          type="text"
          placeholder="搜索"
          className="flex-grow p-1 text-right bg-transparent outline-none cursor-pointer input"
        /> */}
        <button className="flex-grow py-1 px-3 text-left bg-transparent outline-none cursor-pointer text-gray-400 focus:border-none">
          善假于物，用好搜索...
        </button>
        <button className="p-2">
          <Icons.Search className="icon text-gray-400" />
        </button>
      </div>
    </>
  )
}
