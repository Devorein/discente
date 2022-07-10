import cookieParser from 'cookie-parser';
import express, { Router } from "express";
import supertest from "supertest";
import { COOKIE_NAME } from '../../src/config';
import { logger } from "../../src/middlewares";

export function createSupertestAssertions() {
  const app = express()
  app.use(express.json());
  app.use(logger);
  app.use(cookieParser());

  const router = Router()
  app.use('/v1', router)

  async function assertSupertestErrorRequest<Payload extends object>({ cookie, method, endpoint, payload, statusCode }: {
    statusCode: number,
    payload?: Payload
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    cookie?: string
  }) {
    await supertest(app)[method](`/v1/${endpoint}`)
      .send(payload)
      .set('Cookie', [`${COOKIE_NAME}=${cookie}`])
      .expect(statusCode)
  }

  return {
    router,
    assertSupertestErrorRequest,
    async assertSupertestSuccessRequest<Payload extends object>({ authorization, method, endpoint, payload, cookie, statusCode = 200 }: {
      payload?: Payload
      method: 'post' | 'put' | 'delete' | 'get',
      endpoint: string,
      cookie?: string,
      authorization?: string,
      statusCode?: number
    }) {
      await supertest(app)[method](`/v1/${endpoint}`)
        .set('Cookie', [`${COOKIE_NAME}=${cookie}`])
        .set('Authorization', authorization || '')
        .send(payload)
        .expect(statusCode)
    }
  }
}