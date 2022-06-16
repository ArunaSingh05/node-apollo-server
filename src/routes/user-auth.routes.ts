import * as express from 'express';

import { UserAuthController } from '../controllers/UserAuthController';
import UserGraphQLService from '../services/graphql-client/user-graphql.service';


let router = express.Router();

const userGraphQLService = new UserGraphQLService();
const userAuthController = new UserAuthController(userGraphQLService);


router.post("/signin", userAuthController.login.bind(userAuthController));
router.post("/signup", userAuthController.register.bind(userAuthController));

export const UserRouter = router;