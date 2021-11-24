const multer = require("multer");

const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CLIENT_ID = '22138813073-kni60897ebcf3m2vuvdgccgcnj2s0t4t.apps.googleusercontent.com';
const CLIENT_SECRET = 'q4XesILjDkULGVQeArwIf4bz';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';

const REFRESH_TOKEN = '1//04nviqjuBJ3bVCgYIARAAGAQSNwF-L9IrmA1K_BbK5jkv3Wq_LYHvDsUF845qoRZctNTI6UTIBZpq_CZyYs1X3DK0BuGt3orVfXo';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: 'v3',
  auth: oauth2Client,
});


var express = require('express');
var application = express.Router();

var filePath;
var archivo;

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/archivos/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });
application.post('/crear', upload.single("imagen"), async (req, res, next) => {
  filePath = path.join("src/archivos/", req.file.originalname);

  const file = req.file;
  archivo = file.originalname;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  } else {

    generatePublicUrl();
  }
  res.send("Archivo subido correctamente: " + file.originalname);

});






/* 
filepath which needs to be uploaded
Note: Assumes example.jpg file is in root directory, 
though this can be any filePath
*/


async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: 'example.jpg', //This can be name of your choice
        mimeType: 'image/jpg',
      },
      media: {
        mimeType: 'image/jpg',
        body: fs.createReadStream(filePath),
      },
    });

    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
}


async function generatePublicUrl() {
  try {
    const fileId = '1sJTgqzxBb3pEcUKYRN-9sL7vzG9yeo37';
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    /* 
    webViewLink: View the file in browser
    webContentLink: Direct download link 
    */
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink, webContentLink',
    });
    console.log(result.data);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = application;