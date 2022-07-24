import { Router } from 'express';
import authRouter from './authRouter';
import courseRouter from './courseRouter';
import oauthRouter from './oauthRouter';
import userRouter from './userRouter';

const RootRouter = Router();

RootRouter.use('/auth', authRouter);
RootRouter.use('/oauth', oauthRouter);
RootRouter.use('/user', userRouter);
RootRouter.use('/course', courseRouter);

export default RootRouter;
