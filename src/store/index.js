import { configureStore } from "@reduxjs/toolkit";
//reducers
import user from './slices/user';
import context from './slices/context';
import indicator from './slices/indicator';
import modules from './slices/modules';

export default configureStore({
    reducer: {
        user,
        context,
        indicator,
        modules
    }
});

