import { Router } from 'express';
import {listRoutes} from "./index";

const router = Router();

router.use('/list',listRoutes);

export default router;