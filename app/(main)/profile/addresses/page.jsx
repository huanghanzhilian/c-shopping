'use client'

import { useTitle } from '@/hooks'
import { Address, Icons, PageContainer, Skeleton, WithAddressModal } from 'components'

import { useUserInfo } from 'hooks'

const BasicAddresses = ({ addressModalProps }) => {
  useTitle('地址管理')
  const { isAddress, address, isLoading, openAddressModal } = addressModalProps || {}

  //? Get User Data
  const { userInfo } = useUserInfo()

  //? Render(s)
  return (
    <main>
      <PageContainer title="地址">
        {isLoading ? (
          <section className="flex-1 px-5 ">
            <div className="flex justify-between py-4 border-b border-gray-200">
              <Skeleton.Item animated="background" height="h-5" width="w-52" />
            </div>
            <div className="my-2 space-y-3 text-gray-500">
              <div className="flex items-center gap-x-2 ">
                <Icons.UserLocation className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Post className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Phone className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>

              <div className="flex items-center gap-x-2 ">
                <Icons.User className="text-gray-500 icon" />
                <Skeleton.Item animated="background" height="h-5" width="w-40" />
              </div>
            </div>
          </section>
        ) : isAddress ? (
          <section className="flex-1 px-5 ">
            <div className="flex justify-between py-4 border-b border-gray-200">
              <p className="text-sm">{address?.street}</p>
              <button onClick={openAddressModal}>
                <Icons.Edit className="cursor-pointer icon" />
              </button>
            </div>
            <div className="my-2 space-y-3 text-gray-500">
              <div className="flex items-center gap-x-2 ">
                <Icons.UserLocation className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">
                  {address?.province.name}, {address?.city.name}, {address?.area.name}
                </span>
              </div>
              <div className="flex items-center gap-x-2 ">
                <Icons.Post className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">{address?.postalCode}</span>
              </div>
              {userInfo?.mobile && (
                <div className="flex items-center gap-x-2 ">
                  <Icons.Phone className="text-gray-500 icon" />
                  <span className="text-xs md:text-sm">{userInfo?.mobile}</span>
                </div>
              )}
              <div className="flex items-center gap-x-2 ">
                <Icons.User className="text-gray-500 icon" />
                <span className="text-xs md:text-sm">{userInfo?.name}</span>
              </div>
            </div>
          </section>
        ) : (
          <section className="flex flex-col items-center py-20 gap-y-4">
            <Address className="h-52 w-52" />
            <p>您尚未填写地址</p>
            <button
              className="flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3"
              onClick={openAddressModal}
            >
              <Icons.Location className="text-red-600 icon" />
              <span>地址登记</span>
            </button>
          </section>
        )}
      </PageContainer>
    </main>
  )
}

const Addresses = () => (
  <WithAddressModal>
    <BasicAddresses />
  </WithAddressModal>
)

export default Addresses
