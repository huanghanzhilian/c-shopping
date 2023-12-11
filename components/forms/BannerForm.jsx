import Image from 'next/image'

import { Button, ControlledCheckbox, TextField, UploadImage } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { bannerSchema } from 'utils'

import { useEffect } from 'react'

const BannerForm = props => {
  //? Props
  const {
    mode,
    createHandler,
    updateHandler,
    deleteHandler,
    isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,
    selectedBanner,
  } = props

  //? Assets
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    isPublic: true,
    type: 'one',
  }

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(bannerSchema),
  })

  //? Handlers
  const handleAddUploadedImageUrl = url => setValue('image.url', url)

  //? Re-Renders
  useEffect(() => {
    if (selectedBanner && mode === 'edit') {
      const { image, title, uri, isPublic, type } = selectedBanner

      reset({ image, title, uri, isPublic, type })
    }
  }, [selectedBanner])

  return (
    <section className="p-3 mx-auto mb-10 space-y-8">
      <div className="mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10">
        <form
          onSubmit={mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)}
          className="space-y-3"
        >
          <TextField label="横幅标题" control={control} name="title" errors={formErrors?.title} />

          <TextField label="链接地址" control={control} name="uri" errors={formErrors?.uri} />

          <div className="w-44 my-3">
            <ControlledCheckbox name="isPublic" control={control} label="发布状态" />
          </div>

          <div className="flex items-center gap-8 mb-5">
            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="one"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">第一种</span>
            </label>

            <label className="inline-flex items-center gap-x-2">
              <input
                className="w-5 h-5 text-red-600"
                type="radio"
                value="two"
                {...register('type')}
              />
              <span className="ml-2 text-gray-700">第二种</span>
            </label>
          </div>

          <TextField
            label="图片地址"
            control={control}
            name="image.url"
            errors={formErrors?.image?.url}
          />

          <UploadImage folder="/banners" handleAddUploadedImageUrl={handleAddUploadedImageUrl} />

          {bannerSchema.isValidSync(watch()) && (
            <div className="mx-auto max-w-max">
              {getValues('image.url') && (
                <Image
                  src={getValues('image.url')}
                  width={getValues('type') === 'one' ? 400 : 300}
                  height={200}
                  alt="banner image"
                />
              )}
            </div>
          )}

          <div className="flex justify-evenly gap-x-4 pt-10">
            {mode === 'edit' ? (
              <>
                <Button
                  className="bg-amber-500 "
                  isRounded={true}
                  type="submit"
                  isLoading={isLoadingUpdate}
                >
                  更新
                </Button>

                <Button isRounded={true} isLoading={isLoadingDelete} onClick={deleteHandler}>
                  删除
                </Button>
              </>
            ) : (
              <Button
                className="bg-green-500 "
                isRounded={true}
                type="submit"
                isLoading={isLoadingCreate}
              >
                提交
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default BannerForm
