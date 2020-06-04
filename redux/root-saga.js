import { all, call } from 'redux-saga/effects';

import { pedidoSagas } from './pedido/pedido-saga';

export default function* rootSaga() {
    yield all([call(pedidoSagas)]);
}