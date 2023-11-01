const AWS= require('aws-sdk');





exports.addfileToGroup = async (req, res) => {
  try {
    console.log(req.body.formData.file);
      //const currentDateTime = req.body.currentDateTime;
      const filename = req.body.filename;
      console.log("object=>" + filename);
      // const memberId = parseInt(req.body.memberId);
      const senderId = req.user.id;
      console.log(senderId);
      console.log(req.body.group)

      const file = req.file;
      const s3 = new AWS.S3({
          accessKeyId: process.env.IAM_USER_KEY,
          secretAccessKey: process.env.IAM_USER_SECRET
      });
      const params = {
          Bucket: 'group.chat.app',
          Key: filename,
          Body: file.buffer,
          ACL: 'public-read',
      };
      // console.log(filename);
      const s3Res = await s3.upload(params).promise();

      // await ChatGroupFileModal.create({
      //     id: getRandomInt(100000, 999999),
      //     senderId: senderId,
      //     fileName: filename,
      //     date: currentDateTime,
      //     fileUrl: s3Response.Location,
      //     GroupNameDatumId: memberId
      // })
      return res.status(201).json({ fileUrl: s3Res.Location });
  } catch (error) {
      console.log(error)
  }
}
