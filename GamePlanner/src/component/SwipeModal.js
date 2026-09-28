import React, {useEffect, useRef} from 'react'
import {View, StyleSheet} from 'react-native'
import {Modalize} from 'react-native-modalize'
import Colors from '../common/Colors'

const SwipeModal = ({visible, onClose, height = 400, children}) => {
  const modalizeRef = useRef(null)

  useEffect(() => {
    if (visible) {
      modalizeRef.current?.open()
    } else {
      modalizeRef.current?.close()
    }
  }, [visible])

  return (
    <Modalize
      ref={modalizeRef}
      modalHeight={height}
      handlePosition='inside'
      handleStyle={styles.handle}
      modalStyle={styles.modalContainer}
      onClosed={onClose}>
      <View style={styles.modalContent}>{children}</View>
    </Modalize>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    // backgroundColor:Colors.white
  },
  handle: {
    backgroundColor: Colors.bgcolor,
    width: 52,
    height: 4,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalContent: {
    alignItems: 'center',
    marginTop: 35,
  },
})

export default SwipeModal
