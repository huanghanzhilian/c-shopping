import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "components";

export default function BoxLink({ children, path, name }) {
  const router = useRouter();

  return (
    <div
      className={`transition-colors hover:bg-gray-200 px-3 ${
        router.asPath === path && "border-r-4 border-red-600"
      }`}
    >
      <Link href={path}>
        <span className='flex justify-between mx-4 py-4 gap-x-2 border-t border-gray-300'>
          {children}
          <span className='ml-auto mr-3'>{name}</span>
          <Icons.ArrowLeft className='icon' />
        </span>
      </Link>
    </div>
  );
}
