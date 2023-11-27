import Link from "next/link";
import { Icons } from "components";
export default function Cart() {
  return (
    <Link href='/cart'>
      <span>
        <Icons.Cart className='icon' />
      </span>
    </Link>
  );
}
