import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Coordinate } from '../types/types';


const getRandomFruitEmoji=()=>{
    const fruitEmojis=["🍎","🍋","🍓","🍉","🍇","🍌"];
    const randomIndex=Math.floor(Math.random()*fruitEmojis.length);
    return fruitEmojis[randomIndex]
}


const Food:FC<Coordinate> = ({x,y}):JSX.Element => {
  return (
    <Text style={[{top:y*10,left:x*10},styles.food]}>🍎</Text>
  )
}

export default Food;

const styles = StyleSheet.create({
  food:{
    width:20,
    height:20,
    borderRadius:7,
    position:"absolute"
  }
})