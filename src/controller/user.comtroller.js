// 处理整个数据流程

class UserController {
  test(ctx, next) {
    ctx.body = {
      name: "pyy",
      age: 80,
    };
  }
}

module.exports = new UserController();
