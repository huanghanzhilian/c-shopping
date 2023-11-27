import { BackButton } from "components";
import Image from "next/image";

export default function UserHistory() {
  return (
    <div>
      <BackButton>历史</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/empty-cart.svg' layout='fill' />
        </div>

        <p className='text-center'>历史记录为空</p>
      </div>
    </div>)
  }
  