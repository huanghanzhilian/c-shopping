import joi from 'joi';

import { usersRepo } from 'helpers';
import { apiHandler, setJson } from 'helpers/api';

const login = apiHandler(async (req) => {
  const body = await req.json();
  const result = await usersRepo.authenticate(body);
  return setJson({
    data: result,
    message: '登录成功'
  });
}, {
  schema: joi.object({
    email: joi.string().required(),
    password: joi.string().min(6).required()
  })
});

export const POST = login;
