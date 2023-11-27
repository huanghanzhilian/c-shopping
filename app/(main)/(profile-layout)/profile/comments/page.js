import Image from "next/image";
import { BackButton } from "components";

export default function Comments() {
  return (
    <div>
      <BackButton>视图</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/order-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>视图列表为空</p>
      </div>
    </div>
  );
}
