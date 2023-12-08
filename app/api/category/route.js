import joi from 'joi'

import { setJson, apiHandler } from '@/helpers/api'
import { categoryRepo } from '@/helpers'

const getCategory = apiHandler(async req => {
  const result = await categoryRepo.getAll()
  async function getCategoriesWithChildren() {
    const allCategories = await categoryRepo.getAll()

    function findChildren(category) {
      const children = allCategories.filter(c => c.parent && c.parent.equals(category._id))
      if (children.length > 0) {
        category.children = children.map(child => {
          return findChildren(child)
        })
      }
      return category
    }

    const rootCategories = allCategories.filter(c => !c.parent)
    const categoriesWithChildren = rootCategories.map(category => {
      return findChildren(category)
    })

    return categoriesWithChildren
  }
  const categoriesList = await getCategoriesWithChildren()
  return setJson({
    data: {
      categories: result,
      categoriesList: categoriesList[0],
    },
  })
})

const createCategory = apiHandler(
  async req => {
    const body = await req.json()
    await categoryRepo.create(body)

    return setJson({
      message: '创建分类成功',
    })
  },
  {
    isJwt: true,
    identity: 'admin',
    schema: joi.object({
      name: joi.string().required(),
      slug: joi.string().required(),
      image: joi.string().required(),
      colors: joi.object().required(),
      level: joi.number().required(),
      parent: joi.string(),
    }),
  }
)

export const GET = getCategory
export const POST = createCategory
