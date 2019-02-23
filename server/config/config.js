var env = process.env.NODE_ENV || 'development';    // by default NODE_ENV='production'(heroku), development(locally) 
console.log('env*******', env);

if(env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoApp';
} else if(env === 'test') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/TodoAppTest';
}
