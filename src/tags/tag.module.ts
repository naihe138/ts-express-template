// 权限和用户数据模型
import { Document, PaginateModel, Schema, model } from 'mongoose';
import { ITag } from './interface/tag.interface';
import mongoosePaginate from 'mongoose-paginate-v2';

const tagSchema = new Schema<ITag>({
  // 标签名称
  name: { type: String, required: true, validate: /\S+/ },
  // 标签描述
  describe: String,
  // 发布日期
  create_at: { type: Date, default: Date.now },
  // 最后修改日期
  update_at: { type: Date },
  // 排序
  sort: { type: Number, default: 0 },
});

tagSchema.plugin(mongoosePaginate);

tagSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { update_at: Date.now() });
  next();
});

interface TagDocument extends Document, ITag {}

const Tag = model<TagDocument, PaginateModel<TagDocument>>('Tag', tagSchema);

export default Tag;
