import type { FastifyReply } from "fastify";

export type SuccessApiReply = {
  data?: unknown;
  message?: string;
  success?: true;
};

export type FailureApiReply = {
  code: string;
  data?: unknown;
  message: string;
  reqId: string;
  success: false;
};

export type ApiReply = FailureApiReply | SuccessApiReply;

async function sendSuccessApi(res: FastifyReply, reply: SuccessApiReply): Promise<void> {
  const { data: replyData, message = "Success" } = reply;
  let data = replyData;
  if (typeof data === "undefined") {
    data = null;
  }
  await res.send({ data, message, reqId: res.request.id, success: true });
}

async function sendFailureApi(res: FastifyReply, reply: FailureApiReply): Promise<void> {
  const { code, data: replyData, message } = reply;
  let data = replyData;
  if (typeof data === "undefined") {
    data = null;
  }
  await res.send({ code, data, message, reqId: res.request.id, success: false });
}


export async function sendApi(this: FastifyReply, reply: ApiReply): Promise<void> {
  if (reply.success === false) {
    await sendFailureApi(this, reply);
  } else {
    await sendSuccessApi(this, reply);
  }
}
