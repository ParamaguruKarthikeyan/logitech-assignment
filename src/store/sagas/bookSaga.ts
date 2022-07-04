import { END, eventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';

var booksSocket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');
var msg = {
  channel: 'book',
  event: 'subscribe',
  freq: 'f0',
  len: 100,
  prec: 'P0',
  subId: 'book/tBTCUSD/P0',
  symbol: 'tBTCUSD',
};

function getEventChannel() {
  console.log('subscribeAndWatchBooks');
  return eventChannel((emitter) => {
    console.log('Inside eventChannel');
    booksSocket.onopen = () => {
      booksSocket.send(JSON.stringify(msg));
    };
    booksSocket.onmessage = ({ data }) => {
      emitter({ type: 'books/setBooks', payload: JSON.parse(data) });
    };
    const unsubscribe = () => {
      booksSocket.close();
    };
    return unsubscribe;
  });
}

export function* subscribeAndWatchBooks() {
  // @ts-ignore
  const channel: any = yield call(getEventChannel);
  while (true) {
    // @ts-ignore
    const action = yield take(channel);
    yield put(action);
  }
}
