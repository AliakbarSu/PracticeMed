import { getUser } from '@mpt-sst/core/model/users'
import { APIGatewayProxyHandlerV2WithJWTAuthorizer } from 'aws-lambda'
import { get_video_presigned_url } from '@mpt-sst/core/paid_media'
import { Bucket } from 'sst/node/bucket'

export const get_video_url: APIGatewayProxyHandlerV2WithJWTAuthorizer<
  any
> = async _evt => {
  const userId = _evt.requestContext.authorizer.jwt.claims.sub as string
  const key = _evt.pathParameters?.key
  const { roles, plan } = await getUser(userId)
  const bucketName = (
    Bucket as unknown as {
      practiceMed_paid_media_bucket: { bucketName: string }
    }
  ).practiceMed_paid_media_bucket.bucketName
  if (!plan.id || !key) {
    return {
      statusCode: 403,
      body: 'Forbidden',
    }
  }
  const presigned_url = await get_video_presigned_url(bucketName, key)
  return {
    body: presigned_url,
  }
}
