import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
  const GOOGLE_PLACES_API_KEY = 'AIzaSyCQb159dbqJypdIO1a1o0v_mNgM5eFqVAo';
  return (
    <View style={styles.container} className="mt-3 w-full h-64">
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
      />
    </View>
  );
};

export default GooglePlacesInput;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
});
