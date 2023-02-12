import ICategory from './Category';
import ITag from './Tag';

interface IPost {
  id: number;
  permalink: string;
  title: string;
  date: number;
  description: string;
  author: {
    id: number;
    name: string;
    lastname: string;
  };
  content: string;
  image: string;
  view: number;
  status: number;
  comments_count: number;
  categories: ICategory[];
  tags: ITag[];
}

export default IPost;
