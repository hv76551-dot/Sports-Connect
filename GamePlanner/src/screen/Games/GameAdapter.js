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
const GameAdapter = props => {
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
            borderWidth: 1,
            borderColor: Colors.darkGrey,
            paddingHorizontal: 10,
            flexDirection:'row'
          }}>
          <View
            style={{
              width: '25%',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Image
              style={{
                height: 50,
                width: 50,
                resizeMode: 'contain',
              }}
              source={{uri: item.image}}
            />
          </View>
          <View style={{width: '100%', paddingVertical: 10,marginLeft:30}}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.black},
              ]}>
              {item?.name?.toUpperCase()}
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
      // refreshControl={
      //   <RefreshControl
      //     refreshing={props?.refreshing}
      //     onRefresh={props?.onRefresh}
      //   />
      // }
    />
  );
};

export default GameAdapter;
const {width, height} = Dimensions.get('window');
