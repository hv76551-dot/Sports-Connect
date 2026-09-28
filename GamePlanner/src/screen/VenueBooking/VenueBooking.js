import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import ComponentView from '../../common';
import {ScreenIdentifiers} from '../../routes';
import { allbookingApi } from '../../API/APICall';
import { setLoading } from '../../redux/actions/indexActions';
import { useDispatch } from 'react-redux';
import { showToast } from '../../common/Helper';
import BookingAdapter from './BookingAdapter';
const VenueBooking = props => {
  const dispatch=useDispatch();
  const [venue, setVenue] = useState([
    {
      id: 1,
      name: 'Ekana Stadum',
      image1: require('../../assets/images/splash.jpg'),
      address: 'lucknow',
      mobile: '9876543210',
      description:"A venue is simply the place where an event or meeting takes place. "
    },
    {
      id: 1,
      name: 'Ekana Stadum',
      image1: require('../../assets/images/splash.jpg'),
      address: 'lucknow',
      mobile: '9876543210',
      description:"A venue is simply the place where an event or meeting takes place. "
    },
  ]);
   useEffect(() => {
      dispatch(setLoading(true));
      allbookingApi(
        async res => {
          console.log(res,'hello');
          if (res?.status) {
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
    }, []);
  return (
    <ComponentView.MainContainer hasFlatList={true}>
      <ComponentView.HeaderBar
        title="Book A Venue"
        onPress={() => props.navigation.goBack()}
      />
      <BookingAdapter data={venue} />
    </ComponentView.MainContainer>
  );
};
export default VenueBooking;
export const {width, height} = Dimensions.get('window');
