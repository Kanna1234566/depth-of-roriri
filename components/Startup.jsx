import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, runOnUI } from 'react-native-reanimated';
import { PinchGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

const Startup = () => {
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
    const scale = useSharedValue(1); // Shared value for scale (zoom)

    // Define the size and positioning of the boxes
    const boxSize = 50; // Size of each box
    const offset = 100; // Offset from the center to place the boxes

    // Define the coordinates and labels for the four boxes
    const boxDetails = [
        { top: height / 2 - offset - boxSize / 2, left: width / 2 - offset - boxSize / 2, text: zoomLevel >= 20 ? 'CEO\nHR' : 'MD' },
        { top: height / 2 - offset - boxSize / 2, left: width / 2 + offset - boxSize / 2, text: zoomLevel >= 20 ? 'Project Manager\nMarketing Manager' : 'HR' },
        { top: height / 2 + offset - boxSize / 2, left: width / 2 - offset - boxSize / 2, text: zoomLevel >= 20 ? 'Developer\nTester\nUI & UX' : 'Project Manager' },
        { top: height / 2 + offset - boxSize / 2, left: width / 2 + offset - boxSize / 2, text: zoomLevel >= 20 ? 'Content Creator' : 'Marketing Manager' },
    ];

    const handlePinch = (event) => {
        runOnUI(() => {
            scale.value = withSpring(event.scale, { damping: 2 });
            runOnJS(setZoomLevel)(Math.round(event.scale * 10)); // Update zoom level based on pinch scale
        })();
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View style={styles.containerSetup}>
            <PinchGestureHandler onGestureEvent={handlePinch}>
                <Animated.View style={[styles.boxesWrapper, animatedStyle]}>
                    {/* Conditionally render the four boxes */}
                    {boxDetails.map((box, index) => (
                        <View key={index} style={[styles.boxContainer, { top: box.top, left: box.left }]}>
                            <View style={styles.box}>
                                <Text style={styles.boxText}>{box.text}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={[styles.centerBox, animatedStyle]}>
                        <Text style={styles.centerText}>Roriri Software Solution</Text>
                    </View>
                </Animated.View>
            </PinchGestureHandler>
            <Text style={styles.zoomLevel}>Zoom Level: {zoomLevel}</Text>
            <Button title="Reset Zoom" onPress={() => scale.value = withSpring(1)} style={styles.focusButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    containerSetup: {
        flex: 1,
        backgroundColor: 'white',
    },
    boxesWrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    boxContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    boxText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    centerBox: {
        position: 'absolute',
        top: height / 2 - 25,
        left: width / 2 - 75,
        width: 150,
        height: 50,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    zoomLevel: {
        position: 'absolute',
        top: 10,
        left: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    focusButton: {
        position: 'absolute',
        bottom: 50,
        left: 20,
    },
});

export default Startup;
