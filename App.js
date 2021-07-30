import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Image, Modal, Pressable } from 'react-native';
import MarkerComponent, { getRandomCoords } from './Marker';

export default function App() {

  const map = React.useRef(null);

  const [ modalVisible, setModalVisible ] = React.useState(false); 

  const [ markerType, setMarkerType ] = React.useState('default');
  const [ manyMarkers, setManyMarkers ] = React.useState(20);
  const [ markers, setMarkers ] = React.useState([]);

  return (
    <View style={styles.container}>
      <MapView
        provider={'google'}
        style={styles.map}
        ref={async (ref) => {
          if (!map.current) {
            map.current = ref;    
          }         
        }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker, index) => {
          return markerType === 'default' ? <Marker
            key={index}
            coordinate={{
              latitude: marker.coords.lat,
              longitude: marker.coords.lng
            }}
          /> : (markerType === 'view' 
            ? 
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.coords.lat,
                  longitude: marker.coords.lng
                }}
              >
                <View style={{backgroundColor: "red", padding: 10}}>
                  <Text>SF</Text>
                </View>
              </Marker>
            :
              <MarkerComponent key={index} coords={marker.coords} />
        )})}
      </MapView>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 25,
        }}
      >
        <TouchableHighlight
          onPress={async () => setModalVisible(true)}
          underlayColor="#DDDDDD"
          activeOpacity={0.3}
          style={{
            height: 40,
            marginRight: 10,
            justifyContent: 'center',
            padding: 10,
            borderRadius: 50,
            backgroundColor: '#ddd'
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
            }}
            source={{
              uri: 'https://www.irmasclarissas.org.br/wp-content/uploads/2015/08/Map-Marker-PNG-File.png'
            }}
          />
        </TouchableHighlight>
        <View
          style={{
            width: 200,
            height: 50,
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: '#ddd',
            alignItems: 'center',
            flexDirection: 'column'
          }}
        >
          <Text style={{ fontSize: 9 }} >How many markers you want to plot?</Text>
          <TextInput 
            style={{
              color: 'red',
              fontWeight: 'bold'
            }}
            keyboardType='numeric'
            onChangeText={(e) => {
              setManyMarkers(isNaN(parseFloat(e)) ? 1 : parseFloat(e));
            }}
            value={manyMarkers.toString()}
            maxLength={10}
          />
        </View>
        <TouchableHighlight
          onPress={async () => {

            const bounds = await map.current.getMapBoundaries();

            let newMarkers = markers.concat(Array(manyMarkers).fill().map(a => {

              const { lat, lng } = getRandomCoords({
                boundaries: bounds
              });

              return {
                coords: {
                  lat, 
                  lng
                }
              }

            }));
            
            setMarkers(newMarkers);
          
          }}
          underlayColor="#DDDDDD"
          activeOpacity={0.3}
          style={{
            height: 40,
            marginLeft: 10,
            justifyContent: 'center',
            padding: 10,
            borderRadius: 50,
            backgroundColor: '#ddd'
          }}
        >
          <Text style={{ fontWeight: 'bold' }} >GO</Text>
        </TouchableHighlight>
      </View>
      <Modal 
        statusBarTranslucent={true} 
        transparent={true}
        visible={modalVisible}
      >
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{
            width:'100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(10,10,10,0.35)'
          }}
        >
          <Text 
            style={{ 
              fontSize: 15,
              padding: 5,
              backgroundColor: 'rgba(10,10,10,0.35)',
              marginBottom: 10,
              borderRadius: 10,
              color: '#ccc',
              fontWeight: 'bold'
            }}
          >
            CLICK ON BACKGROUND TO BACK
          </Text>

          <View
            style={{
              width: '90%',
              maxWidth: 250,
              backgroundColor: '#bbb',
              height: 90,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#888',
              borderRadius: 5,
              flexDirection: 'column'
            }}
          >
            <Text style={{ fontSize: 10 }}>What type of marker do you want to use?</Text>
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row'
              }}
            >
              <TouchableHighlight 
                style={{ backgroundColor: markerType === 'default' ? 'red' : '#ddd', padding: 5, borderRadius: 5, marginRight: 10 }}
                onPress={() => setMarkerType('default')}
              >
                <Text style={{ fontSize: 10 }}>Default</Text>
              </TouchableHighlight>
              <TouchableHighlight 
                style={{ backgroundColor: markerType === 'view' ? 'red' : '#ddd', padding: 5, borderRadius: 5, marginRight: 10 }}
                onPress={() => setMarkerType('view')}
              >
                <Text style={{ fontSize: 10 }}>View Children</Text>
              </TouchableHighlight>
              <TouchableHighlight 
                style={{ backgroundColor: markerType === 'svg' ? 'red' : '#ddd', padding: 5, borderRadius: 5 }}
                onPress={() => setMarkerType('svg')}
              >
                <Text style={{ fontSize: 10 }}>SVG Children</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  },
});