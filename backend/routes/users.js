
import express from 'express';
import {createUser, deleteUser, getAllUser, getSingleUser, updateUser} from "./../controllers/userController.js";

import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();



    router.post('/', createUser);

    router.put('/:id', verifyUser, updateUser);

    router.delete('/:id', verifyUser, deleteUser);

    router.get('/:id', verifyUser, getSingleUser);

    router.get('/', verifyAdmin, getAllUser);

    
    console.log('✅ users.js route loaded');

export default router;
