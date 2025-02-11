import { Router } from 'express';
import { createDiary, getDiaries, getDiaryById, updateDiary, deleteDiary } from '../controllers/diary';

const router = Router();

// 日记相关路由
router.post('/', createDiary);
router.get('/', getDiaries);
router.get('/:id', getDiaryById);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);

export default router;