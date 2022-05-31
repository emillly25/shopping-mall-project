import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';
import { sendMail } from '../../utils/send-mail';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ userId, update }) {
    const filter = { _id: userId };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async deleteById(userId) {
    const user = await User.findOneAndDelete({ _id: userId });
    return user;
  }

  async updatePw(email, password, newPasswordHash) {
    const user = await User.findOneAndUpdate(
      { email },
      {
        // hashPassword 로 업데이트 하기
        password: newPasswordHash,
      },
    );

    // 패스워드 발송하기
    await sendMail(
      email,
      '비밀번호가 변경되었습니다.',
      `변경된 비밀번호는: ${password} 입니다.`,
    );

    return user;
  }
}

const userModel = new UserModel();

export { userModel };
