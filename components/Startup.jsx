import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window");

const Startup = () => {
    const [zoomLevels, setZoomLevels] = useState([1, 1, 1, 1]); 
    const [initialZoom, setInitialZoom] = useState(1); 
    const navigation = useNavigation();

    const boxSize = 140;

    const boxDetails = [
        { text1: 'MD', text2: 'CEO\nHR' },
        { text1: 'HR', text2: 'Project Manager\nMarketing Manager' },
        { text1: 'Project Manager', text2: 'Developer\nTester\nUI & UX' },
        { text1: 'Marketing Manager', text2: 'Content Creator' },
    ];

    const handleInitialPinch = ({ nativeEvent }) => {
        const newScale = nativeEvent.scale;

        setInitialZoom(newScale >= 1.5 ? 2 : 1);
    };

    const handlePinch = (index) => ({ nativeEvent }) => {
        const newScale = nativeEvent.scale;

        setZoomLevels(prevZoomLevels => {
            const newZoomLevels = [...prevZoomLevels];
            newZoomLevels[index] = newScale >= 1.5 ? 2 : 1;
            return newZoomLevels;
        });
    };

    const handleNavigate = () => {
        navigation.navigate('MapZoom')
    }

    return (
        <GestureHandlerRootView style={styles.containerSetup}>
            <PinchGestureHandler onGestureEvent={handleInitialPinch}>
                <View style={styles.container}>
                    {initialZoom === 1 ? (
                        <View style={styles.centerBox}>
                            <Text style={styles.centerText}>
                                Roriri Software Solution
                            </Text>
                        </View>
                    ) : (
                        <View style={styles.boxesWrapper}>
                            <FlatList
                                data={boxDetails}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <PinchGestureHandler onGestureEvent={handlePinch(index)}>
                                        <View style={styles.boxContainer}>
                                            <View style={[styles.box, { width: boxSize, height: boxSize }]}>
                                                <Text style={styles.boxText}>
                                                    {zoomLevels[index] === 2 ? item.text2 : item.text1}
                                                </Text>
                                            </View>
                                        </View>
                                    </PinchGestureHandler>
                                )}
                                contentContainerStyle={styles.scrollViewContent}
                            />
                        </View>
                    )}
                   <TouchableOpacity style={styles.mapDir} onPress={handleNavigate}>
                    <Text>Map View</Text>
                   </TouchableOpacity>
                </View>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({

    mapDir:{
        position:"absolute",
        bottom:20,
        left:20,
        backgroundColor:"#2af53b",
        color:'white',
        padding:15,
        borderRadius:10
    },
    containerSetup: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
    },
    boxesWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
        height: height,
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    boxContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
    },
    box: {
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
});

export default Startup;
