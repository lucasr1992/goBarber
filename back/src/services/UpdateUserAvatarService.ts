import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import User from '../models/User';
import UsersRepository from '../repositories/UserRepository';
import AppError from '../errors/AppError';

interface Request{
  user_id: string;
  avatarFilename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const UserRepository = getRepository(User);

    const user = await UserRepository.findOne(user_id);

    if (!user) {
      throw new AppError('Only authenticate users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await UserRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
