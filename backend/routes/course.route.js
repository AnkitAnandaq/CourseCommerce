import express from "express";
import { createCourse } from "../controllers/course.controllers.js";
import { updateCourse } from "../controllers/course.controllers.js";
import { deleteCourse } from "../controllers/course.controllers.js";
import { buyCourses } from "../controllers/course.controllers.js";
import { getCourses } from "../controllers/course.controllers.js";
import userMiddleware from "../middleware/user.mid.js";
import adminMiddleware from "../middleware/admin.mid.js";

const router = express.Router();

router.post("/create",adminMiddleware, createCourse);
router.put("/update/:courseId",adminMiddleware, updateCourse);
router.delete("/delete/:courseId",adminMiddleware, deleteCourse);
router.get("/courses", getCourses);

router.post("/buy/:courseId", userMiddleware, buyCourses);
export default router;
