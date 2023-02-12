interface IPost {
  id: number;
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
}

export default IPost;
