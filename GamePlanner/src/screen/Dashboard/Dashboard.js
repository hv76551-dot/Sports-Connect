import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ComponentView from '../../common';
import {ScreenIdentifiers} from '../../routes';
import HeaderSection from './HeaderSection';
import {bookingConfirmOrCancel, getDetailsAPi, requestBookingListApi} from '../../API/APICall';
import {useDispatch, useSelector} from 'react-redux';
import {setLoading, setUserDetails} from '../../redux/actions/indexActions';
import {showToast} from '../../common/Helper';
import Constants from '../../common/Constants';
import Colors from '../../common/Colors';
import {clearAll} from '../../common/Prefs';
import {CommonActions, useNavigation} from '@react-navigation/native';
import BookingAdapter from './BookingAdapter';
const {width, height} = Dimensions.get('window');
const Dashboard = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.indexReducer.user);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    dispatch(setLoading(true));
    getDetailsAPi(
      async res => {
        if (res?.status) {
          dispatch(setUserDetails(res?.data));
          requestList();
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
          if (res?.message === 'Token expired or invalid') {
            clearAll();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ScreenIdentifiers.LoginScreen}],
              }),
            );
          }
        }
      },
      error => {
        console.log('PROFILE API ERROR ======>>>>>', error);
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  }, []);

  const requestList = () => {
  dispatch(setLoading(true));

  requestBookingListApi(
    async res => {
      console.log('REQUEST API SUCCESS ======>>>>>', res);

      dispatch(setLoading(false)); 

      if (res?.status) {
        setBookings(res?.data || []);
      } else {
        setBookings([]);
        showToast(res?.message || 'An unexpected error occurred');

        if (res?.message === 'Token expired or invalid') {
          clearAll();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: ScreenIdentifiers.LoginScreen }],
            }),
          );
        }
      }
    },
    error => {
      console.log('REQUEST API ERROR ======>>>>>', error);
      showToast(error?.message || 'Network error occurred');
      dispatch(setLoading(false));
    },
  );
};


  const handleConfirmCancel = (id,status) => {
    dispatch(setLoading(true));
    const params = {
      bookingid:id,
      action:status
    }
    bookingConfirmOrCancel(params,
      async res => {
        console.log('BOOKING CONFIRM CANCEL API SUCCESS ======>>>>>', res);
        if (res?.status) {
          requestList();
          showToast(res?.message);
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
          if (res?.message === 'Token expired or invalid') {
            clearAll();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: ScreenIdentifiers.LoginScreen}],
              }),
            );
          }
        }
      },
      error => {
        console.log('BOOKING CONFIRM CANCEL API ERROR ======>>>>>', error);
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  };

  console.log(bookings,'============')

  return (
    <ComponentView.MainContainer hasFlatList={true}>
      <HeaderSection
        userName={user?.name}
        // onMenu={() => props.navigation.openDrawer()}
      />
      {/* <View style={{width: width, paddingVertical: 10}}>
        <Image
          style={{
            width: '90%',
            height: height * 0.22,
            alignSelf: 'center',
            borderRadius: 8,
            resizeMode: 'cover',
          }}
          source={ComponentView.ImagePath.splash}></Image>
      </View> */}
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenIdentifiers.HostGame)}
          style={styles.button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 33,
                height: 33,
                resizeMode: 'contain',
                tintColor: Colors.primary,
              }}
              source={ComponentView.ImagePath.host}></Image>
            <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.darkGrey, marginLeft: 20},
              ]}>
              HOST GAME
            </Text>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: Colors.darkGrey,
            }}
            source={ComponentView.ImagePath.next}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(ScreenIdentifiers.JoinGame)}
          style={styles.button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 35,
                height: 35,
                resizeMode: 'contain',
                tintColor: Colors.primary,
              }}
              source={ComponentView.ImagePath.join}></Image>
            <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.darkGrey, marginLeft: 20},
              ]}>
              JOIN GAME
            </Text>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: Colors.darkGrey,
            }}
            source={ComponentView.ImagePath.next}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        {/* <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(ScreenIdentifiers.VenueBooking)
          }
          style={styles.button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 32,
                height: 32,
                resizeMode: 'contain',
                tintColor: Colors.primary,
              }}
              source={ComponentView.ImagePath.venue}></Image>
            <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.darkGrey, marginLeft: 20},
              ]}>
              BOOK VENUE
            </Text>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: Colors.darkGrey,
            }}
            source={ComponentView.ImagePath.next}></Image>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => props.navigation.navigate(ScreenIdentifiers.ScheduleScreen)} style={styles.button}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: Colors.primary,
              }}
              source={ComponentView.ImagePath.calendar}></Image>
            <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.darkGrey, marginLeft: 20},
              ]}>
              SCHEDULE
            </Text>
          </View>
          <Image
            style={{
              width: 25,
              height: 25,
              resizeMode: 'contain',
              tintColor: Colors.darkGrey,
            }}
            source={ComponentView.ImagePath.next}></Image>
        </TouchableOpacity>
      </View>
      {bookings?.length > 0 && (
        <>
          <View style={{width: '100%', marginTop: 10}}>
            <Text
              style={[
                ComponentView.font_style.text_14_700,
                {color: ComponentView.Colors.darkGrey, marginLeft: 20},
              ]}>
              REQUEST LIST
            </Text>
          </View>
          <BookingAdapter
            data={bookings}
            onConfirm={item => handleConfirmCancel(item?._id,'confirm')}
            onCancel={item => handleConfirmCancel(item?._id,'cancel')}
          />
        </>
      )}
    </ComponentView.MainContainer>
  );
};

const styles = StyleSheet.create({
  row: {
    // flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 10,
  },
  button: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ComponentView.Colors.darkGrey,
    flexDirection: 'row',
    borderRadius: 7,
    marginTop: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
});

export default Dashboard;
