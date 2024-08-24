import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const MovableText = ({ text }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const panHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            translateX.value = event.translationX;
            translateY.value = event.translationY;
        },
        onEnd: () => {
            // Optionally apply boundaries or smooth transitions
            translateX.value = withSpring(translateX.value);
            translateY.value = withSpring(translateY.value);
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
            ],
        };
    });

    return (
        <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View style={[styles.textContainer, animatedStyle]}>
                <Text style={styles.chartText}>{text}</Text>
            </Animated.View>
        </PanGestureHandler>
    );
};

const Startup = () => {
    const scale = useSharedValue(1);
    const containerTranslateX = useSharedValue(0);
    const containerTranslateY = useSharedValue(0);

    // Pinch gesture handler for zooming
    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale;
        },
        onEnd: () => {
            // Limit the zoom scale to a reasonable range
            if (scale.value < 1) {
                scale.value = withSpring(1);
            } else if (scale.value > 3) {
                scale.value = withSpring(3);
            }
        }
    });

    // Pan gesture handler for moving the entire container
    const panHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            containerTranslateX.value = event.translationX;
            containerTranslateY.value = event.translationY;
        },
        onEnd: () => {
            // Optionally apply boundaries or smooth transitions
            containerTranslateX.value = withSpring(containerTranslateX.value);
            containerTranslateY.value = withSpring(containerTranslateY.value);
        }
    });

    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateX: containerTranslateX.value },
                { translateY: containerTranslateY.value },
            ],
        };
    });

    return (
        <PinchGestureHandler onGestureEvent={pinchHandler}>
            <Animated.View style={styles.container}>
                <PanGestureHandler onGestureEvent={panHandler}>
                    <Animated.View style={[styles.content, containerStyle]}>
                        <MovableText text="Hello World" />
                        <MovableText text="Name 1" />
                        <MovableText text="Name 2" />
                        <MovableText text="Name 3" />
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginVertical: 10,
    },
    chartText: {
        fontSize: 20,
        marginVertical: 5,
    }
});

export default Startup;
