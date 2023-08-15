import express from 'express';
import { resError, resSuccess } from '../utils/resHandle';
import verifyParams from '../middleware/verifyParams';
import { deleteTag, editTag, getTags, putTag } from './tag.controller';

const tagService = express.Router();

// 新增标签
tagService.post(`/`, verifyParams(['name']), async (req, res) => {
  const { name, describe = '' } = req.body;
  try {
    const tag = await putTag({ name, describe });
    resSuccess(res, tag, '添加标签成功');
  } catch (err) {
    resError(res, err, '添加标签失败');
  }
});

// 获取所有标签
tagService.get(`/`, async (req, res) => {
  try {
    const tags = await getTags(req.query as any);
    resSuccess(res, tags, '获取标签成功');
  } catch (err) {
    resError(res, err, '获取标签失败');
  }
});

// 根据id删除标签

tagService.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      await deleteTag(id);
      resSuccess(res, {}, '删除标签成功');
    } catch (err) {
      resError(res, err, '删除标签失败');
    }
  } else {
    resError(res, { err: '缺少参数id' }, '删除标签失败');
  }
});

// 编辑标签
tagService.put(`/:id`, verifyParams(['name']), async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await editTag(id, req.body);
    resSuccess(res, tag, '修改标签成功');
  } catch (err) {
    resError(res, err, '修改标签失败');
  }
});

export default tagService;
