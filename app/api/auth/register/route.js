import joi from 'joi';

import { usersRepo } from 'helpers';
import { apiHandler, setJson } from 'helpers/api';

const register = apiHandler(async (req) => {
  const body = await req.json();
  const newUser = await usersRepo.create(body);
  const result = {
    name: newUser.name,
    email: newUser.email,
    mobile: newUser.mobile,
    address: newUser.address,
    role: newUser.role,
    root: newUser.root,
  };
  return setJson({
    data: result
  });
}, {
  schema: joi.object({
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).required()
  })
});

export const POST = register;
