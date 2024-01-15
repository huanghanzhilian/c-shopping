import joi from 'joi'

import { usersRepo } from 'helpers'
import { apiHandler } from 'helpers/api'
import { setJson } from '@/helpers/api'

const getUsers = apiHandler(
  async req => {
    const searchParams = req.nextUrl.searchParams
    const page = +searchParams.get('page') || 1
    const page_size = +searchParams.get('page_size') || 5

    const result = await usersRepo.getAll({
      page,
      page_size,
    })
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    identity: 'admin',
  }
)

const uploadInfo = apiHandler(
  async req => {
    const userId = req.headers.get('userId')
    const body = await req.json()
    const result = await usersRepo.update(userId, body)
    return setJson({
      data: result,
    })
  },
  {
    isJwt: true,
    schema: joi.object({
      name: joi.string(),
      address: joi.object(),
      mobile: joi.string(),
    }),
  }
)

export const GET = getUsers
export const PATCH = uploadInfo
export const dynamic = 'force-dynamic'
