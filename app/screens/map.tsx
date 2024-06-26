import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MapView, { Marker } from 'react-native-maps';
import Modal from 'react-native-modal'
import ModalDropdown from 'react-native-modal-dropdown';
import { Ionicons } from '@expo/vector-icons';



const { height, width } = Dimensions.get('screen')


const parkings = [
  {
    id: 1,
    title: 'Estacionamento Rotativo',
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: -22.78895,
      longitude: -43.30652,
    },

    description: `Descrição sobre este estacionamento:

Desde 2014
Monitorado com câmeras.`,
  },

  {
    id: 2,
    title: 'Estacionamento Reasa',
    price: 4,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: -22.78837,
      longitude: -43.30765,
    },

    description: `Descrição sobre este estacionamento:

Desde 2019
Bem iluminado`,
  },

  {
    id: 3,
    title: 'Estacionamento Baixo Parking',
    price: 7,
    rating: 4.8,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: -22.79010,

      longitude: -43.30557,
    },

    description: `Descrição sobre este estacionamento:

Desde 2021
24 Horas por Dia `,
  },

  {
    id: 4,
    title: 'Estacionamento Braka Park',
    price: 5,
    rating: 4.4,
    spots: 30,
    free: 17,
    coordinate: {
      latitude: -22.80325,

      longitude: -43.36382,
    },

    description: `Descrição sobre este estacionamento:

Desde 2010
24 Horas por Dia `,
  },

  {
    id: 5,
    title: 'Estacionamento Estapar',
    price: 6,
    rating: 3.9,
    spots: 28,
    free: 14,
    coordinate: {
      latitude: -22.79458,

      longitude: -43.29618,
    },

    description: `Descrição sobre este estacionamento:

Desde 2016
Proximo ao Centro`,
  },
] as const;


export default class Map extends React.Component {
  state = {
    hours: {},
    active: null,
    activeModal: null,
  }

  componentDidMount() {
    const hours = {};

    parkings.map(parking => { hours[parking.id] = 1 });

    this.setState({ hours })
  }

  handleHours = (id: any, value: any) => {
    const {hours} = this.state
    
    hours[id] = value;
    
    this.setState({ hours });
  }

    
  

