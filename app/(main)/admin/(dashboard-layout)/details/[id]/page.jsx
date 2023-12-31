'use client'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { showAlert } from 'store'

import {
  useCreateDetailsMutation,
  useDeleteDetailsMutation,
  useGetDetailsQuery,
  useUpdateDetailsMutation,
} from '@/store/services'

import {
  BigLoading,
  Button,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  DetailsList,
  HandleResponse,
  PageContainer,
} from 'components'
import { Tab } from '@headlessui/react'

import { useAppDispatch, useDisclosure } from 'hooks'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useUrlQuery } from '@/hooks'

const tabListNames = [
  { id: 0, name: '选择类型' },
  { id: 1, name: '属性' },
  { id: 2, name: '规格' },
]

const DetailsContentPage = ({ params: { id } }) => {
  //? Assets
  const { back } = useRouter()
  const query = useUrlQuery()
  const dispatch = useAppDispatch()

  const categoryId = id
  const categoryName = query.category_name

  const initialUpdataInfo = {}

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? States
  const [updateInfo, setUpdateInfo] = useState(initialUpdataInfo)

  const [mode, setMode] = useState('create')

  //? Queries
  //*   Get Details
  const { data: details, isLoading: isLoadingGet } = useGetDetailsQuery({
    id: categoryId,
  })

  //*   Update Details
  const [
    updateDetails,
    {
      data: dataUpdate,
      isSuccess: isSuccessUpdate,
      isError: isErrorUpdate,
      error: errorUpdate,
      isLoading: isLoadingUpdate,
    },
  ] = useUpdateDetailsMutation()

  //*   Create Details
  const [
    createDetails,
    {
      data: dataCreate,
      isSuccess: isSuccessCreate,
      isError: isErrorCreate,
      isLoading: isLoadingCreate,
      error: errorCreate,
    },
  ] = useCreateDetailsMutation()

  //*   Delete Details
  const [
    deleteDetails,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteDetailsMutation()

  //? Hook Form
  const { handleSubmit, register, reset, control } = useForm({
    defaultValues: {
      optionsType: 'none',
      info: [],
      specification: [],
    },
  })

  //? Re-Renders
  useEffect(() => {
    if (details?.data) {
      setMode('edit')
      reset({
        optionsType: details?.data?.optionsType,
        info: details?.data?.info,
        specification: details?.data?.specification,
      })
    }
  }, [details])

  //? Handlers
  //*   Create
  const createHandler = async ({ info, specification, optionsType }) => {
    if (info.length !== 0 && specification.length !== 0) {
      await createDetails({
        body: {
          category_id: categoryId,
          info,
          specification,
          optionsType,
        },
      })
    } else {
      dispatch(
        showAlert({
          status: 'error',
          title: '请输入详细信息和属性',
        })
      )
    }
  }

  //*   Update
  const updateHandler = ({ info, specification, optionsType }) => {
    setUpdateInfo(prev => ({
      ...prev,
      ...details?.data,
      info,
      specification,
      optionsType,
    }))

    confirmUpdateModalHandlers.open()
  }

  const onConfirmUpdate = () => {
    updateDetails({
      id: details?.data?._id,
      body: updateInfo,
    })
  }

  const onCancelUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onSuccessUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  const onErrorUpdate = () => {
    setUpdateInfo(initialUpdataInfo)
    confirmUpdateModalHandlers.close()
  }

  //*   Delete
  const deleteHandler = () => confirmDeleteModalHandlers.open()

  const onConfirmDelete = () => deleteDetails({ id: details?.data?._id })

  const onCancelDelete = () => confirmDeleteModalHandlers.close()

  const onSuccessDelete = () => {
    confirmDeleteModalHandlers.close()
    reset({
      optionsType: 'none',
      info: [],
      specification: [],
    })
    back()
  }

  const onErrorDelete = () => confirmDeleteModalHandlers.close()

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title={`${categoryName}-分类规格`}
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancelDelete}
        onConfirm={onConfirmDelete}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete?.data?.message}
          message={dataDelete?.message}
          onSuccess={onSuccessDelete}
          onError={onErrorDelete}
        />
      )}

      <ConfirmUpdateModal
        title={`${categoryName}-分类规格`}
        isLoading={isLoadingUpdate}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        onCancel={onCancelUpdate}
        onConfirm={onConfirmUpdate}
      />

      {/* Handle Update Response */}
      {(isSuccessUpdate || isErrorUpdate) && (
        <HandleResponse
          isError={isErrorUpdate}
          isSuccess={isSuccessUpdate}
          error={errorUpdate?.data?.message}
          message={dataUpdate?.message}
          onSuccess={onSuccessUpdate}
          onError={onErrorUpdate}
        />
      )}

      {/* Handle Create Details Response  */}
      {(isSuccessCreate || isErrorCreate) && (
        <HandleResponse
          isError={isErrorCreate}
          isSuccess={isSuccessCreate}
          error={errorCreate?.data?.message}
          message={dataCreate?.message}
        />
      )}

      <main>
        {isLoadingGet ? (
          <div className="px-3 py-20">
            <BigLoading />
          </div>
        ) : (
          <PageContainer title={` 品类规格及特点 - ${categoryName ? categoryName : ''}`}>
            <form
              onSubmit={
                mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)
              }
              className="p-3 space-y-6"
            >
              <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-slate-200 p-1">
                  {tabListNames.map(item => (
                    <Tab
                      key={item.id}
                      className={({ selected }) =>
                        `tab
                         ${
                           selected
                             ? 'bg-white shadow'
                             : 'text-blue-400 hover:bg-white/[0.12] hover:text-blue-600'
                         }
                        `
                      }
                    >
                      {item.name}
                    </Tab>
                  ))}
                </Tab.List>

                <Tab.Panels>
                  <Tab.Panel>
                    <div className="space-y-3">
                      <p className="mb-2">选择类型：</p>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="none"
                          value="none"
                          className="ml-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="none">默认</label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="colors"
                          value="colors"
                          className="ml-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="colors">根据颜色</label>
                      </div>
                      <div className="flex items-center gap-x-1">
                        <input
                          type="radio"
                          id="sizes"
                          value="sizes"
                          className="ml-1"
                          {...register('optionsType')}
                        />
                        <label htmlFor="sizes">根据尺寸</label>
                      </div>
                    </div>
                  </Tab.Panel>

                  <Tab.Panel>
                    <DetailsList
                      name="info"
                      control={control}
                      register={register}
                      categoryName={categoryName}
                    />
                  </Tab.Panel>
                  <Tab.Panel>
                    <DetailsList
                      name="specification"
                      control={control}
                      register={register}
                      categoryName={categoryName}
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
              <div className="flex justify-center gap-x-4">
                {mode === 'edit' ? (
                  <>
                    <Button
                      className="bg-amber-500 "
                      isRounded={true}
                      type="submit"
                      isLoading={isLoadingUpdate}
                    >
                      更新分类规格
                    </Button>

                    <Button
                      className="rounded-3xl"
                      isLoading={isLoadingDelete}
                      onClick={deleteHandler}
                    >
                      删除分类规格
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-green-500 "
                    isRounded={true}
                    type="submit"
                    isLoading={isLoadingCreate}
                  >
                    建立分类规格
                  </Button>
                )}
              </div>
            </form>
          </PageContainer>
        )}
      </main>
    </>
  )
}

export default DetailsContentPage
