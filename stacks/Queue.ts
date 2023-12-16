import { Queue, StackContext } from "sst/constructs"

export function QueueStack({ stack }: StackContext) {
    const queue = new Queue(stack, "queue", {
        consumer: "packages/functions/src/queue/index.handler",
    });

    return {
        queue,
    }
}
