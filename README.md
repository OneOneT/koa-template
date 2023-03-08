# koa-template
koa模板
# 1. 项目依赖的库

1. koa

```powershell
npm install koa
```

2. koa-router

```
npm install @koa/router
```

3. koa-bodyparser

```
npm i koa-bodyparser
```

4. koa-multer

```
npm install --save @koa/multer multer
```

5. mysql2

```
npm install --save mysql2
```

6. jsonwebtoken

```
npm install jsonwebtoken
```

7. dotenv

```js
npm install dotenv --save

const env = require("dotenv");
env.config();
module.exports = { SERVER_HOST } = process.env;
```

8.对数据MD5加密(node自带模块)

```js
const crypto = require('crypto')


function md5password(password) {
  const md5 = crypto.createHash('md5')
  const md5pwd = md5.update(password).digest('hex')//hex转化为十六进制

  return md5pwd
}
```





# 2.项目目录

```
├─ .env 										//环境变量
├─ package.json

├─ src
│    ├─ app
│    │    ├─ database.js 							//数据库配置文件
│    │    └─ index.js								//koa配置文件
│    ├─ config
│    │    ├─ error.js								//错误信息变量
│    │    ├─ keys									//密钥和私钥
│    │    ├─ path.js
│    │    ├─ screct.js
│    │    └─ server.js
│    ├─ controller									//控制器(放回给客户端逻辑)
│    │    ├─ comment.controller.js
│    │    ├─ file.controller.js
│    │    ├─ label.controller.js
│    │    ├─ login.controller.js
│    │    ├─ moment.controller.js
│    │    └─ user.controller.js
│    ├─ main.js										//入口文件
│    ├─ middleware									//中间件(中间件逻辑处理,如验证账号逻辑)
│    │    ├─ file.middleware.js
│    │    ├─ label.middleware.js
│    │    ├─ login.middleware.js
│    │    ├─ permission.middleware.js
│    │    └─ user.middleware.js
│    ├─ router										//路由文件(配置路由)
│    │    ├─ comment.router.js
│    │    ├─ file.router.js
│    │    ├─ index.js
│    │    ├─ label.router.js
│    │    ├─ login.router.js
│    │    ├─ moment.router.js
│    │    └─ user.router.js
│    ├─ service										//数据库文件(处理数据库)
│    │    ├─ comment.service.js
│    │    ├─ file.service.js
│    │    ├─ label.service.js
│    │    ├─ moment.service.js
│    │    ├─ permission.service.js
│    │    └─ user.service.js
│    └─ utils
│           ├─ handle-error.js							//错误信息处理
│           └─ md5-password.js							//密码加密处理
└─ uploads                   							//文件上传目录
       ├─ 03faa4e939cae28885b1b12adfe8a85f
       ├─ 3de1f736febeb5945039a2e4c71a79c3
       ├─ 44373957d6b16b379bfd09b0baaeba89
       ├─ a96f2e5207609d2ba8b314c913366640
       ├─ ae0a8c7318c6a03d711ecbed88d02bb5
       ├─ cf383bf3b4a113a1e5bbe3c6a85b8ed6
       └─ f26f8df208637fe881ce0111a5c8472d
```

# 3. 路由自动化

```js
const fs = require('fs')

function registerRouters(app) {
  // 1.读取当前文件夹下的所有文件
  const files = fs.readdirSync(__dirname)

  // 2.遍历所有的文件
  for (const file of files) {
    if (!file.endsWith('.router.js')) continue
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}

module.exports = registerRouters

//--------------------------------------------------------------
const fs = require("fs");
const path = require("path");

//实现路由自动化
function registerRouter(app) {
  const routerFiles = fs.readdirSync(path.resolve(__dirname, "../router"));
  // console.log(routerFiles);

  routerFiles.forEach((item) => {
    // console.log(item);

    // endsWith()以什么为结尾
    if (item.endsWith(".router.js")) {
      // console.log(item);
      const Router = require(`./${item}`);
      app.use(Router.routes());
      app.use(Router.allowedMethods());
    }
  });
}

```

# 4. 数据库配置信息

```js
const mysql = require("mysql2");

// 1.创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: "3306",
  database: "coderhub",
  user: "root",
  password: "88888888",
});

// 2.获取连接是否成功
connectionPool.getConnection((err, connection) => {
  // 1.判断是否有错误信息
  if (err) {
    console.log("连接数据库失败!!!", err);
    return;
  }
  // 2.获取connection, 尝试和数据库建立一下连接
  connection.connect((err) => {
    if (err) {
      console.log("连接数据库超时", err);
    } else {
      console.log("数据库连接成功, 可以操作数据库~");
    }
  });
});

// 3.获取连接池中连接对象(promise)
const connection = connectionPool.promise();

module.exports = connection;

```

