import React from 'react';
import DatePicker from 'react-native-date-picker';

const CustomDatePicker = ({
  mode = 'date',
  date,
  setDate,
  open,
  setOpen,
  onConfirm,
  onCancel
}) => {
  const handleConfirm = (pickedDate) => {
    if (onConfirm) {
      onConfirm(pickedDate);
    } else {
      setDate?.(pickedDate);
      setOpen?.(false);
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      setOpen?.(false);
    }
  };

  return (
    <DatePicker
      modal
      open={open}
      date={date || new Date()}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
};

export default CustomDatePicker;
