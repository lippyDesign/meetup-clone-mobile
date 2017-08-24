import Expo from 'expo';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Root from './src/Root';

import Colors from './constants/Colors';
import { fontAssets } from './helpers';
import store from './src/redux/store';

EStyleSheet.build(Colors);

class App extends React.Component {
  state = { fontLoaded: false }

  componentDidMount() {
    this._loadAssetsAsync();
  }

  async _loadAssetsAsync() {
    await Promise.all(fontAssets);

    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Expo.AppLoading />;
    }
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
