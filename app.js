const Post = require('./model/post');
const express = require('express');
const app = express();

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/products', (req, res, next) => {
  res.send('get data');
});
app.post('/products', async (req, res, next) => {
  try {
    const data = req.body; // 取得帶入的資料
    console.log('data: ', data);
    if (data.content) {
      // 如果有資料
      // 使用 mongoose 將 data 新增至資料庫
      const newPost = await Post.create({
        title: data.title,
        content: data.content,
        image: data.image,
      });
      res.status(200).json({
        status: 'success',
        message: '新增成功',
      });
    } else {
      console.log('欄位填寫錯誤');
    }
  } catch (error) {
    console.log(error);
  }
});
