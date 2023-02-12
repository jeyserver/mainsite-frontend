interface IPopularPost {
  id: number;
  permalink: string;
  title: string;
  date: number;
  author: {
    id: number;
    name: string;
    lastname: string;
  };
  image: string;
  description: string;
  view: number;
  comments_count: number;
}

export default IPopularPost;
