import { setJson, apiHandler } from '@/helpers/api'
import { getQuery, productRepo } from '@/helpers'

const itemDetail = apiHandler(async req => {
  const { id } = getQuery(req)
  const result = await productRepo.getItemDetail(id)

  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(
  //       setJson({
  //         data: result,
  //       })
  //     )
  //   }, 3000)
  // })
  return setJson({
    data: result,
  })
})

export const GET = itemDetail
export const dynamic = 'force-dynamic'
