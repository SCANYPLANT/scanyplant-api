
// AWS
import aws, { Rekognition } from 'aws-sdk';


aws.config.update({
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    region: process.env.AWS_S3_REGION,
});

class AwsRekognition  {

    static awsReko: Rekognition = new aws.Rekognition({region: process.env.AWS_S3_REGION as string});

}

export default Object.freeze(new AwsRekognition());
