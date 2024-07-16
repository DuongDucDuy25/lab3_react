import { View, Text } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import ChiTieuScreen from './src/screen/chitieuScreen';

const App = () => {
    return (
        <Provider store={store}>
            <ChiTieuScreen />
        </Provider>
    );
};

export default App;
