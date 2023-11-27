import Image from "next/image";
import Link from "next/link";
import { Icons, User, Cart, Search } from "components";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const dispatch = useDispatch();

  //? Store
  const { user } = useSelector((state) => state.auth);

  return (
    <header className='px-4 lg:shadow'>
      <div className='container max-w-[1550px] lg:flex lg:py-2 '>
        <div className='inline-flex justify-between w-full items-center border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
          <button className='p-1 lg:hidden'>
            <Icons.Bars className='icon' />
          </button>
          <div className='relative w-24 h-14 '>
            <Link passHref href='/'>
              <span>
                <Image src='/images/logo.svg' layout='fill' />
              </span>
            </Link>
          </div>
          <Icons.Question className='icon lg:hidden' />
        </div>
        <div className='inline-flex gap-x-10 justify-between py-2 w-full items-center border-b lg:border-b-0'>
          <Search />
          <div className='inline-flex items-center gap-x-4 '>
            <User user={user} dispatch={dispatch} />
            <span className='hiden lg:block lg:border lg:border-gray-300 lg:h-6'></span>
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}
