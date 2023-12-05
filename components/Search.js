import { Icons } from 'components'

export default function Search() {
  //? Render(s)
  return (
    <>
      <div className="flex flex-row flex-grow max-w-3xl rounded-md bg-zinc-200/80 ">
        <input
          disabled={true}
          type="text"
          placeholder="搜索"
          className="flex-grow p-1 text-right bg-transparent outline-none cursor-pointer input"
        />
        <button className="p-2">
          <Icons.Search className="icon text-gray-400" />
        </button>
      </div>
    </>
  )
}
