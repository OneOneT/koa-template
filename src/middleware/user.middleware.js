// 中间件(函数)

const demo = (ctx, next) => {
  next();
};

module.exports = {
  demo,
};
