import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {useSelector} from 'react-redux'
import MainRoute from './MainRoute'
import {navigationRef} from './RootNavigation'
import MyLoadingFull from '../common/MyLoadingFull'

export const Router = () => {
  let isLoading = useSelector(state => state.indexReducer.is_loading)
  return (
    <NavigationContainer ref={navigationRef}>
      <MainRoute />
      {isLoading && <MyLoadingFull />}
    </NavigationContainer>
  )
}
