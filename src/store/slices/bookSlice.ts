import { Book, BookObj, BooksState } from '../types';

import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './../redux';
import { createSlice } from '@reduxjs/toolkit';

const processBooks = (books: any, state: BooksState) => {
  if (Array.isArray(books)) {
    if (typeof books[0] == 'number') {
      books = [books];
    }
    // let messages: BookObj[] = [];
    let messages: BookObj[] = [...(state.books || [])];

    console.log(books);
    books.forEach((book: [number, Book]) => {
      if (book[1].length === 3) {
        // if (!meta.current.initialMessage) {
        //   messages.length && messageHistory.pop();
        // }
        const [price, count, amount] = book[1];
        let bookObj: BookObj = { price, count, amount };
        messages.push(bookObj);
      }
    });

    messages = messages.sort((left, right) => {
      if (left.amount > right.amount) {
        return -1;
      }
      if (left.amount < right.amount) {
        return 1;
      }
      return 0;
    });
    messages.splice(200);
    localStorage.setItem('books', JSON.stringify(messages, null, 0));
    return messages;
  }
};

const initBooks = () => {
  return JSON.parse(localStorage.getItem('books') || '[]');
};

export const BookSlice: any = createSlice({
  name: 'books',
  initialState: {
    loading: true,
    books: initBooks(),
  } as BooksState,
  reducers: {
    setBooks: (state: BooksState, { payload }: { payload: BookObj[] }) => {
      console.log('setBooks', payload);
      state.loading = false;
      state.books = processBooks(payload, state) as BookObj[];
    },
    updateBook: (state: RootState, { payload }: { payload: BookObj }) => {
      console.log('updateBook', payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const BookActions = BookSlice.actions;

export default BookSlice.reducer;
