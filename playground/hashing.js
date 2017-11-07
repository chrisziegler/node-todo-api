const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

//COMMENT THIS OUT AND USE LAST GENERATED SALTED HASH FOR BCRYPT.COMPARE()
bcrypt.genSalt(13, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
});

//compare if this hash equals the plaintext password
//this is what we do when someone logs-in

let hashedPassword = '$2a$13$EmHh3Zi.ZGHy4D8hC5P8p.RG8zqMR2Zkx2YwKCwVGyX6a68WwlbNa'

//res is either true or false, true if they match
bcrypt.compare(password, hashedPassword, (err, res) => {
    console.log(res)
})

// const data = {
//     id: 10
// };

// let token = jwt.sign(data, '123abc');
// console.log(token);
// let decoded = jwt.verify(token, '123abc');
// console.log('decoded', decoded);


//JSON Web Object methodology illustrated w/SHA256
// let message = 'I am user number 3';
// let hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// //the data we want to send back to the client
// let data = {
//     id: 4
// }
// //the data we send back to the user
// let token = {
//     // data: data
//     data,
//     //convert the whole data object to a JSON string for SHA to hash
//     //use the toString() method to store the resulting hash object as a string itself
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// //just looking at this value    stringify: {"id":4}    
// //here it's already a string, no need for toString()
// //we need to pass SHA256(a string) - but it returns another Object
// console.log('stringify: ' + JSON.stringify(token.data));


// //this represents the time where the data could be manipulated by user
// //so the hacker man in the middle might try to change user 4's data.id property by
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
// //however the secret is only on the server

// let resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// //so we save the value of the salted hash at verification
// //using the same (but really) randomly added 'somesecret' 
// //salting we used at creation of the hash


// if (resultHash === token.hash) {
//     //then we know the data was not manipulated
//     console.log('data was not changed');
// } else {
//     console.log('data was changed, don\'t trust!');
// }