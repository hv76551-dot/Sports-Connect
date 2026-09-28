import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import ComponentView from '../../common';
import {useDispatch} from 'react-redux';
import {allgamesApi,} from '../../API/APICall';
import {setLoading} from '../../redux/actions/indexActions';
import {showToast} from '../../common/Helper';
import GameAdapter from './GameAdapter';
const Games = props => {
  const dispatch = useDispatch();
  const [allGames, setAllGames] = useState([]);

  useEffect(() => {
    dispatch(setLoading(true));
    allgamesApi(
      async res => {
        if (res?.status) {
          dispatch(setLoading(false));
          setAllGames(res?.data);
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
        title="All Games"
        onPress={() => props.navigation.goBack()}
      />
      <GameAdapter data={allGames} />
    </ComponentView.MainContainer>
  );
};
export default Games;
export const {width, height} = Dimensions.get('window');
