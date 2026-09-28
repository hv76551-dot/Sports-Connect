import {
  Text,
  Dimensions,
  FlatList,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import Colors from '../../common/Colors';
import ComponentView from '../../common';
const BookingAdapter = props => {
  const renderItem = ({item}) => {
    return (
      <View style={{width: width, paddingVertical: 8}}>
        <View
          style={{
            width: width * 0.88,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: Colors.white,
            borderRadius: 10,
            elevation: 1,
            borderWidth: 0.8,
            borderColor: Colors.lightgreybg,
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Image
              style={{
                height: 200,
                width: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={require('../../assets/images/splash.jpg')}
            />
          </View>
          <View style={{width: '100%', paddingVertical: 5}}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.black, marginTop: 5},
              ]}>
              Venue name : {item?.name}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.darkGrey},
              ]}>
              Address : {item?.address}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Contact : +{item?.mobile}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Description : {item?.description}
            </Text>
            <ComponentView.Button onPress={props.onPress}
              title="Book Venue"
              btnstyle={{
                width: '100%',
                marginTop: 10,
                height:height*0.05,
              }}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      data={props?.data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props?.refreshing}
          onRefresh={props?.onRefresh}
        />
      }
    />
  );
};

export default BookingAdapter;
const {width, height} = Dimensions.get('window');
