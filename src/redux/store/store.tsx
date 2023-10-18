import { 
    createStore, 
    applyMiddleware, 
    // compose 
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
// import { configureStore } from '@reduxjs/toolkit';
//======================================================
// import { configureStore } from '@reduxjs/toolkit';
// import {
//     persistStore,
//     persistReducer,
//     // FLUSH,
//     // REHYDRATE,
//     // PAUSE,
//     // PERSIST,
//     // PURGE,
//     // REGISTER,
// } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// import rootReducer from '../reducers';


// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false
//             // {
//             //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             // },
//         }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
//==================================================================

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false
//             // {
//             //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             // },
//         }),
// })
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk)),
//    composeEnhancers(applyMiddleware(thunk)),
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
