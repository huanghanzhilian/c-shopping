import { Icons } from "components";
export default function Search() {
  return (
    <form className='flex-grow flex flex-row-reverse max-w-3xl rounded-md  bg-zinc-200/80'>
      <input
        type='text'
        placeholder='搜索'
        className='text-right outline-none bg-transparent p-1 flex-grow '
      />
      <button className='p-2'>
        <Icons.Search className='icon' />
      </button>
    </form>
  );
}
