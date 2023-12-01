import joi from 'joi';

import { usersRepo } from 'helpers';
import { apiHandler } from 'helpers/api';
import { setJson } from '@/helpers/api';


const updateRole = apiHandler(async (req, { params }) => {
  const { id } = params;
  const { role } = await req.json();

  await usersRepo.updateRole(id, role);

  return setJson({
    message: '更新成功'
  })
}, {
  isJwt: true,
  schema: joi.object({
    role: joi.string().required().valid('user', 'admin')
  }),
  identity: 'root'
});

const deleteUser = apiHandler(async (req, { params }) => {
  const { id } = params;
  await usersRepo.delete(id);
  return setJson({
    message: '用户信息已经删除'
  })
}, {
  isJwt: true,
  identity: 'root'
});

export const PATCH = updateRole;
export const DELETE = deleteUser;
