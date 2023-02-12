interface IPopularPost {
  id: number;
  title: string;
  date: number;
  author: {
    id: number;
    name: string;
    lastname: string;
  };
  image: string;
  view: number;
  comments_count: number;
}

export default IPopularPost;
