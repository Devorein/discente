import { Router } from 'express';
import authRouter from "./authRouter";

const RootRouter = Router();

RootRouter.use('/auth', authRouter)

export default RootRouter;
