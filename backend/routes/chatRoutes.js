import express from 'express';
import { chatWithBot } from '../controllers/chatController.js'; // 👈 don't forget the `.js`

const router = express.Router();
router.post('/', chatWithBot);
export default router;
