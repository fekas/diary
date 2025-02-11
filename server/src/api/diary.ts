import express from 'express';
import { createDiary, getDiaries, getDiaryById, updateDiary, deleteDiary } from '../controllers/diary';

const router = express.Router();

// 创建日记
router.post('/', createDiary);

// 获取用户的所有日记
router.get('/', getDiaries);

// 获取特定日记
router.get('/:id', getDiaryById);

// 更新日记
router.put('/:id', updateDiary);

// 删除日记
router.delete('/:id', deleteDiary);

export default router;