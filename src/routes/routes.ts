import { Router } from "express";
import { listRoutes, taskRoutes, userRoutes, testRoutes } from "./index";

const router = Router();

router.use("/list", listRoutes);
router.use("/task", taskRoutes);
router.use("/user", userRoutes);
router.use("/test", testRoutes);

export default router;
