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
import ImageAssets from '../../common/ImageAssets';
import {font_style} from '../../common/MyStyle';

const PlaceAdapter = props => {
  const renderItem = ({item}) => {
    return (
      <View style={{width: width, paddingVertical: 10}}>
        <View
          style={{
            width: width * 0.88,
            alignSelf: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 7,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{height: 22, width: 22}}
              source={ImageAssets.place}></Image>
            <Text
              style={[
                font_style.text_18_500,
                {color: Colors.blacktxt, left: 10},
              ]}>
              {item?.location}
            </Text>
          </View>
          <View
            style={{
              width: '80%',
              alignSelf: 'center',
              //   paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: Colors.border,
            }}>
            <Text style={[font_style.text_13_500, {color: Colors.darkGrey}]}>
              {item?.place}
            </Text>
            <View style={{flexDirection: 'row', width: '40%'}}>
              <TouchableOpacity
                onPress={props.editbtn}
                style={{width: '50%', paddingVertical: 10}}>
                <Text style={[font_style.text_16_500, {color: Colors.primary}]}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={props.deletebtn}
                style={{width: '50%', paddingVertical: 10}}>
                <Text style={[font_style.text_16_500, {color: Colors.primary}]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
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

export default PlaceAdapter;
const {width, height} = Dimensions.get('window');
