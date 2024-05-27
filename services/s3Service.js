const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

exports.uploadFileToS3 = async (file) => {
    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}-${file.originalFilename}`,
        Body: fileStream,
        ACL: 'public-read'
    };

    try {
        await s3Client.send(new PutObjectCommand(uploadParams));
        return { url: `https://${uploadParams.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}` };
    } catch (err) {
        console.error("Error al subir el archivo a S3", err);
        throw new Error("Error al subir el archivo");
    }
};
