import { Router } from 'express';
import authRouter from "./authRouter";
import oauthRouter from './oauthRouter';

const RootRouter = Router();

RootRouter.use('/auth', authRouter)
RootRouter.use('/oauth', oauthRouter);

export default RootRouter;
