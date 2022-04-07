import { Router } from 'express';
import {listRoutes,taskRoutes} from "./index";

const router = Router();

router.use('/list',listRoutes);
router.use('/task',taskRoutes);


export default router;