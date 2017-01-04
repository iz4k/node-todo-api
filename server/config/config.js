//process.env.NODE_ENV is set to 'production' in heroku by default
//                     is set to 'test' with the npm test script NODE_ENV variable
//                     will be set to 'development' if its neither of the above
var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if(env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
