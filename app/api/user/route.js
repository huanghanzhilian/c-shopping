import joi from 'joi'

import { usersRepo } from 'helpers'
import { apiHandler } from 'helpers/api'
import { setJson } from '@/helpers/api'

const getUsers = apiHandler(
  async req => {
    const result = await usersRepo.getAll()
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
      name: joi.string().required(),
    }),
  }
)

export const GET = getUsers
export const PATCH = uploadInfo
