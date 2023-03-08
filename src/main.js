// 1.导入app
const { app } = require("./app/index");

const { SERVER_POST } = require("./config/service");

// 2.将app启动起来
app.listen(SERVER_POST, () => {
  console.log(`${SERVER_POST}服务器启动成功`);
});