  renderHeader() {

    return (

      <View style={styles.header}>
        <View style={{ flex: 1, justifyContent: 'center', }}>
          <Text style={styles.headerTitle}>Localização atual</Text>
          <Text style={styles.headerLocation}>Duque de Caxias, RJ</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', }}>
          <TouchableWithoutFeedback>
            <Ionicons name="menu-outline" size={30} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  };

  renderParking =(item: any) => {
    const { hours } = this.state;
    const totalPrice = item.price * hours[item.id]

    return (
      <TouchableWithoutFeedback key={`parking-${item.id}`} onPress={() => this.setState({ active: item.id })}>
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours} >
            <Text style={styles.hoursTitle}>x{item.spots} {item.title}{"\n"}</Text>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", }}>
              {this.renderHours2(item.id)}
              <Text style={{ color: "gray", fontSize: 15, }}>hrs           </Text>
            </View>
            {/*<View style={{ width: 100, borderRadius: 6, borderColor: 'grey', borderWidth: 0.5, padding: 4, }}>
              <Text style={{ fontSize: 16 }}>05:00</Text>
            </View>*/}
  
          </View>
          <View style={styles.parkingInfoContainer} >
            <View style={styles.parkingInfo}>

              <View style={styles.parkingIcon}>
                <Ionicons name='pricetag' size={16} color={"#7D818A"} />
                <Text style={{marginLeft: 12,}}>${item.price}</Text>
              </View>
              <View style={styles.parkingIcon}>
                <Ionicons name='star' size={18} color={"#7D818A"} />
                <Text style={{marginLeft: 12,}}>{item.rating}</Text>
              </View>

            </View>
            <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: item })}>


              <View style={styles.buyTotal} >
                <Text style={styles.buyTotalPrice}>$ {totalPrice}</Text>
                <Text style={{ color: 'white' }}>{item.price}x{hours[item.id]} hrs</Text>
              </View>
              <View style={styles.buyBtn} >
                <Text style={{ fontSize: 24, color: 'white' }}>{<Ionicons name='chevron-forward-outline' size={18 * 1.7} color={"#white"} />}</Text>
              </View>

            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  };

  renderParkings =() => {

    return (
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment='center'
        style={styles.parkings}
        data={parkings}
        extraData={this.state.hours}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({ item }) => this.renderParking(item)}
      />
    )
  };
  renderHours(id: any) {
    const {hours} = this.state;
    const availableHours = [1, 2, 3, 4, 5,]

    return(
      <ModalDropdown
        defaultIndex={0}
        defaultValue={`0${hours[id]}:00` || '01:00'}
        options={availableHours}
        style={styles.hoursSelection}
        onSelect={(index,value) => this.handleHours(id, value)}
        textStyle={styles.dropdownText}
        dropdownStyle={styles.hoursDropdownStyle2}
        renderRow={(option, index, isSelected) => <Text style={{paddingVertical: 9,}}>{`0${option}:00`}</Text>}
        renderButtonText={item => {return `0${item}:00`}}
      />
    )
  }
  renderHours2(id: any){ 
    const {hours} = this.state;

    return(
    <ModalDropdown
      defaultIndex={0}
      defaultValue={'01:00'}
      options={[1, 2, 3, 4, 5,]}
      style={styles.hoursSelection}
      onSelect={(index,value) => this.handleHours(id, value)}
      textStyle={styles.dropdownText}
      dropdownStyle={styles.hoursDropdownStyle}
      renderRow={(option, index, isSelected) => <Text style={{paddingVertical: 9,}}>{`0${option}:00`}</Text>}
      renderButtonText={item => {return `0${item}:00`}}
    />
   )
  }
  renderModal() {
    const { activeModal, hours } = this.state;

    if (!activeModal) return null;

    return (

      <Modal
        isVisible
        useNativeDriver
        backdropColor='#C1BEC0'
        style={styles.modalContainer}
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: "null" })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: 16 * 1.5, }}>{activeModal.title}</Text>
          </View>
          <View style={{ paddingVertical: 16, }}>
            <Text style={{ color: "gray", fontSize: 16 * 1.1, }}>{activeModal.description}</Text>
          </View>
          <View style={styles.modalInfo}>
            <View style={[styles.parkingIcon, { justifyContent: 'flex-start' }]}>
              <Ionicons name='pricetag' size={16 * 1.1} color={"#7D818A"} />
              <Text style={{ fontSize: 16 * 1.15 }}>${activeModal.price}</Text>
            </View>
            <View style={[styles.parkingIcon, { justifyContent: 'flex-start' }]}>
              <Ionicons name='star' size={16 * 1.1} color={"#7D818A"} />
              <Text style={{ fontSize: 16 * 1.15 }}>{activeModal.rating}</Text>
            </View>
            <View style={[styles.parkingIcon, { justifyContent: 'flex-start' }]}>
              <Ionicons name='location-sharp' size={16 * 1.1} color={"#7D818A"} />
              <Text style={{ fontSize: 16 * 1.15 }}>{activeModal.price} Km</Text>
            </View>
            <View style={[styles.parkingIcon, { justifyContent: 'flex-start' }]}>
              <Ionicons name='car' size={18 * 1.15} color={"#7D818A"} />
              <Text style={{ fontSize: 16 * 1.1 }}>{activeModal.free} / {activeModal.spots}</Text>
            </View>
          </View>
          <View style={styles.modalHours}>
            <Text style={{ textAlign: "center", fontWeight:'bold',fontSize: 18, }}>Escolha o seu período de reserva:</Text>
            <View style={{flexDirection:"row",justifyContent:'center',alignItems:"center", paddingVertical:0.11,}}>
            {this.renderHours(activeModal.id)}
            </View>
          </View>
          <View>
            <TouchableOpacity style={styles.payBtn}>
              <Text style={styles.payText}>Efetuar Pagamento ${activeModal.price * hours[activeModal.id]}</Text>
              <Ionicons name='chevron-forward-outline' size={18 * 1.75} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal> 
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <MapView
          initialRegion={{
            latitude: -22.78929,
            longitude: -43.30645,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0021,
          }}
          style={styles.map}
        >
          {parkings.map(parking => (
            <Marker
              key={`marker-${parking.id}`}
              coordinate={parking.coordinate}
            >
              <TouchableWithoutFeedback onPress={() => this.setState({ active: parking.id })}>
                <View
                  style={[styles.marker,
                  styles.shadow,
                  this.state.active === parking.id ? styles.active : null
                  ]}>
                  <Text style={styles.markerPrice}> ${parking.price}</Text>
                  <Text style={styles.markerStatus}> ({parking.free}/{parking.spots})</Text>
                </View>
              </TouchableWithoutFeedback>
            </Marker>
          ))}
        </MapView>
        {this.renderParkings()}
        {this.renderModal()}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 16,
    paddingRight: 15,
  },
  headerTitle: {
    color: '#7D818A',
    paddingLeft: 20,
  },
  headerLocation: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 8,
    paddingLeft: 20,
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 23,
  },
  parking: {

    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 24,
    width: width - (24 * 2),
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10 * 1.5,
    paddingRight: 9 * 1.5,
    paddingVertical: 12,
    margin: 4,
    backgroundColor: 'green',
    borderRadius: 6,
    height: 80,
  },
  buyTotal: { flex: 1, justifyContent: 'space-evenly', },
  buyTotalPrice: { fontSize: 25, color: 'white', fontWeight: "600", },
  buyBtn: { flex: 0.3, justifyContent: 'center', alignItems: 'flex-end',  },
  marker: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  markerPrice: { color: 'green', fontWeight: "bold", },
  markerStatus: { color: "#7D818A", },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  active: {
    borderColor: 'green',
  },

  hours: { flex: 1, flexDirection: 'column', marginLeft: 4, },
  hoursTitle: {
    fontSize: 16,
    fontWeight:"500",
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: 'row', },
  parkingInfo: {
    flex: 0.5,
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  parkingIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modal: {
    flexDirection: "column",
    backgroundColor: 'white',
    margin: 0,
    padding: 16 * 1.5,
    height: height * 0.7,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalInfo: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#C1BEC0",
    borderBottomWidth: 1,
    borderBottomColor: "#C1BEC0",

  },
  modalHours: {
    paddingVertical: height * 0.15,
  },
  payBtn: {
    padding: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: 'green',
  },
  payText: {
    fontWeight: "bold",
    fontSize: 16 * 1.2,
    color: "white",
  },
  hoursSelection: {
    flex: 1,
    borderRadius: 8,
    borderColor: '#C1BEC0',
    borderWidth: 0.5,
    padding: 12,
    marginRight: 6,
    width:80,

  },
  dropdownText: {
    paddingHorizontal: 5,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',  
    width: '100%',        
  },
hoursDropdownStyle:{
  marginLeft: -12,
  paddingHorizontal: 17,
  borderRadius:6,
  marginVertical:-13,
},
hoursDropdownStyle2:{
  marginLeft: -13,
  paddingHorizontal: 162.9,
  borderRadius:6,
  marginVertical:-13,
},

}
);

