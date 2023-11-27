import { BackButton } from "components";
import Image from "next/image";

export default function Lists() {
  return (
    <div>
      <BackButton>列表</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/favorites-list-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>收藏列表为空</p>
      </div>
    </div>
  );
}
