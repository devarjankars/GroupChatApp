const sequelize=require('../utils/database');
const AWS = require('aws-sdk')



function  uploadToS3(data, filename){
 const BUCKET_NAME='expense.tracker.project';
 const IAM_USER_KEY=`${process.env.IAM_USER_KEY}`;
 const IAM_USER_SECRET=`${process.env.IAM_USER_SECRET}`;


let s3bucket= new  AWS.S3({
    accessKeyId:IAM_USER_KEY,
    secretAccessKey:IAM_USER_SECRET,
    Bucket:BUCKET_NAME
})


  let params={
     Bucket:BUCKET_NAME,
     Key:filename,
     Body:data,
     ALC:'public-read'
  }
  return new Promise((Resolv, Reject)=>{
    s3bucket.upload(params,(err, s3res)=>{
        if(err){
            console.log(err);
            Reject(err)
        }
        else{
            //console.log(s3res);
        }  Resolv(s3res.Location);
      })
  })
  


}