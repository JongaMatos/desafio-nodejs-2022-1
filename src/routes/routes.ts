import { Router } from 'express';
import {taskListRoutes} from "./index";

const router = Router();

router.use('/tasklist',taskListRoutes);

export default router;