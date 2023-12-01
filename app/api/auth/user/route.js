import joi from 'joi';

import { usersRepo } from 'helpers';
import { apiHandler } from 'helpers/api';
import { setJson } from '@/helpers/api';

const getUertInfo = apiHandler(async (req) => {
  const userId = req.headers.get('userId');
  const user = await usersRepo.getById(userId);

  return setJson({
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
      root: user.root
    }
  })
});

export const GET = getUertInfo;
