import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button, TouchableOpacity } from "react-native";
import MapView, { Marker, Polygon } from 'react-native-maps';

const { width, height } = Dimensions.get("window");

const MapZoom = () => {
    const mapRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1); 
    const [showBoxes, setShowBoxes] = useState(false); 
    const navigation = useNavigation();
    
    const rectangleCoordinates = [
        { latitude: 8.526, longitude: 77.579 }, 
        { latitude: 8.526, longitude: 77.582 }, 
        { latitude: 8.524, longitude: 77.582 }, 
        { latitude: 8.524, longitude: 77.579 }, 
    ];

   
    const centerLatitude = (8.526 + 8.524) / 2;
    const centerLongitude = (77.579 + 77.582) / 2;

    const boxSize = 0.0005; 
    const offset = 0.0003; 

   
    const boxDetails = [
        { latitude: centerLatitude - offset, longitude: centerLongitude - offset, text: zoomLevel >= 20 ? 'CEO\nHR' : 'MD' },
        { latitude: centerLatitude - offset, longitude: centerLongitude + offset, text: zoomLevel >= 20 ? 'Project Manager\nMarketing Manager' : 'HR' },
        { latitude: centerLatitude + offset, longitude: centerLongitude - offset, text: zoomLevel >= 20 ? 'Developer\nTester\nUI & UX' : 'Project Manager' },
        { latitude: centerLatitude + offset, longitude: centerLongitude + offset, text: zoomLevel >= 20 ? 'Content Creater' : 'Marketing Manager' },
    ];

    const focusOnLocation = () => {
        if (mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: 8.52539654583563,
                longitude: 77.58068405206389,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }, 1000); 
        }
    };

    const handleNavigate = () => {
        navigation.navigate('Startup')
    }
  
    const onRegionChange = (region) => {
        const zoom = Math.log2(360 * ((width / 256) / region.longitudeDelta)) - 1;
        const newZoomLevel = Math.round(zoom);
        setZoomLevel(newZoomLevel);
        setShowBoxes(newZoomLevel >= 18);
    };

    return (
        <View style={styles.containerSetup}>
            <MapView
                ref={mapRef}
                style={StyleSheet.absoluteFillObject}
                initialRegion={{
                    latitude: 8.52539654583563,
                    longitude: 77.58068405206389,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                onRegionChange={onRegionChange}
            >
             
                <Polygon
                    coordinates={rectangleCoordinates}
                    fillColor="rgba(0, 200, 0, 0.5)"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                />

              
                {showBoxes && boxDetails.map((box, index) => (
                    <View key={index} style={[styles.boxContainer, { top: height / 2, left: width / 2 }]}>
                        <Polygon
                            coordinates={[
                                { latitude: box.latitude, longitude: box.longitude },
                                { latitude: box.latitude + boxSize, longitude: box.longitude },
                                { latitude: box.latitude + boxSize, longitude: box.longitude + boxSize },
                                { latitude: box.latitude, longitude: box.longitude + boxSize },
                            ]}
                            fillColor="rgba(255, 0, 0, 0.5)"
                            strokeColor="rgba(0,0,0,0.5)"
                            strokeWidth={2}
                        />
                        <Marker
                            coordinate={{ latitude: box.latitude + boxSize / 2, longitude: box.longitude + boxSize / 2 }}
                            title={box.text}
                        >
                            <View style={styles.calloutContainer}>
                                <Text style={styles.chartText}>{box.text}</Text>
                            </View>
                        </Marker>
                    </View>
                ))}

               
                <Marker
                    coordinate={{
                        latitude: 8.525, 
                        longitude: 77.5805, 
                    }}
                >
                     {!showBoxes &&
                    <View style={styles.calloutContainer}>
                        <Text style={styles.mapText}>Roriri Software Solution</Text>
                    </View>}
                </Marker>
            </MapView>
            <TouchableOpacity style={styles.mapDir} onPress={handleNavigate}>
                    <Text>Normal View</Text>
                   </TouchableOpacity>
            <Button title="Focus on My Location" onPress={focusOnLocation} style={styles.focusButton} />
        </View>
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
    mapText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        padding: 5,
        textAlign: 'center',
    },
    chartText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    calloutContainer: {
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
    },
    zoomLevel: {
        position: 'absolute',
        top: 50,
        left: 15,
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
});

export default MapZoom;
