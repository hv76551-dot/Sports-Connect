import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import ComponentView from '../../common';
import {useNavigation} from '@react-navigation/native';
import {
  hostgameallApi,
  myRequestApi,
  removeRequestApi,
  requestToJoinApi,
} from '../../API/APICall';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../common/Helper';
import {setLoading} from '../../redux/actions/indexActions';
import Adapter from './Adapter';
import BookingAdapter from './BookingAdapter';
const {width, height} = Dimensions.get('window');
const JoinGame = props => {
  const user = useSelector(state => state.indexReducer.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    fetchGameDetails();
    myBookings();
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  const [mybooking, setMyBooking] = useState([]);
  const [data, setData] = useState([]);

  const fetchGameDetails = () => {
    dispatch(setLoading(true));
    hostgameallApi(
      async res => {
      console.log(res,'===============')

        if (res?.status) {
          setData(res?.data);
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
        }
      },
      error => {
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  };

  const myBookings = () => {
    dispatch(setLoading(true));
    myRequestApi(
      async res => {
        if (res?.status) {
          setMyBooking(res?.data);
          dispatch(setLoading(false));
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
        }
      },
      error => {
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  };

  const handleJoin = id => {
    const params = {
      hostgameid: id,
    };
    dispatch(setLoading(true));
    requestToJoinApi(params, async res => {
      dispatch(setLoading(false));
      if (res.status) {
        showToast(res?.message);
        myBookings();
        setSelectedTab(1)
        console.log('Request send to join', res);
      } else {
        showToast(res?.message || 'Failed to create game');
      }
    });
  };

  const handleRemove = (id) => {
    const params = {
      bookingid: id,
    };
    dispatch(setLoading(true));
    removeRequestApi(params, async res => {
      dispatch(setLoading(false));
      if (res.status) {
        showToast(res?.message);
        myBookings();
        navigation.goBack();
      } else {
        showToast(res?.message || 'Failed to create game');
      }
    });
  }



  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <ComponentView.HeaderBar title="Join Game & View Requests" />
      <View
        style={{
          width: width * 0.9,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        {['EXPLORE', 'REQUESTS'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTab(index)}
            style={{
              backgroundColor:
                selectedTab === index
                  ? ComponentView.Colors.black
                  : ComponentView.Colors.white,
              borderWidth: 1,
              borderColor:
                selectedTab === index
                  ? ComponentView.Colors.border
                  : ComponentView.Colors.greyborder,
              width: '48%',
              paddingVertical: 13,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              // marginRight: index === 0 ? 30 : 0,
            }}>
            <Text
              style={{
                ...ComponentView.font_style.text_14_600,
                color:
                  selectedTab === index
                    ? ComponentView.Colors.white
                    : ComponentView.Colors.black,
              }}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedTab === 0 && (
        <Adapter data={data} onPress={item => handleJoin(item?._id)} />
      )}
      {selectedTab === 1 && <BookingAdapter data={mybooking} onPress={item => handleRemove(item?._id)}/>}
    </ComponentView.MainContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  button: {
    width: '46%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ComponentView.Colors.greyborder, // Ensure this exists
    borderRadius: 7,
  },
});

export default JoinGame;
