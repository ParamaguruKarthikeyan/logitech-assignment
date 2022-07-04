import './App.scss';

import { BookObj, Books } from './store/types';

import React from 'react';
import { RootState } from './store/redux';
import logo from './logo.svg';
import { useSelector } from 'react-redux';

function App() {
  const { books }: { books: BookObj[] } = useSelector(
    (state: RootState) => state.books
  );
  return (
    <>
      <div className="table">
        <div className="title">ORDER BOOK BTC/USD</div>
        <div className="header">
          <div className="th lCount">Count</div>
          <div className="th lAmount">Amount</div>
          <div className="th lTotal">Total</div>
          <div className="th lPrice">Price</div>
          <div className="th rPrice">Price</div>
          <div className="th rAmount">Amount</div>
          <div className="th rTotal">Total</div>
          <div className="th rCount">Count</div>
        </div>
        <div className="tbody">
          <div className="sideContainer">
            {books?.map((book, idx: number) => {
              let perc = books[books.length - 1].amount / book.amount / 9;

              return (
                (idx % 2 && (
                  <div className="tr">
                    <svg>
                      <rect
                        x="1"
                        y="0"
                        width="100%"
                        transform={`scale(${perc} 1)`}
                        height="17"
                        fill="green"
                        fill-opacity="0.5"
                      ></rect>
                    </svg>
                    <div className="td count">{book.count}</div>
                    <div className="td amount">{book.amount.toFixed(3)}</div>
                    <div className="td total">{book.amount.toFixed(3)}</div>
                    <div className="td price">
                      {book.price.toLocaleString()}
                    </div>
                  </div>
                )) || <></>
              );
            })}
          </div>
          <div className="sideContainer">
            {books?.map((book, idx: number) => {
              let perc = books[books.length - 1].amount / book.amount / 10;
              return (
                (!(idx % 2) && (
                  <div className="tr">
                    <svg style={{ transform: 'rotateX(0deg)' }}>
                      <rect
                        x="1"
                        y="0"
                        width="100%"
                        transform={`scale(${perc} 1)`}
                        height="17"
                        fill="#7f0000"
                        fill-opacity="0.6"
                      ></rect>
                    </svg>
                    <div className="td count">{book.count}</div>
                    <div className="td amount">{book.amount.toFixed(3)}</div>
                    <div className="td total">{book.amount.toFixed(3)}</div>
                    <div className="td price">
                      {book.price.toLocaleString()}
                    </div>
                  </div>
                )) || <></>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
