import { configureStore } from "@reduxjs/toolkit";
//reducers
import user from './slices/user';
import context from './slices/context';
import indicator from './slices/indicator';
import modulo from './slices/modules';
import inputs from './slices/inputs';

export default configureStore({
    reducer: {
        user,
        context,
        indicator,
        modulo,
        inputs
    }
});

