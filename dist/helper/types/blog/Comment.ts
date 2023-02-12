interface IComment {
  id: number;
  reply: number;
  name: string;
  avatar: string;
  site: string | null;
  date: number;
  text: string;
}

export default IComment;
