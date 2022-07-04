export type Book = [number, number, number];
export type BookObj = {
  price: number;
  count: number;
  amount: number;
};
export type Books = [[number, number, number]];

export interface BooksState {
  loading: boolean;
  books: BookObj[];
}
