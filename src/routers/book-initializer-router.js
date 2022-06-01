import { Router } from 'express';

const { categoryService } = require('../services/category-service');
const { productModel, categoryModel } = require('../db');

const bookInitializerRouter = Router();
const request = require('request');
bookInitializerRouter.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const { categoryName, size } = req.body;
    const kakaoApiKey = '0868689c6d075e4d21db713cf240cca5';
    const options = {
      uri: 'https://dapi.kakao.com/v3/search/book?target=title',
      method: 'GET',
      form: {
        query: categoryName,
        size: size,
      },
      headers: { Authorization: `KakaoAK ${kakaoApiKey}` },
    };

    request.post(options, async function (err, httpResponse, body) {
      const bookDatas = await JSON.parse(body);
      console.log(bookDatas);
      console.log(bookDatas.documents.length);

      for (let i = 0; i < bookDatas.documents.length; i++) {
        // console.log(bookDatas.documents[i]);
        const book = bookDatas.documents[i];

        let category = await categoryService.getCategory(categoryName);
        if (!category) {
          category = await categoryModel.create(categoryName);
        }
        const name = book.title;
        const price = book.price;
        const imgUrl = book.thumbnail;
        let information = book.contents;
        if (information == '') {
          information = '비어 있음';
        }

        const author = book.authors[0];
        const publisher = book.publisher;
        // parsed
        const parsedPublishedDate = book.datetime.substring(0, 10).split('-');
        const publishedDate = `${parsedPublishedDate[0]}년 ${parsedPublishedDate[1]}월 ${parsedPublishedDate[2]}일`;
        const orderCount = 0;
        const productInfo = [
          category,
          name,
          price,
          imgUrl,
          information,
          author,
          publisher,
          publishedDate,
          orderCount,
        ];
        await productModel.create(productInfo);
      }
    });
    return res.status(200).json({
      isSuccess: true,
      message: 'books inserted successfully',
      status: 200,
      result: 'Success',
    });
  } catch (err) {
    return res.status(500).json({
      isSuccess: false,
      message: err.message,
      status: 500,
      result: null,
    });
  }
});

export { bookInitializerRouter };
