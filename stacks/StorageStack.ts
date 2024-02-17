import { Bucket, StackContext } from "sst/constructs";

export function Storage(context: StackContext) {
  const { stack } = context;
  const bucket = new Bucket(stack, "practiceMed-paid-media-bucket");
  return {
    bucket,
  };
}
