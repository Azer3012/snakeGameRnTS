import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import colors from '../values/colors';

interface HeaderProps{
    reloadGame:()=>void;
    pauseGame:()=>void;
    children:JSX.Element;
    isPaused:boolean;
}

const Header:FC<HeaderProps> = ({children,reloadGame,pauseGame,isPaused}):JSX.Element => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={reloadGame}>
            <Text>Reload</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={pauseGame}>
            <Text>{isPaused?"play":"pause"}</Text>
        </TouchableOpacity>
        {children}
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container:{
    flex:0.05,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    borderColor:colors.primary,
    borderWidth:12,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    borderBottomWidth:0,
    padding:15,
    backgroundColor:colors.background

  }
})