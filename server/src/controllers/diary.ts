import { Request, Response } from 'express';
import Diary, { IDiary } from '../models/diary';

export const createDiary = async (req: Request, res: Response) => {
  try {
    const { title, content, date, tags, mood } = req.body;

    const diary = new Diary({
      title,
      content,
      date,
      tags,
      mood
    });

    await diary.save();
    res.status(201).json(diary);
  } catch (error) {
    res.status(500).json({ message: '创建日记失败', error });
  }
};

export const getDiaries = async (req: Request, res: Response) => {
  try {
    const diaries = await Diary.find();
    res.json(diaries);
  } catch (error) {
    res.status(500).json({ message: '获取日记列表失败', error });
  }
};

export const getDiaryById = async (req: Request, res: Response) => {
  try {
    const diary = await Diary.findById(req.params.id);

    if (!diary) {
      return res.status(404).json({ message: '日记不存在' });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: '获取日记详情失败', error });
  }
};

export const updateDiary = async (req: Request, res: Response) => {
  try {
    const { title, content, date, tags, mood } = req.body;
    const diary = await Diary.findByIdAndUpdate(
      req.params.id,
      { title, content, date, tags, mood },
      { new: true }
    );

    if (!diary) {
      return res.status(404).json({ message: '日记不存在' });
    }

    res.json(diary);
  } catch (error) {
    res.status(500).json({ message: '更新日记失败', error });
  }
};

export const deleteDiary = async (req: Request, res: Response) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.id);

    if (!diary) {
      return res.status(404).json({ message: '日记不存在' });
    }

    res.json({ message: '日记删除成功' });
  } catch (error) {
    res.status(500).json({ message: '删除日记失败', error });
  }
};