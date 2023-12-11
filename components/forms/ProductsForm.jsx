import { useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

import { useGetDetailsQuery } from '@/store/services'

import { Tab } from '@headlessui/react'
import {
  AddColors,
  SelectCategories,
  AddSizes,
  Button,
  TextField,
  ImageList,
  TextArea,
} from 'components'

const tabListNames = [
  { id: 0, name: '标题｜介绍' },
  { id: 1, name: '图片' },
  { id: 2, name: '价格' },
  { id: 3, name: '分组' },
  { id: 4, name: '子产品' },
  { id: 5, name: '属性' },
  { id: 6, name: '规格' },
]
const initialSelectedCategories = {
  levelOne: {},
  levelTwo: {},
  levelThree: {},
}

const ProductsForm = props => {
  //? Props
  const { mode, createHandler, isLoadingCreate, isLoadingUpdate, updateHandler, selectedProduct } =
    props

  //? States
  const [isDetailsSkip, setIsDetailsSkip] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState(initialSelectedCategories)

  //? Form Hook
  const { handleSubmit, register, reset, control, getValues, watch, setValue } = useForm()

  //? Queries
  //*   Get Details
  const { data: details } = useGetDetailsQuery(
    {
      id: selectedCategories?.levelTwo?._id,
    },
    { skip: isDetailsSkip }
  )

  //? Re-Renders
  //*   Select Category To Fetch Details
  useEffect(() => {
    if (selectedCategories?.levelThree?._id) {
      setIsDetailsSkip(false)
    }
  }, [selectedCategories?.levelThree?._id])

  //*   Set Details
  useEffect(() => {
    if (details) {
      setValue('info', details.data.info)
      setValue('specification', details.data.specification)
      setValue('optionsType', details.data.optionsType)
    }
  }, [details])

  //*   Set Product Details On Edit Mode
  useEffect(() => {
    if (selectedProduct && mode === 'edit') {
      reset({ ...selectedProduct })
    }
  }, [selectedProduct])

  //? Handlers
  const editedCreateHandler = data => {
    if (mode === 'create')
      createHandler({
        ...data,
        category: [
          selectedCategories.levelOne?._id,
          selectedCategories.levelTwo?._id,
          selectedCategories.levelThree?._id,
        ],
        category_levels: {
          level_one: selectedCategories.levelOne?._id,
          level_two: selectedCategories.levelTwo?._id,
          Level_three: selectedCategories.levelThree?._id,
        },
      })
  }
  return (
    <section className="p-3 md:px-3 xl:px-8 2xl:px-10">
      <form
        onSubmit={
          mode === 'create' ? handleSubmit(editedCreateHandler) : handleSubmit(updateHandler)
        }
        className="space-y-10"
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
              <TextField label="标题" name="title" control={control} />

              <TextArea name="description" control={control} label="介绍" />
            </Tab.Panel>

            <Tab.Panel>
              <ImageList control={control} />
            </Tab.Panel>

            <Tab.Panel>
              <div className="space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly">
                <TextField
                  label="价格"
                  name="price"
                  control={control}
                  type="number"
                  inputMode="numeric"
                />
                <TextField
                  label="存货"
                  name="inStock"
                  control={control}
                  type="number"
                  inputMode="numeric"
                />

                <TextField
                  label="折扣百分比"
                  name="discount"
                  control={control}
                  type="number"
                  inputMode="numeric"
                />
              </div>
            </Tab.Panel>

            <Tab.Panel>
              {mode === 'create' && (
                <SelectCategories
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />
              )}
            </Tab.Panel>

            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">首先选择类别</span>
              )}

              {details?.data?.optionsType === 'colors' || getValues('colors')?.length > 0 ? (
                <AddColors control={control} register={register} />
              ) : details?.data?.optionsType === 'sizes' || getValues('sizes')?.length > 0 ? (
                <AddSizes control={control} register={register} />
              ) : details?.data?.optionsType === 'none' ? (
                <span className="text-red-600">没有产品</span>
              ) : null}
            </Tab.Panel>

            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">首先选择类别</span>
              )}
              {watch('info') && (
                <div className="text-sm space-y-1.5">
                  <span>属性</span>
                  <table className="w-full max-w-2xl mx-auto">
                    <thead className="bg-emerald-50 text-emerald-500">
                      <tr className="">
                        <th className="w-2/5  p-2.5">名称</th>
                        <th>值</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watch('info').map((item, index) => (
                        <tr key={index} className="border-b-2 border-gray-100">
                          <td className="my-0.5 text-right">
                            <input
                              type="text"
                              className="text-field__input"
                              {...register(`info.${index}.title`)}
                            />
                          </td>
                          <td className="p-2">
                            <textarea
                              rows={3}
                              className="text-field__input"
                              {...register(`info.${index}.value`)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel>
              {isDetailsSkip && mode === 'create' && (
                <span className="text-red-600">首先选择类别</span>
              )}
              {watch('specification') && (
                <div className="text-sm space-y-1.5">
                  <span>规格</span>
                  <table className="w-full max-w-2xl mx-auto">
                    <thead className="bg-fuchsia-50 text-fuchsia-500 ">
                      <tr>
                        <th className="w-2/5 p-2.5">名称</th>
                        <th>值</th>
                      </tr>
                    </thead>
                    <tbody>
                      {watch('specification').map((item, index) => (
                        <tr key={index} className="border-b-2 border-gray-100">
                          <td className="my-0.5 text-right">
                            <input
                              type="text"
                              className="text-field__input"
                              {...register(`specification.${index}.title`)}
                            />
                          </td>
                          <td className="p-2">
                            <textarea
                              rows={3}
                              className="text-field__input"
                              {...register(`specification.${index}.value`)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>

        {mode === 'edit' ? (
          <Button
            className="mx-auto bg-amber-500"
            isRounded
            type="submit"
            isLoading={isLoadingUpdate}
          >
            更新信息
          </Button>
        ) : (
          <Button
            className="mx-auto bg-green-500"
            isRounded
            type="submit"
            isLoading={isLoadingCreate}
          >
            提交信息
          </Button>
        )}
      </form>
    </section>
  )
}

export default ProductsForm
