const Router = require("@koa/router");

const { test } = require("../controller/user.comtroller");
const { demo } = require("../middleware/user.middleware");

// 1.创建路由对象
const userRouter = new Router({ prefix: "/user" });

// 2.定义路由中映射
// 2.1.用户注册接口
userRouter.get("/", demo, test);

// 3.导出路由
module.exports = userRouter;
