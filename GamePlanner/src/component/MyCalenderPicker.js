import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import ComponentView from '../common';
import MyFonts from '../common/MyFonts';
import Colors from '../common/Colors';

const MyCalenderPicker = props => {
  const [selectedDate, setSelectedDate] = useState(
    props.selectedDate ? moment(props.selectedDate).toDate() : new Date(),
  );

  useEffect(() => {
    if (
      props.selectedDate &&
      moment(props.selectedDate).toDate() !== selectedDate
    ) {
      setSelectedDate(moment(props.selectedDate).toDate());
    }
  }, [props.selectedDate]);

  return (
    <View style={styles.container}>
      <View style={styles.inner_container}>
        <Text
          style={[
            ComponentView.font_style.text_16_600,
            {color: ComponentView.Colors.blacktxt},
          ]}>
          {'Today'}
        </Text>
        <Text
          style={[
            ComponentView.font_style.text_16_600,
            {color: ComponentView.Colors.blacktxt, marginTop: 8},
          ]}>
          {moment().format('DD MMM, YYYY')}
        </Text>

        <View style={{marginVertical: 15, borderRadius: 8}}>
          <CalendarPicker
            width={296}
            allowRangeSelection={false}
            enableDateChange={true}
            showDayStragglers
            minDate={new Date()}
            maxDate={moment().add(1, 'years').toDate()}
            todayBackgroundColor="transparent"
            selectedStartDate={selectedDate}
            selectedDayColor={Colors.primary}
            selectedDayTextColor="black"
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            customDayHeaderStyles={() => ({
              textStyle: {
                color: ComponentView.Colors.greytxt,
                opacity: 1,
                fontSize: 12,
                fontFamily: MyFonts.Montserrat500,
              },
            })}
            textStyle={{
              color: ComponentView.Colors.blacktxt,
              fontSize: 14,
              fontFamily: MyFonts.Montserrat700,
            }}
            onDateChange={(date, type) => {
              const formattedDate = moment(date).format('YYYY-MM-DD');
              setSelectedDate(moment(date).toDate()); // Update local state
              props.onSelectedDate(formattedDate); // Send date to parent
              props.onClose(); // Close modal
            }}
            previousComponent={
              <Image
                source={require('../assets/images/backarrow.png')}
                style={styles.arrowIcon}
              />
            }
            nextComponent={
              <Image
                source={require('../assets/images/rightarrow.png')}
                style={styles.arrowIcon}
              />
            }
          />
        </View>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={props.onClose} style={styles.cancelButton}>
            <Text
              style={[
                ComponentView.font_style.text_16_500,
                {color: ComponentView.Colors.white},
              ]}>
              {'Cancel'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width,
    padding: 15,
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: 'rgba(48, 48, 48, 0.5)',
    elevation: 6,
  },
  inner_container: {
    backgroundColor: ComponentView.Colors.white,
    borderRadius: 6,
    width: '96%',
    padding: 20,
    alignSelf: 'center',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: ComponentView.Colors.blacktxt,
  },
  cancelButton: {
    padding: 10,
    width: 135,
    backgroundColor: ComponentView.Colors.primary,
    borderRadius: 6,
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyCalenderPicker;
