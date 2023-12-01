import joi from "joi";

import { setJson, apiHandler } from "@/helpers/api";
import { categoryRepo } from "@/helpers";

const getCategory = apiHandler(async (req) => {
  const userId = req.headers.get('userId');
  const result = await categoryRepo.getAll();
  return setJson({
    data: result
  })
});

const createCategory = apiHandler(async(req) => {
  const { name } = await req.json();
  await categoryRepo.create({ name });

  return setJson({
    message: '创建分类成功'
  })
}, {
  isJwt: true,
  identity: 'admin',
  schema: joi.object({
    name: joi.string().required()
  })
})

export const GET  = getCategory;
export const POST  = createCategory;
