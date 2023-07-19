import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import Game from './app/components/Game';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface Props { }

const App: FC<Props> = (): JSX.Element => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
      <Game />
    </GestureHandlerRootView>

  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  }
})