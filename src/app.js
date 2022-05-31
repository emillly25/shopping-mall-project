import cors from 'cors';
import express from 'express';
import {
  viewsRouter,
  userRouter,
  categoryRouter,
  productRouter,
  orderRouter,
} from './routers';
import { errorHandler } from './middlewares';

const app = express();

// CORS 에러 방지
app.use(cors());

//  아래 세줄 임시
const upload = require('./middlewares/imageUploader');

app.post('/single', upload.single('img'), (req, res, next) => {
  const imgUrl = req.file.location;
  req.imgUrl = imgUrl;
  console.log(req.imgUrl);
  res.status(201).send(req.file);
});

app.post('/multipart', upload.array('img'), (req, res, next) => {
  res.status(201).send(req.files);
});

// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json({ limit: '10mb' }));

// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.urlencoded({ limit: '10mb', extended: false }));

// html, css, js 라우팅
app.use(viewsRouter);

// api 라우팅
// 아래처럼 하면, userRouter 에서 '/login' 으로 만든 것이 실제로는 앞에 /api가 붙어서
// /api/login 으로 요청을 해야 하게 됨. 백엔드용 라우팅을 구분하기 위함임.
app.use('/api', userRouter);

// category api 라우팅
app.use('/api/category', categoryRouter);
// product api 라우팅
app.use('/api/product', productRouter);

// order api 라우팅
app.use('/api/order', orderRouter);

// 순서 중요 (errorHandler은 다른 일반 라우팅보다 나중에 있어야 함)
// 그래야, 에러가 났을 때 next(error) 했을 때 여기로 오게 됨
app.use(errorHandler);

export { app };
