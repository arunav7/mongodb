const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data, 'vhyrxceed');  // jwt.sign returns token which is used to verify the validity of info
console.log(token);

var decoded = jwt.verify(token, 'vhyrxceed');
console.log('decoded:', decoded);
console.log(decoded.id , decoded.iat);

// var message = 'let$R0$$!t';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'sssecret').toString()
// };

// // token.data.id = 3;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'sssecret').toString();   //sha256() takes string as input and returns an object

// if(resultHash === token.hash) {
//     console.log('Information is secure');
// }
// else {
//     console.log('Data manipulated..Security Breach !!!!!');
// }
