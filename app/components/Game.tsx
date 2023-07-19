import { StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import colors from '../values/colors';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Coordinate, Direction, GestureEventType } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatsFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Header from './Header';





const snakeInitialPosition = [{ x: 5, y: 5 }]
const foodInitialPosition = { x: 5, y: 20 }
const gameBounds = { xMin: 0, xMax: 35, yMin: 0, yMax: 80 };
const moveInterval = 50;
const scoreIncremenet = 10;

const Game: FC = (): JSX.Element => {

    const [direction, setDirection] = useState<Direction>(Direction.Right);
    const [snake, setSnake] = useState<Coordinate[]>(snakeInitialPosition);
    const [food, setFood] = useState<Coordinate>(foodInitialPosition);
    const [isGameOver,setIsGameOver]=useState<boolean>(false);
    const [isPaused,setIsPaused]=useState<boolean>(false);

    const [score,setScore]=useState<number>(0)



    useEffect(()=>{

        if(!isGameOver){
            const intervalId=setInterval(()=>{
               !isPaused &&  moveSnake()
            },moveInterval)

            return ()=>clearInterval(intervalId)
        }

    },[snake,isGameOver,isPaused])



    const moveSnake=()=>{
        const snakeHead=snake[0];
        const newHead={...snakeHead}; //creating a copy

        //game over

        if(checkGameOver(snakeHead,gameBounds)){
            setIsGameOver(prev=>!prev)
            return;
        }

        switch(direction){
            case Direction.Up:
                newHead.y-=1;
                break;
            case Direction.Down:
                newHead.y+=1;
                break;
            case Direction.Left:
                newHead.x-=1;
                break;
            case Direction.Right:
                newHead.x+=1;
                break;
            default:
                break
        }

        //if eats food

        if(checkEatsFood(newHead,food,2)){

            //get another position for the food

        setFood(randomFoodPosition(gameBounds.xMax,gameBounds.yMax))
        setSnake([newHead,...snake])

        
        setScore(score+scoreIncremenet)

        }
        else{
        setSnake([newHead,...snake.slice(0,-1)])

        }


    }

    const handleGesture = (event: GestureEventType) => {


        const { translationX, translationY } = event.nativeEvent;

        if (Math.abs(translationX) > Math.abs(translationY)) {
            if (translationX > 0) {
                //moving right

                setDirection(Direction.Right)
            }
            else {
                //moving left
                setDirection(Direction.Left)
            }

        }
        else {
            if (translationY > 0) {
                //moving down
                setDirection(Direction.Down)
            }
            else {
                //moving up
                setDirection(Direction.Up)
            }
        }

    }

    const pauseGame=()=>{
        setIsPaused(!isPaused)
    }

    const reloadGame=()=>{
        setSnake(snakeInitialPosition);
        setFood(foodInitialPosition)
        setIsGameOver(false);
        setScore(0);
        setDirection(Direction.Right)
        setIsPaused(false)

    }
    return (
        <PanGestureHandler onGestureEvent={handleGesture}>
            <View style={styles.container}>
                <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
                    <Text>{score}</Text>
                </Header>
                <View style={styles.boundaries}>
                    <Snake snake={snake}/>
                    <Food x={food.x} y={food.y}/>
                </View>
            </View>
        </PanGestureHandler>

    )
}

export default Game;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    boundaries:{
        flex:1,
        borderColor:colors.primary,
        borderWidth:12,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:colors.background
    }
})