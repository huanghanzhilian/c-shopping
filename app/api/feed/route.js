import { setJson, apiHandler } from '@/helpers/api'
import { bannerRepo, categoryRepo, sliderRepo } from '@/helpers'

const getFeed = apiHandler(
  async req => {
    const currentCategory = await categoryRepo.getOne({
      parent: undefined,
    })
    const childCategories = await categoryRepo.getAll(
      {},
      {
        parent: currentCategory?._id,
      }
    )

    const sliders = await sliderRepo.getAll({}, { category_id: currentCategory?._id })

    const bannerOneType = await bannerRepo.getAll(
      {},
      {
        category_id: currentCategory?._id,
        type: 'one',
      }
    )
    const bannerTwoType = await bannerRepo.getAll(
      {},
      {
        category_id: currentCategory?._id,
        type: 'two',
      }
    )
    return setJson({
      data: {
        currentCategory,
        childCategories,
        sliders,
        bannerOneType,
        bannerTwoType,
      },
    })
  },
  {
    isJwt: false,
  }
)

export const GET = getFeed
export const dynamic = 'force-dynamic'
