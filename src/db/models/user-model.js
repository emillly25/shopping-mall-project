import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';
import { sendMail } from '../../utils/send-mail';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findByEmailandPhone(email, phoneNumber) {
    const user = await User.findOne({ email, phoneNumber });
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
      '비밀번호 변경',
      `<h1>비밀번호가 변경되었습니다.</h1>
      <br>
      <div>
        변경된 비밀번호는: <span style=" font: bold ; color: blue;">${password}</span> 입니다.
      </div>
      <div>
        <p>변경된 비밀번호 입력 후 로그인해 주세요.</p>
      </div>`,
    );

    return user;
  }
}

const userModel = new UserModel();

export { userModel };
