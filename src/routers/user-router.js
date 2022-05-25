import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired,registerRequired } from '../middlewares';
import * as usercontroller from '../controllers';
// import { register,login,getUserlist,editUserData } from '../controller';

const userRouter = Router();

// 회원가입 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
userRouter.post('/register',registerRequired,usercontroller.register);

// 로그인 api (아래는 /login 이지만, 실제로는 /api/login로 요청해야 함.)
userRouter.post('/login', usercontroller.login);

// 전체 유저 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
userRouter.get('/userlist', loginRequired, usercontroller.getUserlist);

// 사용자 정보 수정
// (예를 들어 /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨)
userRouter.patch('/users/:userId',loginRequired,usercontroller.editUserData);

// 사용자 탈퇴
userRouter.delete('/users/:userId',loginRequired,usercontroller.deleteUserData);

export { userRouter };
