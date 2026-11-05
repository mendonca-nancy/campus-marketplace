import { Router } from 'express';
import {getUserById, createUser, updateUser} from '../controllers/userController.js';
const router = Router();

router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;

