'use strict';
import Tag from './tag.module';
import { ITag, ITagQuery } from './interface/tag.interface';

/**
 * 添加标签
 * @param opts
 * @returns 返回标签
 */
export const putTag = async (opts: ITag) => {
  const { name } = opts;
  // 添加前，先验证是否有相同 name
  const res = await Tag.find({ name });
  if (res && res.length !== 0) {
    throw new Error('标签名已经存在');
  } else {
    const tag = await new Tag(opts);
    return tag.save();
  }
};

/**
 * 标签获取
 * @param query
 * @returns
 */
export const getTags = async (query: ITagQuery) => {
  const { currentPage = 1, pageSize = 50, keyword = '' } = query || {};
  console.log(query);
  // 过滤条件
  const options = {
    sort: { sort: 1 },
    page: Number(currentPage),
    limit: Number(pageSize),
  };
  // 参数
  const queryObj: any = {};
  if (keyword) {
    queryObj.name = new RegExp(keyword);
  }
  const tag = await Tag.paginate(queryObj, options);
  const result = {
    pagination: {
      total: tag.totalDocs,
      current_page: tag.page,
      total_page: tag.totalPages,
      page_size: tag.limit,
    },
    list: tag.docs,
  };
  return result;
};

/**
 * 通过id修改标签
 * @param opt
 * @returns
 */
export const editTag = async (id: string, options: Partial<ITag>) => {
  const { name, describe } = options;
  const updateOptions: Partial<ITag> = {};
  if (name) {
    updateOptions.name = name;
  }
  if (describe) {
    updateOptions.describe = describe;
  }
  return await Tag.findByIdAndUpdate(id, updateOptions).exec();
};

/**
 * 删除标签
 * @param _id 标签id
 * @returns
 */
export const deleteTag = async (_id) => {
  return await Tag.findByIdAndRemove(_id).exec();
};
