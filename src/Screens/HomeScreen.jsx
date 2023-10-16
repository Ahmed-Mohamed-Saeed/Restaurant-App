/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
//Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isRowLayout, setIsRowLayout] = useState(true);
  const navigation = useNavigation();

// Api fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.yelp.com/v3/businesses/search',
          {
            headers: {
              Authorization:
                'Bearer Jw0oIMgpId1HV8x-mogAapr36SVRDSAM00qOEvAmLyxCaOV1I0T6kzJbSvazjA6Q7sNS46uHfHzRzLLAESkHYv3ES50h-sUQwtwvh836OsN-D5UwO6ObMswyxDM6YXYx',
            },
            params: {
              location: 'san jose',
              limit: 50,
              term: searchText,
            },
          },
        );
        setRestaurants(response.data.businesses);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchText]);

  const toggleLayout = () => {
    setIsRowLayout(!isRowLayout);
  };


// render Restaurant function
  const renderRestaurantItem = item => {
    if (!item) {
      return null;
    }

    return (
      <TouchableOpacity
        style={
          isRowLayout
            ? [styles.restaurantContainerRow, styles.borderLine]
            : [styles.restaurantContainerColumn, styles.borderLine]
        }
        onPress={() => navigation.navigate('Details', {restaurantId: item.id})}>
        <Image style={styles.restaurantImage} source={{uri: item.image_url}} />
        <View style={styles.restaurantDetails}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
          <Text>Review Count: {item.review_count}</Text>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={toggleLayout}>
          <FontAwesome
            name={isRowLayout ? 'list-ul' : 'columns'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.restaurantList}>
        {restaurants.map(item => (
          <React.Fragment key={item.id}>
            {renderRestaurantItem(item)}
          </React.Fragment>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
  },
  toggleContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 300,
  },
  restaurantContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  restaurantContainerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 16,
    width: '50%',
  },
  restaurantImage: {
    width: 90,
    height: 90,
    marginRight: 55,
    borderRadius: 8,
  },
  restaurantDetails: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantRating: {
    marginTop: 4,
    marginBottom: 8,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 11,
    paddingHorizontal: 11,
    width: '100%',
  },
});

export default HomeScreen;
