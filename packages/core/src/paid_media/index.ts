import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const get_video_presigned_url = async (
  bucketName: string,
  key: string,
): Promise<string> => {
  const client = new S3Client({});
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
    RequestPayer: "requester",
  });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};
