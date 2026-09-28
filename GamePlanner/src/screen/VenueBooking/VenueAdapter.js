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
const VenueAdapter = props => {
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
            // flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 10,
          }}>
          <View style={{width: '100%', alignItems: 'center'}}>
            {item?.image ? (
              <Image
                style={{height: 200, width: '100%', borderRadius: 10,resizeMode:'cover'}}
                source={{uri: item.image}}
              />
            ) : (
              <Image
                style={{height: 85, width: 85, borderRadius: 10}}
                source={require('../../assets/images/splash.jpg')}
              />
            )}
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.black,marginTop:5},
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
             Contact : +{item?.contact}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Description : {item?.description}
            </Text>
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

export default VenueAdapter;
const {width, height} = Dimensions.get('window');
