import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { PinchGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated';

const Startup = () => {
    const scale = useSharedValue(1);
    const [showMultipleNames, setShowMultipleNames] = useState(false);
    const [showDeveloperTester, setShowDeveloperTester] = useState(false);

    const pinchHandler = useAnimatedGestureHandler({
        onActive: (event) => {
            scale.value = event.scale;
        },
        onEnd: () => {
            if (scale.value > 2 && !showMultipleNames) {
                // Zoom in to full screen and then show "Project Manager"
                scale.value = withSpring(2, {}, () => {
                    runOnJS(setShowMultipleNames)(true);
                });
            } else if (scale.value < 0.5 && showMultipleNames) {
                // Zoom out to original size and show all names
                scale.value = withSpring(1, {}, () => {
                    runOnJS(setShowMultipleNames)(false);
                });
            } else {
                scale.value = withSpring(1); // Reset scale if conditions are not met
            }
        }
    });

    const tapHandler = useAnimatedGestureHandler({
        onEnd: () => {
            if (showMultipleNames) {
                runOnJS(setShowDeveloperTester)(true);
            }
        }
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View style={styles.containerSetup}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
                <Animated.View style={animatedStyle}>
                    <TapGestureHandler numberOfTaps={2} onGestureEvent={tapHandler}>
                        <Animated.View style={styles.touchableArea}>
                            {!showMultipleNames ? (
                                <View style={styles.firstContain}>
                                    <Text style={styles.nameText}>Roriri Software</Text>
                                </View>
                            ) : (
                                <View style={styles.secondContain}>
                                    {showDeveloperTester ? (
                                        <>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>Developer</Text>
                                            </View>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>Tester</Text>
                                            </View>
                                        </>
                                    ) : scale.value > 2 ? (
                                        <View style={styles.box}>
                                            <Text style={styles.chartText}>Project Manager</Text>
                                        </View>
                                    ) : (
                                        <>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>MD</Text>
                                            </View>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>HR</Text>
                                            </View>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>Project Manager</Text>
                                            </View>
                                            <View style={styles.box}>
                                                <Text style={styles.chartText}>Marketing Manager</Text>
                                            </View>
                                        </>
                                    )}
                                </View>
                            )}
                        </Animated.View>
                    </TapGestureHandler>
                </Animated.View>
            </PinchGestureHandler>
        </View>
    );
};

const styles = StyleSheet.create({
    containerSetup: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    firstContain: {
        alignItems: "center",
        justifyContent: "center",
    },
    secondContain: {
        alignItems: "center",
        justifyContent: "center",
    },
    nameText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    chartText: {
        fontSize: 20,
        marginVertical: 5,
    },
    box: {
        padding: 10,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'lightgray',
        borderRadius: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    touchableArea: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Startup;
