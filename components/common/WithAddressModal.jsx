import React from 'react'

import { AddressModal } from 'components'

import { useDisclosure, useUserInfo } from 'hooks'

const WithAddressModal = props => {
  const { children } = props

  const [isShowAddressModal, addressModalHandlers] = useDisclosure()

  const { userInfo, isVerify, isLoading } = useUserInfo()

  const addressModalProps = {
    openAddressModal: addressModalHandlers.open,
    address: userInfo?.address ?? {},
    isLoading,
    isVerify,
    isAddress: !!userInfo?.address,
  }

  return (
    <>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              addressModalProps,
            })
          : child
      )}

      {!isVerify ? null : !isLoading ? (
        <AddressModal
          isShow={isShowAddressModal}
          onClose={addressModalHandlers.close}
          address={userInfo?.address ?? {}}
        />
      ) : null}
    </>
  )
}

export default WithAddressModal
