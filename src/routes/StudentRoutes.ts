import { Router } from 'express';
import { getStudents } from '../controllers/StudentsControllers.js';

const router = Router();

router.get('/', getStudents);

export default router;