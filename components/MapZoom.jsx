import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import MapView, { Marker, Polygon } from 'react-native-maps';

const { width, height } = Dimensions.get("window");

const MapZoom = () => {
    const mapRef = useRef(null);
    const [zoomLevel, setZoomLevel] = useState(1); // Initial zoom level
    const [showBoxes, setShowBoxes] = useState(false); // State for showing boxes

    // Define the coordinates for the rectangle
    const rectangleCoordinates = [
        { latitude: 8.526, longitude: 77.579 }, // Top-left
        { latitude: 8.526, longitude: 77.582 }, // Top-right
        { latitude: 8.524, longitude: 77.582 }, // Bottom-right
        { latitude: 8.524, longitude: 77.579 }, // Bottom-left
    ];

    // Calculate center coordinates of the rectangle
    const centerLatitude = (8.526 + 8.524) / 2;
    const centerLongitude = (77.579 + 77.582) / 2;

    // Define the size and positioning of the boxes
    const boxSize = 0.0005; // Size of each box
    const offset = 0.0003; // Offset from the center to place the boxes

    // Define the coordinates and labels for the four boxes inside the rectangle
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
            }, 1000); // 1000ms for animation duration
        }
    };

    // Calculate zoom level based on region change
    const onRegionChange = (region) => {
        const zoom = Math.log2(360 * ((width / 256) / region.longitudeDelta)) - 1;
        const newZoomLevel = Math.round(zoom);
        setZoomLevel(newZoomLevel);
        setShowBoxes(newZoomLevel >= 18); // Update visibility based on zoom level
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
                {/* Polygon representing the rectangular box */}
                <Polygon
                    coordinates={rectangleCoordinates}
                    fillColor="rgba(0, 200, 0, 0.5)"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                />

                {/* Conditionally render the four boxes inside the rectangle if zoom level is 18 or greater */}
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

                {/* Marker to display the text inside the rectangle */}
                <Marker
                    coordinate={{
                        latitude: 8.525, // Center point inside the rectangle
                        longitude: 77.5805, // Center point inside the rectangle
                    }}
                >
                     {!showBoxes &&
                    <View style={styles.calloutContainer}>
                        <Text style={styles.mapText}>Roriri Software Solution</Text>
                    </View>}
                </Marker>
            </MapView>
            <Text style={styles.zoomLevel}>Zoom Level: {zoomLevel}</Text>
            <Button title="Focus on My Location" onPress={focusOnLocation} style={styles.focusButton} />
        </View>
    );
};

const styles = StyleSheet.create({
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
