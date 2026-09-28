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
  getConfirmBookingsApi,
  myRequestApi,
} from '../../API/APICall';
import {useDispatch, useSelector} from 'react-redux';
import {showToast} from '../../common/Helper';
import {setLoading} from '../../redux/actions/indexActions';
import BookingAdapter from './BookingAdapter';
const {width, height} = Dimensions.get('window');
const Schedule = props => {
  const user = useSelector(state => state.indexReducer.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    myBookings();
  }, []);
  const [selectedTab, setSelectedTab] = useState(0);

  const [mybooking, setMyBooking] = useState([]);
  const [data, setData] = useState([]);

 

  const myBookings = () => {
    dispatch(setLoading(true));
    getConfirmBookingsApi(
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

 

  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white} hasFlatList={true}>
      <ComponentView.HeaderBar title="Schedule" />
      <BookingAdapter data={mybooking} />
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
    borderColor: ComponentView.Colors.greyborder, 
    borderRadius: 7,
  },
});

export default Schedule;
