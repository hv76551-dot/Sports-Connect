import React from 'react'
import {TouchableOpacity} from 'react-native'
import Colors from '../common/Colors'
import LinearGradient from 'react-native-linear-gradient'

const LinearGradientView = props => (
  <TouchableOpacity {...props} style={[props.mainstyle]}>
    <LinearGradient
      colors={
        props.colors
          ? props.colors
          : [Colors.primary, Colors.primary, Colors.primary, Colors.secondry]
      }
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={[props.style]}>
      {props.children}
    </LinearGradient>
  </TouchableOpacity>
)

export default LinearGradientView
