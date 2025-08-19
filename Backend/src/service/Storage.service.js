// set up to imagekit and file upload on imagekit cloud storage

const ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey :process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint :process.env.IMAGEKIT_URL_ENDPOINT
});

// imagekit.upload is require callback function to we are returning a new promise 

function uploadfile(file){
   return new Promise((resolve, reject) => {
    imagekit.upload({
        file:file.buffer,
        fileName:file.originalname,
        folder:"moody-player"
    },(error,result)=>{
        if(error){
            reject(error)}
        else{
            resolve(result)
        }
    })
   })
}

module.exports = uploadfile


