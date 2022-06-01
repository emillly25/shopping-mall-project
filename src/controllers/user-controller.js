import { userService } from '../services';
import is from '@sindresorhus/is';

// 회원가입
const register = async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      throw new Error('check the requested body again');
    }

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      fullName,
      email,
      password,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json({
      isSuccess: true,
      message: 'Sign Up successfully',
      status: 201,
      result: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error('check the requested body again');
    }

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const data = await userService.getUserToken({ email, password });

    const token = data[0];
    const role = data[1];

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json({
      isSuccess: true,
      message: 'Sign In successfully',
      status: 200,
      result: { token, role },
    });
  } catch (error) {
    next(error);
  }
};

const getUserlist = async function (req, res, next) {
  try {
    // 전체 사용자 목록을 얻음
    const users = await userService.getUsers();

    // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json({
      isSuccess: true,
      message: 'Users loaded successfully',
      status: 200,
      result: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserData = async function (req, res, next) {
  try {
    const userId = req.currentUserId;

    // 사용자 정보를 얻음
    const user = await userService.getUser(userId);

    // 사용자 정보를 JSON 형태로 프론트에 보냄
    res.status(200).json({
      isSuccess: true,
      message: 'User loaded successfully',
      status: 200,
      result: user,
    });
  } catch (error) {
    next(error);
  }
};

const editUserData = async function (req, res, next) {
  try {
    // content-type 을 application/json 로 프론트에서
    // 설정 안 하고 요청하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const userId = req.currentUserId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { fullName, password, address, phoneNumber, role } = req.body;

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const currentPassword = req.body.currentPassword;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error('정보를 변경하려면, 현재의 비밀번호가 필요합니다.');
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address && { address }),
      ...(phoneNumber && { phoneNumber }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate,
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json({
      isSuccess: true,
      message: 'User updated successfully',
      status: 200,
      result: updatedUserInfo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUserData = async function (req, res, next) {
  try {
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const userId = req.currentUserId;

    // body data 로부터 비밀번호 추출.
    const userPw = req.body.password;

    if (!userPw) {
      throw new Error('check the requested body again');
    }

    // 유저 정보 삭제
    const data = await userService.deleteUser(userId, userPw);

    // 성공 여부 프론트에 보냄
    res.status(200).json({
      isSuccess: true,
      message: 'User deleted successfully',
      status: 200,
      result: data,
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    // body data 로부터 이메일 추출.
    const email = req.body.email;

    if (!email) {
      throw new Error('check the requested body again');
    }

    const data = await userService.resetPw(email);

    res.status(200).json({
      isSuccess: true,
      message: 'Password reseted successfully',
      status: 200,
      result: data,
    });
  } catch (error) {
    next(error);
  }
};
export {
  register,
  login,
  getUserlist,
  getUserData,
  editUserData,
  deleteUserData,
  resetPassword,
};
