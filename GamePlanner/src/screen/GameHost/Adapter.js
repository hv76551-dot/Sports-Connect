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
const Adapter = props => {
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
          {item?.venueid?.image ? (
            <Image
              style={{
                height: 200,
                width: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{uri: item?.venueid?.image}}
            />
          ) : null}
          <View style={{width: '100%'}}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.black, marginTop: 5},
              ]}>
              Venue name : {item?.venueid?.name}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_14_500,
                {color: ComponentView.Colors.black},
              ]}>
              Sports name : {item?.sportid?.name?.toUpperCase()}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.darkGrey},
              ]}>
              Address : {item?.venueid?.address}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Contact : +{item?.venueid?.contact}
            </Text>
            
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Date & Time : {item?.date} {item?.timeslot}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Minimum Player : {item?.minPlayer}, Maximum Player :{' '}
              {item?.maxPlayer}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Skill Level : {item?.skillLevel}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Note : {item?.note}
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
      ListEmptyComponent={
        <View style={{width:'100%',height:500,alignItems:'center',justifyContent:'center'}}>
          <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.black},
              ]}>
             No game found...
            </Text>
        </View>
      }
    />
  );
};

export default Adapter;
const {width, height} = Dimensions.get('window');
