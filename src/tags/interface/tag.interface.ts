export interface ITag {
  name: string;
  describe: string;
  create_at?: string;
  update_at?: string;
  sort?: number;
}

export interface ITagQuery {
  currentPage: number;
  pageSize: number;
  keyword: string;
}
