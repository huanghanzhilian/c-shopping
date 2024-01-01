'use client'

import { useTitle } from '@/hooks'
import { Icons, UserMobileModal, UserNameModal, PageContainer, Skeleton } from 'components'

import { useUserInfo, useDisclosure } from 'hooks'

const PersonalInfo = () => {
  useTitle('账户信息')
  //? Assets
  const [isShowNameModal, nameModalHandlers] = useDisclosure()
  const [isShowPhoneModal, phoneModalHandlers] = useDisclosure()

  //? Get User Data
  const { userInfo, isLoading } = useUserInfo()

  //? Local Component
  const InfoField = ({ label, info, editHandler, isLoading }) => (
    <div className="flex-1 px-5">
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div>
          <span className="text-xs text-gray-700">{label}</span>
          {isLoading ? (
            <Skeleton.Item animated="background" height="h-5" width="w-44" />
          ) : (
            <p className="h-5 text-sm">{info}</p>
          )}
        </div>
        {isLoading ? null : info ? (
          <Icons.Edit className="cursor-pointer icon" onClick={editHandler} />
        ) : (
          <Icons.Plus className="cursor-pointer icon" onClick={editHandler} />
        )}
      </div>
    </div>
  )

  //? Render(s)
  return (
    <>
      {!isLoading && userInfo && (
        <>
          <UserNameModal
            isShow={isShowNameModal}
            onClose={nameModalHandlers.close}
            editedData={userInfo.name}
          />
          <UserMobileModal
            isShow={isShowPhoneModal}
            onClose={phoneModalHandlers.close}
            editedData={userInfo.mobile}
          />
        </>
      )}

      <main>
        <PageContainer title="帐户信息">
          <section className="lg:flex">
            <InfoField
              label="名字和姓氏"
              info={userInfo?.name}
              editHandler={nameModalHandlers.open}
              isLoading={isLoading}
            />
            <InfoField
              label="电话号码"
              info={userInfo?.mobile}
              editHandler={phoneModalHandlers.open}
              isLoading={isLoading}
            />
          </section>
        </PageContainer>
      </main>
    </>
  )
}

export default PersonalInfo
