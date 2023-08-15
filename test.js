var svgCaptcha = require('svg-captcha');
var captcha = svgCaptcha.createMathExpr({
  size: 10,
  noise: 2,
  color: '#08979c',
  background: '#e6fffb'
});


console.log(captcha);
// const { createClient } = require('redis');

// async function a () {
//   const client = createClient({
//     port: 6379,
//     password: '123456'
//   });

//   client.on('error', err => console.log('Redis Client Error', err));

//   await client.connect();

//   await client.set('key', 'value');
//   const value = await client.get('key');
//   console.log(value);

// }

// a()
