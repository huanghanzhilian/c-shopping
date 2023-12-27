import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { nameSchema } from 'utils'

import { useEditUserMutation } from '@/store/services'

import { TextField, SubmitModalBtn, Modal, HandleResponse } from 'components'

const UserNameModal = props => {
  //? Props
  const { isShow, onClose, editedData } = props

  //? Edit User Query
  const [editUser, { data, isSuccess, isLoading, isError, error }] = useEditUserMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(nameSchema),
    defaultValues: { name: editedData ? editedData : '' },
  })

  //? Handlers
  const submitHander = ({ name }) =>
    editUser({
      body: { name },
    })

  //? Render(s)
  return (
    <>
      {/* Handle Edit User Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.message}
          message={data?.message}
          onSuccess={onClose}
        />
      )}
      <Modal isShow={isShow} onClose={onClose} effect="bottom-to-top">
        <Modal.Content
          onClose={onClose}
          className="flex flex-col h-full px-5 py-3 bg-white md:rounded-lg gap-y-5 "
        >
          <Modal.Header onClose={onClose}>身份信息的注册和编辑</Modal.Header>
          <Modal.Body>
            <p className="text-sm">请输入身份信息，包括名字和姓氏</p>

            <form
              className="flex flex-col justify-between flex-1 gap-y-5 "
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label="名字和姓氏"
                control={control}
                errors={formErrors.name}
                name="name"
              />

              <div className="py-3 border-t-2 border-gray-200 lg:pb-0 ">
                <SubmitModalBtn isLoading={isLoading}>登记信息</SubmitModalBtn>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UserNameModal
