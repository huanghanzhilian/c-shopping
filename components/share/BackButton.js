import { useRouter } from "next/navigation";

import { Icons } from "components";

export default function BackButton({ children }) {
  const router = useRouter();
  return (
    <div className='flex items-center gap-x-1 pb-4 px-5'>
      <button className='lg:hidden' type='button' onClick={() => router.push('/profile')}>
        <Icons.ArrowRight className='icon' />
      </button>
      <span>{children}</span>
    </div>
  );
}
