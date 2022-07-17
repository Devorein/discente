import { Router } from 'express';
import { authController } from '../controllers';

const oauthRouter = Router();

oauthRouter.get('/google', authController.googleOauth);

export default oauthRouter;
