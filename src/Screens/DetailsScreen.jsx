/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
//Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DetailsScreen = ({ route }) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get(
          `https://api.yelp.com/v3/businesses/${route.params.restaurantId}`,
          {
            headers: {
              Authorization:
                'Bearer Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx',
            },
          },
        );
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [route.params.restaurantId]);

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>{restaurant.name}</Text>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.coordinates.latitude,
            longitude: restaurant.coordinates.longitude,
          }}
          title={restaurant.name}
        />
      </MapView>
      <Text style={styles.addressText}>{restaurant.location.address1}</Text>
      <Text style={styles.addressText}>
        {restaurant.location.city}, {restaurant.location.state} {restaurant.location.zip_code}
      </Text>
      <FontAwesome name="map-marker" size={24} color="red" style={styles.mapIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  mapContainer: {
    flex: 1,
    marginTop: 16,
  },
  map: {
    flex: 1,
  },
  addressText: {
    margin: 10,
  },
  mapIcon: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});

export default DetailsScreen;
