import Image from "next/image";
import { BackButton } from "components";

export default function Orders() {
  return (
    <div>
      <BackButton>命令历史记录</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/order-empty.svg' layout='fill' />
        </div>

        <p className='text-center'>你还没点什么</p>
      </div>
    </div>
  );
}