import {
  Text,
  Dimensions,
  FlatList,
  View,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../common/Colors';
import ComponentView from '../../common';
import {useSelector} from 'react-redux';
const BookingAdapter = props => {
  const user = useSelector(state => state.indexReducer.user);
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
          {item?.hostgameid?.venueid?.image ? (
            <Image
              style={{
                height: 200,
                width: '100%',
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{uri: item?.hostgameid?.venueid?.image}}
            />
          ) : null}
          <View style={{width: '100%'}}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.black, marginTop: 5},
              ]}>
              Venue name : {item?.hostgameid?.venueid?.name}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_14_500,
                {color: ComponentView.Colors.black},
              ]}>
              Sports name : {item?.hostgameid?.sportid?.name?.toUpperCase()}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.darkGrey},
              ]}>
              Address : {item?.hostgameid?.venueid?.address}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_12_500,
                {color: ComponentView.Colors.greytxt},
              ]}>
              Date & Time : {item?.hostgameid?.date}{' '}
              {item?.hostgameid?.timeslot}
            </Text>
            <Text
              style={[
                ComponentView.font_style.text_14_500,
                {
                  color:
                    item?.status === 'pending'
                      ? ComponentView.Colors.redtext
                      : ComponentView.Colors.greentxt,
                  textTransform: 'uppercase',
                  marginTop:5
                },
              ]}>
              Request Status: {item?.status}
            </Text>

            {item?.status == 'pending' && (
              <TouchableOpacity
                onPress={() => props.onPress(item)}
                style={{
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Colors.black,
                  borderRadius: 10,
                  marginTop: 10,
                  alignSelf: 'flex-end',
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    ComponentView.font_style.text_13_400,
                    {color: ComponentView.Colors.white},
                  ]}>
                  DELETE REQUEST
                </Text>
              </TouchableOpacity>
            )}
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
        <View
          style={{
            width: '100%',
            height: 500,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              ComponentView.font_style.text_14_700,
              {color: ComponentView.Colors.black},
            ]}>
            No request found...
          </Text>
        </View>
      }
    />
  );
};

export default BookingAdapter;
const {width, height} = Dimensions.get('window');
