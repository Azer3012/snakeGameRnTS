import { StyleSheet, View } from 'react-native';
import React, { FC, Fragment } from 'react';
import { Coordinate } from '../types/types';
import colors from '../values/colors';

interface SnakeProps{
  snake:Coordinate[];
}

const Snake:FC<SnakeProps> = ({snake}):JSX.Element => {
  return (
    <Fragment>
      {snake.map((segment:Coordinate,index:number)=>{

        const segmentStyle={
            left:segment.x*10,
            top:segment.y*10
        }
        return(
          <View key={index} style={[styles.snake,segmentStyle]}/>
        )
      })}
    </Fragment>
  )
}

export default Snake;

const styles = StyleSheet.create({
  container:{},
  snake:{
    width:15,
    height:15,
    borderRadius:7,
    backgroundColor:colors.primary,
    position:"absolute"
  }
})