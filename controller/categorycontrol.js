const categoryM = require('../model/categorymodel');
const path=require('path');
const { validationResult } = require('express-validator');
const { Storage } = require('@google-cloud/storage');
let bucketName = "gs://furniture-app-7e485.appspot.com"

const storage = new Storage({
    keyFilename: "serviceaccountkey.json"
});

const uploadFile = async (filename) => {

    await storage.bucket(bucketName).upload(filename, {
        gzip: true,
        metadata: {
            metadata:{
                firebaseStorageDownloadTokens:"good"
            }
        },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
}

exports.Add = (request, response) => {

    
    let a = request.body.name;

    const error = validationResult(request);

    if (!error.isEmpty()) {
        return response.status(200).json({ error: error.array() });
    }

    categoryM.create({ 
        
        catName: a,
        
        catImage: "https://firebasestorage.googleapis.com/v0/b/furniture-app-7e485.appspot.com/o/"+request.file.filename+"?alt=media&token=good"
    
    
    }).then(result => {
        uploadFile(
            path.join(__dirname,"../","public/images/")+request.file.filename
        );
        return response.status(201).json(result);
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: 'Cannot added' });
    });
}

exports.View = (request, response) => {

    categoryM.find().then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        return response.status(500).json({ error: err });
    });
}

exports.Update = (request, response) => {

    categoryM.updateOne({_id:request.body.id},{catName:request.body.name}).then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        return response.status(500).json({ error: err });
    });
}
exports.Delete = (request, response) => {

    categoryM.deleteOne({_id:request.body.id}).then(result => {
        return response.status(200).json(result);

    }).catch(err => {
        return response.status(500).json({ error: err });
    });
}