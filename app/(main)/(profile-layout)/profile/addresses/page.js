import { BackButton } from "components";
import Image from "next/image";

export default function Addresses() {
  return (
    <div>
      <BackButton>地址</BackButton>
      <div className='section-divide-y' />

      <div className='py-20'>
        <div className='relative h-52 w-52 mx-auto'>
          <Image src='/images/address.svg' layout='fill' />
        </div>

        <p className='text-center'>地址列表为空</p>
      </div>
    </div>
  );
}
