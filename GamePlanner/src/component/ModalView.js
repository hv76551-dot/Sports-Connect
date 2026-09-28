import React from 'react';
import {StyleSheet, View, Modal, StatusBar, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export default function ModalView({
  visible = false,
  onClose,
  modalStyle,
  statusBar,
  modalMainContent = () => {},
  mainViewStyle = {},
  innerStyle = {},
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      style={[styles.modalStyle, modalStyle]}>
      <StatusBar backgroundColor={statusBar} />
      <>{modalMainContent()}</>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    width: width,
  },
  centeredView: {
    flex: 1,
  },
});

