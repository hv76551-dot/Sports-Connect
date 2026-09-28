import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import ComponentView from '../../common';
import VenueAdapter from '../VenueBooking/VenueAdapter';
import {useDispatch} from 'react-redux';
import {allVenueApi} from '../../API/APICall';
import {setLoading} from '../../redux/actions/indexActions';
import {showToast} from '../../common/Helper';
const Venues = props => {
  const dispatch = useDispatch();
  const [allVenue, setAllVenue] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    allVenueApi(
      async res => {
        console.log('Venue API SUCCESS ======>>>>>', res);
        if (res?.status) {
          dispatch(setLoading(false));
          // dispatch(setUserDetails(res?.data))
          setAllVenue(res?.data);
        } else {
          dispatch(setLoading(false));
          showToast(res?.message);
        }
      },
      error => {
        console.log('Venue API ERROR ======>>>>>', error);
        showToast(error?.message);
        dispatch(setLoading(false));
      },
    );
  }, []);
  return (
    <ComponentView.MainContainer>
      <ComponentView.HeaderBar
        title="All Venuess"
        onPress={() => props.navigation.goBack()}
      />
      <VenueAdapter data={allVenue} />
      {/* <ComponentView.Button
        title="Venue"
        onPress={() => props.navigation.navigate(ScreenIdentifiers.CreateVanue)}
      /> */}
    </ComponentView.MainContainer>
  );
};
export default Venues;
export const {width, height} = Dimensions.get('window');
