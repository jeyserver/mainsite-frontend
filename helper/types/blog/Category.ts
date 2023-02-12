interface ICategory {
  id: number;
  parent: number | null;
  title: string;
  permalink: string;
}

export default ICategory;
