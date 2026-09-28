// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   Image,
//   TextInput,
// } from 'react-native';
// import ComponentView from '../../common';
// import {useNavigation} from '@react-navigation/native';
// import CustomDropDown from '../../common/CustomDropDown';
// import ImageAssets from '../../common/ImageAssets';
// import CustomDetail from './CustomDetail';
// import {
//   allsportsApi,
//   allVenueApi,
//   createHostGameApi,
//   hostgameallApi,
//   hostgameallByIdApi,
// } from '../../API/APICall';
// import {useDispatch, useSelector} from 'react-redux';
// import {isEmpty, showToast} from '../../common/Helper';
// import {setLoading} from '../../redux/actions/indexActions';
// import CustomDatePicker from '../../common/DatePicker';
// import moment from 'moment';
// import Adapter from './Adapter';
// const {width, height} = Dimensions.get('window');
// const HostGame = props => {
//   const user = useSelector(state => state.indexReducer.user);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     fetchGameDetails();
//     fetchSportsOptions();
//     fetchVenueOptions();
//   }, []);
//   const [selectedTab, setSelectedTab] = useState(0);
//   const [name, setName] = useState('ekana Stadium');
//   const [address, setAddress] = useState('Lucknow');
//   const [image, setImage] = useState('');
//   const [minPlayer, setMinPlayer] = useState('');
//   const [maxPlayer, setMaxPlayer] = useState('');
//   const [joinedPlayer, setJoinedPlayer] = useState('3');
//   const [date, setDate] = useState('');
//   const [skillLevel, setSkillLevel] = useState('Intermediate');
//   const [note, setNote] = useState('');
//   const [chooseSport, setChooseSport] = useState(null);
//   const [selectVenue, setSelectVenue] = useState(null);
//   const [skill, setSkill] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [selectedStartTime, setSelectedStartTime] = useState(null);
//   const [selectedEndTime, setSelectedEndTime] = useState(null);
//   const [timePickerMode, setTimePickerMode] = useState(null);
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [sportsOptions, setSportsOptions] = useState([]);
//   const [VenueOptions, setVenueOptions] = useState([]);
//   const [data, setData] = useState([]);
//   const skillOptions = ['Begineer', 'Advance', 'Professional'];
//   const details = [
//     {title: 'Minimum Player', value: minPlayer},
//     {title: 'Maximum Player', value: maxPlayer},
//     {title: 'Joined Player', value: joinedPlayer},
//     {title: 'Skill Level', value: skillLevel},
//   ];

//   const validate = () => {
//     if (isEmpty(chooseSport)) {
//       showToast('Please select sports');
//     } else if (isEmpty(selectVenue)) {
//       showToast('Please select venue');
//     } else if (isEmpty(minPlayer)) {
//       showToast('Please enter minimum number of players 1 to 10');
//     } else if (isEmpty(maxPlayer)) {
//       showToast('Please enter maximum number of players 1 to 10');
//     } else if (isEmpty(selectedDate)) {
//       showToast('Please select date');
//     } else if (isEmpty(selectedStartTime)) {
//       showToast('Please enter your time slot');
//     } else if (isEmpty(skill)) {
//       showToast('Please select skill level');
//     } else if (isEmpty(note)) {
//       showToast('Please enter notes');
//     } else {
//       handleCreateGame();
//     }
//   };

//   const handleCreateGame = () => {
//     const params = {
//       sportid: chooseSport,
//       venueid: selectVenue,
//       userid: user?._id,
//       minPlayer: minPlayer,
//       maxPlayer: maxPlayer,
//       date: selectedDate,
//       timeslot: selectedStartTime,
//       skillLevel: skill,
//       note: note,
//     };
//     dispatch(setLoading(true));
//     createHostGameApi(params, async res => {
//       dispatch(setLoading(false));
//       if (res.status) {
//         showToast(res?.message);
//         console.log('Created Game:', res);
//         navigation.goBack();
//       } else {
//         showToast(res?.message || 'Failed to create game');
//       }
//     });
//   };
//   const fetchGameDetails = () => {
//     dispatch(setLoading(true));
//     hostgameallByIdApi(
//       async res => {
//         if (res?.status) {
//           setData(res?.data)
//           dispatch(setLoading(false));
//         } else {
//           dispatch(setLoading(false));
//           showToast(res?.message);
//         }
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       },
//     );
//   };
//   const fetchSportsOptions = () => {
//     dispatch(setLoading(true));
//     allsportsApi(
//       async res => {
//         if (res?.status) {
//           dispatch(setLoading(false));
//           const sportsList =
//             res?.data?.map(item => ({
//               label: item.name,
//               value: item._id,
//             })) || [];
//           setSportsOptions(sportsList);
//         } else {
//           dispatch(setLoading(false));
//           showToast(res?.message);
//         }
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       },
//     );
//   };
//   const fetchVenueOptions = () => {
//     dispatch(setLoading(true));
//     allVenueApi(
//       async res => {
//         if (res?.status) {
//           dispatch(setLoading(false));
//           const venueList =
//             res?.data?.map(item => ({
//               label: item.name,
//               value: item._id,
//             })) || [];
//           setVenueOptions(venueList);
//         } else {
//           dispatch(setLoading(false));
//           showToast(res?.message);
//         }
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       },
//     );
//   };

//   console.log(data,'====')
//   return (
//     <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
//       <ComponentView.HeaderBar title="Host Game" />
//       <View
//         style={{
//           width: width * 0.9,
//           paddingVertical: 10,
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//         }}>
//         {['CREATE', 'MY GAMES'].map((tab, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setSelectedTab(index)}
//             style={{
//               backgroundColor:
//                 selectedTab === index
//                   ? ComponentView.Colors.black
//                   : ComponentView.Colors.white,
//               borderWidth: 1,
//               borderColor:
//                 selectedTab === index
//                   ? ComponentView.Colors.border
//                   : ComponentView.Colors.greyborder,
//               width: '48%',
//               paddingVertical: 13,
//               borderRadius: 10,
//               alignItems: 'center',
//               justifyContent: 'center',
//               // marginRight: index === 0 ? 30 : 0,
//             }}>
//             <Text
//               style={{
//                 ...ComponentView.font_style.text_14_600,
//                 color:
//                   selectedTab === index
//                     ? ComponentView.Colors.white
//                     : ComponentView.Colors.black,
//               }}>
//               {tab}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//       {selectedTab === 0 && (
//         <View
//           style={{
//             width: width,
//             paddingVertical: 10,
//           }}>
//           <CustomDropDown
//             inputTitle={'Sports'}
//             righticon={ImageAssets.down}
//             value={
//               sportsOptions.find(sport => sport.value === chooseSport)?.label ||
//               'Choose Sports'
//             }
//             options={sportsOptions.map(sport => sport.label)}
//             onSelect={value => {
//               const selected = sportsOptions.find(
//                 sport => sport.label === value,
//               );
//               setChooseSport(selected?.value);
//             }}
//             container_style={{marginBottom: 15, marginTop: 10}}
//           />
//           <CustomDropDown
//             inputTitle={'Venue'}
//             righticon={ImageAssets.down}
//             value={
//               VenueOptions.find(venue => venue.value === selectVenue)?.label ||
//               'Choose Venue'
//             }
//             options={VenueOptions.map(venue => venue.label)}
//             onSelect={value => {
//               const selectedVenue = VenueOptions.find(
//                 venue => venue.label === value,
//               );
//               setSelectVenue(selectedVenue?.value);
//             }}
//             container_style={{marginBottom: 15, marginTop: 10}}
//           />
//           <View style={{width: width, paddingVertical: 5}}>
//             <ComponentView.Input
//               inputTitle={'Minimum Player'}
//               textInputStyle={{
//                 width: '100%',
//                 borderWidth: 2,
//                 borderRadius: 10,
//                 height: 50,
//                 paddingHorizontal: 8,
//                 marginRight: 10,
//                 borderColor: ComponentView.Colors.greytxt,
//               }}
//               value={minPlayer}
//               onChangeText={value => setMinPlayer(value)}
//               placeholder={'Minimum Player'}
//               keyboardType={ComponentView.KeyBoardType.default}
//             />
//           </View>
//           <View style={{width: width, paddingVertical: 10}}>
//             <ComponentView.Input
//               inputTitle={'Maximum Player'}
//               textInputStyle={{
//                 width: '100%',
//                 borderWidth: 2,
//                 borderRadius: 10,
//                 height: 50,
//                 paddingHorizontal: 10,
//                 marginRight: 10,
//                 borderColor: ComponentView.Colors.greytxt,
//               }}
//               value={maxPlayer}
//               onChangeText={value => setMaxPlayer(value)}
//               placeholder={'Maximun Players'}
//               keyboardType={ComponentView.KeyBoardType.default}
//             />
//           </View>

//           <View style={{width: width, paddingVertical: 5}}>
//             <ComponentView.Input
//               inputTitle={'Date'}
//               textInputStyle={{
//                 width: '100%',
//                 borderWidth: 2,
//                 borderRadius: 10,
//                 height: 50,
//                 paddingHorizontal: 10,
//                 marginRight: 10,
//                 borderColor: ComponentView.Colors.greytxt,
//               }}
//               editable={false}
//               Nav={() => setDatePickerOpen(true)}
//               placeholder={'Date'}
//               onChangeText={value => setDate(value)}
//               value={selectedDate}
//               keyboardType={ComponentView.KeyBoardType.default}
//             />
//           </View>
//           <View style={{width: width, paddingVertical: 5}}>
//             <ComponentView.Input
//               inputTitle={'Time slot'}
//               textInputStyle={{
//                 width: '100%',
//                 borderWidth: 2,
//                 borderRadius: 10,
//                 height: 50,
//                 paddingHorizontal: 10,
//                 marginRight: 10,
//                 borderColor: ComponentView.Colors.greytxt,
//               }}
//               placeholder={'10:00AM - 01:00PM'}
//               value={selectedStartTime}
//               onChangeText={value => setSelectedStartTime(value)}
//               // selectedStartTime && selectedEndTime
//               //   ? `${selectedStartTime.toLocaleTimeString([], {
//               //       hour: '2-digit',
//               //       minute: '2-digit',
//               //     })} - ${selectedEndTime.toLocaleTimeString([], {
//               //       hour: '2-digit',
//               //       minute: '2-digit',
//               //     })}`
//               //   : ''
//               // }
//               // Nav={() => {
//               //   setTimePickerMode('start');
//               //   setTimePickerOpen(true);
//               // }}
//             />
//           </View>

//           {/* <CustomDatePicker
//             mode="date"
//             date={selectedDate}
//             setDate={setSelectedDate}
//             open={datePickerOpen}
//             setOpen={setDatePickerOpen}
//           /> */}
//           <CustomDatePicker
//             open={datePickerOpen}
//             setOpen={setDatePickerOpen}
//             date={selectedDate ? new Date(selectedDate) : new Date()}
//             setDate={setSelectedDate}
//             mode="date"
//             onConfirm={date => {
//               console.log('Date picked:', moment(date).format('YYYY-MM-DD'));
//               setSelectedDate(moment(date).format('DD-MM-YYYY'));
//               setDatePickerOpen(false);
//             }}
//             onCancel={() => {
//               console.log('Date picker cancelled');
//               setDatePickerOpen(false);
//             }}
//           />

//           {/* <CustomDatePicker
//             mode="time"
//             date={selectedStartTime}
//             setDate={date => {
//               setSelectedStartTime(date);
//               setTimePickerMode('end'); // Switch to end time selection
//               setTimePickerOpen(true);
//             }}
//             open={timePickerOpen && timePickerMode === 'start'}
//             setOpen={setTimePickerOpen}
//           />

//           <CustomDatePicker
//             mode="time"
//             date={selectedEndTime}
//             setDate={date => {
//               setSelectedEndTime(date);
//               setTimePickerOpen(false); // Close picker after selecting end time
//             }}
//             open={timePickerOpen && timePickerMode === 'end'}
//             setOpen={setTimePickerOpen}
//           /> */}
//           <View style={{width: width, paddingVertical: 10}}>
//             <CustomDropDown
//               inputTitle={'Skill Level'}
//               righticon={ImageAssets.down}
//               value={skill || 'Skill Level'}
//               options={skillOptions}
//               onSelect={value => {
//                 console.log('Selected Skill:', value);
//                 setSkill(value);
//               }}
//             />
//           </View>
//           <ComponentView.Input
//             inputTitle={'Notes'}
//             textInputStyle={{
//               width: '100%',
//               borderWidth: 2,
//               borderRadius: 10,
//               height: 50,
//               paddingHorizontal: 10,
//               marginRight: 10,
//               borderColor: ComponentView.Colors.greytxt,
//             }}
//             multiline={true}
//             placeholder={'enter your note here'}
//             onChangeText={value => setNote(value)}
//             value={note}
//             keyboardType={ComponentView.KeyBoardType.default}
//           />
//           <ComponentView.Button
//             onPress={() => validate()}
//             btnstyle={{width: '89%', marginTop: 20}}
//             title="SUBMIT"
//           />
//         </View>
//       )}
//       {selectedTab === 1 && (
//         <Adapter data={data}/>
//       )}
//     </ComponentView.MainContainer>
//   );
// };

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: 'row',
//     width: '90%',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingVertical: 15,
//   },
//   button: {
//     width: '46%',
//     height: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: ComponentView.Colors.greyborder, // Ensure this exists
//     borderRadius: 7,
//   },
// });

// export default HostGame;
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TextInput,
// } from 'react-native';
// import ComponentView from '../../common';
// import {useNavigation} from '@react-navigation/native';
// import CustomDropDown from '../../common/CustomDropDown';
// import ImageAssets from '../../common/ImageAssets';
// import {
//   allsportsApi,
//   allVenueApi,
//   createHostGameApi,
//   hostgameallByIdApi,
// } from '../../API/APICall';
// import {useDispatch, useSelector} from 'react-redux';
// import {isEmpty, showToast} from '../../common/Helper';
// import {setLoading} from '../../redux/actions/indexActions';
// import CustomDatePicker from '../../common/DatePicker';
// import moment from 'moment';
// import Adapter from './Adapter';

// const {width, height} = Dimensions.get('window');

// const HostGame = props => {
//   const user = useSelector(state => state.indexReducer.user);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     fetchGameDetails();
//     fetchSportsOptions();
//     fetchVenueOptions();
//   }, []);

//   const [selectedTab, setSelectedTab] = useState(0);
//   const [minPlayer, setMinPlayer] = useState('');
//   const [maxPlayer, setMaxPlayer] = useState('');
//   const [note, setNote] = useState('');
//   const [chooseSport, setChooseSport] = useState(null);
//   const [selectVenue, setSelectVenue] = useState(null);
//   const [skill, setSkill] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [selectedStartTime, setSelectedStartTime] = useState(null);
//   const [selectedEndTime, setSelectedEndTime] = useState(null);
//   const [timePickerMode, setTimePickerMode] = useState(null);
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [sportsOptions, setSportsOptions] = useState([]);
//   const [VenueOptions, setVenueOptions] = useState([]);
//   const [data, setData] = useState([]);
  
//   const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];
//   const joinedPlayer = '0'; // Default value

//   const validate = () => {
//     if (isEmpty(chooseSport)) {
//       showToast('Please select sports');
//       return false;
//     }
//     if (isEmpty(selectVenue)) {
//       showToast('Please select venue');
//       return false;
//     }
//     if (isEmpty(minPlayer) || minPlayer < 1 || minPlayer > 10) {
//       showToast('Please enter minimum number of players (1 to 10)');
//       return false;
//     }
//     if (isEmpty(maxPlayer) || maxPlayer < 1 || maxPlayer > 10 || maxPlayer < minPlayer) {
//       showToast('Please enter valid maximum number of players (1 to 10, greater than minimum)');
//       return false;
//     }
//     if (isEmpty(selectedDate)) {
//       showToast('Please select date');
//       return false;
//     }
//     if (isEmpty(selectedStartTime)) {
//       showToast('Please select start time');
//       return false;
//     }
//     if (isEmpty(selectedEndTime)) {
//       showToast('Please select end time');
//       return false;
//     }
//     if (isEmpty(skill)) {
//       showToast('Please select skill level');
//       return false;
//     }
//     if (isEmpty(note)) {
//       showToast('Please enter notes');
//       return false;
//     }
//     return true;
//   };

//   const handleCreateGame = () => {
//     if (!validate()) return;

//     const params = {
//       sportid: chooseSport,
//       venueid: selectVenue,
//       userid: user?._id,
//       minPlayer: minPlayer,
//       maxPlayer: maxPlayer,
//       date: formatDateForAPI(selectedDate),
//       startTime: formatTimeForAPI(selectedStartTime),
//       endTime: formatTimeForAPI(selectedEndTime),
//       timeslot: `${formatTimeForDisplay(selectedStartTime)} - ${formatTimeForDisplay(selectedEndTime)}`,
//       skillLevel: skill,
//       note: note,
//     };

//     dispatch(setLoading(true));
//     createHostGameApi(params, async res => {
//       dispatch(setLoading(false));
//       if (res.status) {
//         showToast(res?.message);
//         navigation.goBack();
//       } else {
//         showToast(res?.message || 'Failed to create game');
//       }
//     });
//   };

//   // Helper functions
//   const formatDateForDisplay = (date) => {
//     if (!date) return '';
//     return moment(date).format('DD-MM-YYYY');
//   };

//   const formatDateForAPI = (date) => {
//     if (!date) return '';
//     return moment(date).format('YYYY-MM-DD');
//   };

//   const formatTimeForDisplay = (time) => {
//     if (!time) return '';
//     return moment(time).format('hh:mm A');
//   };

//   const formatTimeForAPI = (time) => {
//     if (!time) return '';
//     return moment(time).format('HH:mm:ss');
//   };

//   const fetchGameDetails = () => {
//     dispatch(setLoading(true));
//     hostgameallByIdApi(
//       async res => {
//         if (res?.status) {
//           setData(res?.data);
//         }
//         dispatch(setLoading(false));
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       }
//     );
//   };

//   const fetchSportsOptions = () => {
//     dispatch(setLoading(true));
//     allsportsApi(
//       async res => {
//         if (res?.status) {
//           setSportsOptions(res?.data?.map(item => ({
//             label: item.name,
//             value: item._id,
//           })) || []);
//         }
//         dispatch(setLoading(false));
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       }
//     );
//   };

//   const fetchVenueOptions = () => {
//     dispatch(setLoading(true));
//     allVenueApi(
//       async res => {
//         if (res?.status) {
//           setVenueOptions(res?.data?.map(item => ({
//             label: item.name,
//             value: item._id,
//           })) || []);
//         }
//         dispatch(setLoading(false));
//       },
//       error => {
//         showToast(error?.message);
//         dispatch(setLoading(false));
//       }
//     );
//   };

//   return (
//     <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
//       <ComponentView.HeaderBar title="Host Game" />
      
//       <ScrollView
//         contentContainerStyle={{paddingBottom: 30}}
//         showsVerticalScrollIndicator={false}
//         keyboardShouldPersistTaps="handled"
//       >
//         <View style={styles.tabContainer}>
//           {['CREATE', 'MY GAMES'].map((tab, index) => (
//             <TouchableOpacity
//               key={index}
//               onPress={() => setSelectedTab(index)}
//               style={[
//                 styles.tabButton,
//                 selectedTab === index && styles.activeTab
//               ]}>
//               <Text style={[
//                 styles.tabText,
//                 selectedTab === index && styles.activeTabText
//               ]}>
//                 {tab}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>

//         {selectedTab === 0 && (
//           <View style={styles.formContainer}>
//             {/* Sports Dropdown */}
//             <CustomDropDown
//               inputTitle={'Sports'}
//               righticon={ImageAssets.down}
//               value={sportsOptions.find(sport => sport.value === chooseSport)?.label || 'Choose Sports'}
//               options={sportsOptions.map(sport => sport.label)}
//               onSelect={value => {
//                 const selected = sportsOptions.find(sport => sport.label === value);
//                 setChooseSport(selected?.value);
//               }}
//               container_style={styles.dropdownContainer}
//             />
            
//             {/* Venue Dropdown */}
//             <CustomDropDown
//               inputTitle={'Venue'}
//               righticon={ImageAssets.down}
//               value={VenueOptions.find(venue => venue.value === selectVenue)?.label || 'Choose Venue'}
//               options={VenueOptions.map(venue => venue.label)}
//               onSelect={value => {
//                 const selectedVenue = VenueOptions.find(venue => venue.label === value);
//                 setSelectVenue(selectedVenue?.value);
//               }}
//               container_style={styles.dropdownContainer}
//             />
            
//             {/* Minimum Player Input */}
//             <ComponentView.Input
//               inputTitle={'Minimum Player'}
//               textInputStyle={styles.input}
//               value={minPlayer}
//               onChangeText={value => setMinPlayer(value.replace(/[^0-9]/g, ''))}
//               placeholder={'1-10'}
//               keyboardType={'numeric'}
//             />
            
//             {/* Maximum Player Input */}
//             <ComponentView.Input
//               inputTitle={'Maximum Player'}
//               textInputStyle={styles.input}
//               value={maxPlayer}
//               onChangeText={value => setMaxPlayer(value.replace(/[^0-9]/g, ''))}
//               placeholder={'1-10'}
//               keyboardType={'numeric'}
//             />

//             {/* Date Picker */}
//             <ComponentView.Input
//               inputTitle={'Date'}
//               textInputStyle={styles.input}
//               editable={false}
//               Nav={() => setDatePickerOpen(true)}
//               placeholder={'Select Date'}
//               value={formatDateForDisplay(selectedDate)}
//             />
            
//             {/* Time Pickers */}
//             <View style={styles.timeContainer}>
//               <View style={styles.timeInputContainer}>
//                 <ComponentView.Input
//                   inputTitle={'Start Time'}
//                   textInputStyle={styles.input}
//                   editable={false}
//                   Nav={() => {
//                     setTimePickerMode('start');
//                     setTimePickerOpen(true);
//                   }}
//                   placeholder={'Start Time'}
//                   value={formatTimeForDisplay(selectedStartTime)}
//                 />
//               </View>
//               <View style={styles.timeInputContainer}>
//                 <ComponentView.Input
//                   inputTitle={'End Time'}
//                   textInputStyle={styles.input}
//                   editable={false}
//                   Nav={() => {
//                     setTimePickerMode('end');
//                     setTimePickerOpen(true);
//                   }}
//                   placeholder={'End Time'}
//                   value={formatTimeForDisplay(selectedEndTime)}
//                 />
//               </View>
//             </View>

//             {/* Date Picker Modal */}
//             <CustomDatePicker
//               open={datePickerOpen}
//               setOpen={setDatePickerOpen}
//               date={selectedDate ? new Date(selectedDate) : new Date()}
//               setDate={date => {
//                 setSelectedDate(date);
//                 setDatePickerOpen(false);
//               }}
//               mode="date"
//               minimumDate={new Date()}
//             />

//             {/* Time Picker Modal */}
//             <CustomDatePicker
//               open={timePickerOpen}
//               setOpen={setTimePickerOpen}
//               date={
//                 timePickerMode === 'start' && selectedStartTime 
//                   ? new Date(selectedStartTime)
//                   : timePickerMode === 'end' && selectedEndTime 
//                     ? new Date(selectedEndTime)
//                     : new Date()
//               }
//               setDate={time => {
//                 const selectedTime = new Date(time);
//                 if (timePickerMode === 'start') {
//                   setSelectedStartTime(selectedTime);
//                   // Auto-set end time to 1 hour after start if not set
//                   if (!selectedEndTime) {
//                     const endTime = new Date(selectedTime);
//                     endTime.setHours(endTime.getHours() + 1);
//                     setSelectedEndTime(endTime);
//                   }
//                 } else {
//                   setSelectedEndTime(selectedTime);
//                 }
//               }}
//               mode="time"
//             />

//             {/* Skill Level Dropdown */}
//             <CustomDropDown
//               inputTitle={'Skill Level'}
//               righticon={ImageAssets.down}
//               value={skill || 'Skill Level'}
//               options={skillOptions}
//               onSelect={setSkill}
//               container_style={styles.dropdownContainer}
//             />
            
//             {/* Notes Input */}
//             <ComponentView.Input
//               inputTitle={'Notes'}
//               textInputStyle={[styles.input, {height: 80}]}
//               multiline={true}
//               placeholder={'Enter your note here'}
//               onChangeText={setNote}
//               value={note}
//             />
            
//             {/* Submit Button */}
//             <ComponentView.Button
//               onPress={handleCreateGame}
//               btnstyle={styles.submitButton}
//               title="SUBMIT"
//             />
//           </View>
//         )}
        
//         {selectedTab === 1 && (
//           <Adapter data={data}/>
//         )}
//       </ScrollView>
//     </ComponentView.MainContainer>
//   );
// };

// const styles = StyleSheet.create({
//   tabContainer: {
//     width: width * 0.9,
//     paddingVertical: 10,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   tabButton: {
//     borderWidth: 1,
//     borderColor: ComponentView.Colors.greyborder,
//     width: '48%',
//     paddingVertical: 13,
//     borderRadius: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   activeTab: {
//     backgroundColor: ComponentView.Colors.black,
//     borderColor: ComponentView.Colors.border,
//   },
//   tabText: {
//     ...ComponentView.font_style.text_14_600,
//     color: ComponentView.Colors.black,
//   },
//   activeTabText: {
//     color: ComponentView.Colors.white,
//   },
//   formContainer: {
//     width: width,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//   },
//   dropdownContainer: {
//     marginBottom: 15,
//     marginTop: 10,
//   },
//   input: {
//     width: '100%',
//     borderWidth: 2,
//     borderRadius: 10,
//     height: 50,
//     paddingHorizontal: 10,
//     borderColor: ComponentView.Colors.greytxt,
//   },
//   timeContainer: {
//     flexDirection: 'row',
//     width: width,
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   timeInputContainer: {
//     width: '48%',
//     paddingVertical: 5,
//   },
//   submitButton: {
//     width: '89%',
//     marginTop: 20,
//     alignSelf: 'center',
//   },
// });

// export default HostGame;
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  TextInput,
} from 'react-native';
import ComponentView from '../../common';
import { useNavigation } from '@react-navigation/native';
import CustomDropDown from '../../common/CustomDropDown';
import ImageAssets from '../../common/ImageAssets';
import {
  allsportsApi,
  allVenueApi,
  createHostGameApi,
  hostgameallByIdApi,
} from '../../API/APICall';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, showToast } from '../../common/Helper';
import { setLoading } from '../../redux/actions/indexActions';
import CustomDatePicker from '../../common/DatePicker';
import moment from 'moment';
import Adapter from './Adapter';

const { width, height } = Dimensions.get('window');

const HostGame = props => {
  const user = useSelector(state => state.indexReducer.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchGameDetails();
    fetchSportsOptions();
    fetchVenueOptions();
  }, []);

  const [selectedTab, setSelectedTab] = useState(0);
  const [minPlayer, setMinPlayer] = useState('');
  const [maxPlayer, setMaxPlayer] = useState('');
  const [note, setNote] = useState('');
  const [chooseSport, setChooseSport] = useState(null);
  const [selectVenue, setSelectVenue] = useState(null);
  const [skill, setSkill] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [timePickerMode, setTimePickerMode] = useState(null);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [sportsOptions, setSportsOptions] = useState([]);
  const [VenueOptions, setVenueOptions] = useState([]);
  const [data, setData] = useState([]);
  
  const skillOptions = ['Beginner', 'Intermediate', 'Advanced'];
  const joinedPlayer = '0'; // Default value

  const validate = () => {
    if (isEmpty(chooseSport)) {
      showToast('Please select sports');
      return false;
    }
    if (isEmpty(selectVenue)) {
      showToast('Please select venue');
      return false;
    }
    if (isEmpty(minPlayer) || minPlayer < 1 || minPlayer > 10) {
      showToast('Please enter minimum number of players (1 to 10)');
      return false;
    }
    if (isEmpty(maxPlayer) || maxPlayer < 1 || maxPlayer > 10 || parseInt(maxPlayer) < parseInt(minPlayer)) {
      showToast('Please enter valid maximum number of players (1 to 10, greater than or equal to minimum)');
      return false;
    }
    if (isEmpty(selectedDate)) {
      showToast('Please select date');
      return false;
    }
    if (isEmpty(selectedStartTime)) {
      showToast('Please select start time');
      return false;
    }
    if (isEmpty(selectedEndTime)) {
      showToast('Please select end time');
      return false;
    }
    if (selectedStartTime && selectedEndTime && selectedEndTime <= selectedStartTime) {
      showToast('End time must be after start time');
      return false;
    }
    if (isEmpty(skill)) {
      showToast('Please select skill level');
      return false;
    }
    if (isEmpty(note)) {
      showToast('Please enter notes');
      return false;
    }
    return true;
  };

  const handleCreateGame = () => {
    if (!validate()) return;

    const params = {
      sportid: chooseSport,
      venueid: selectVenue,
      userid: user?._id,
      minPlayer: minPlayer,
      maxPlayer: maxPlayer,
      date: formatDateForAPI(selectedDate),
      startTime: formatTimeForAPI(selectedStartTime),
      endTime: formatTimeForAPI(selectedEndTime),
      timeslot: `${formatTimeForDisplay(selectedStartTime)} - ${formatTimeForDisplay(selectedEndTime)}`,
      skillLevel: skill,
      note: note,
    };

    dispatch(setLoading(true));
    createHostGameApi(params, async res => {
      dispatch(setLoading(false));
      if (res.status) {
        showToast(res?.message);
        navigation.goBack();
      } else {
        showToast(res?.message || 'Failed to create game');
      }
    });
  };

  // Helper functions
  const formatDateForDisplay = (date) => {
    if (!date) return '';
    return moment(date).format('DD-MM-YYYY');
  };

  const formatDateForAPI = (date) => {
    if (!date) return '';
    return moment(date).format('YYYY-MM-DD');
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    return moment(time).format('hh:mm A');
  };

  const formatTimeForAPI = (time) => {
    if (!time) return '';
    return moment(time).format('HH:mm:ss');
  };

  const fetchGameDetails = () => {
    dispatch(setLoading(true));
    hostgameallByIdApi(
      async res => {
        if (res?.status) {
          setData(res?.data);
        }
        dispatch(setLoading(false));
      },
      error => {
        showToast(error?.message);
        dispatch(setLoading(false));
      }
    );
  };

  const fetchSportsOptions = () => {
    dispatch(setLoading(true));
    allsportsApi(
      async res => {
        if (res?.status) {
          setSportsOptions(res?.data?.map(item => ({
            label: item.name,
            value: item._id,
          })) || []);
        }
        dispatch(setLoading(false));
      },
      error => {
        showToast(error?.message);
        dispatch(setLoading(false));
      }
    );
  };

  const fetchVenueOptions = () => {
    dispatch(setLoading(true));
    allVenueApi(
      async res => {
        if (res?.status) {
          setVenueOptions(res?.data?.map(item => ({
            label: item.name,
            value: item._id,
          })) || []);
        }
        dispatch(setLoading(false));
      },
      error => {
        showToast(error?.message);
        dispatch(setLoading(false));
      }
    );
  };

  return (
    <ComponentView.MainContainer bgcolor={ComponentView.Colors.white}>
      <ComponentView.HeaderBar title="Host Game" />
      
      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tabContainer}>
          {['CREATE', 'MY GAMES'].map((tab, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTab(index)}
              style={[
                styles.tabButton,
                selectedTab === index && styles.activeTab
              ]}>
              <Text style={[
                styles.tabText,
                selectedTab === index && styles.activeTabText
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedTab === 0 && (
          <View style={styles.formContainer}>
            {/* Sports Dropdown */}
            <CustomDropDown
              inputTitle={'Sports'}
              righticon={ImageAssets.down}
              value={sportsOptions.find(sport => sport.value === chooseSport)?.label || 'Choose Sports'}
              options={sportsOptions.map(sport => sport.label)}
              onSelect={value => {
                const selected = sportsOptions.find(sport => sport.label === value);
                setChooseSport(selected?.value);
              }}
              container_style={styles.dropdownContainer}
            />
            
            {/* Venue Dropdown */}
            <CustomDropDown
              inputTitle={'Venue'}
              righticon={ImageAssets.down}
              value={VenueOptions.find(venue => venue.value === selectVenue)?.label || 'Choose Venue'}
              options={VenueOptions.map(venue => venue.label)}
              onSelect={value => {
                const selectedVenue = VenueOptions.find(venue => venue.label === value);
                setSelectVenue(selectedVenue?.value);
              }}
              container_style={styles.dropdownContainer}
            />
            
            {/* Minimum Player Input */}
            <ComponentView.Input
              inputTitle={'Minimum Player'}
              textInputStyle={styles.input}
              value={minPlayer}
              onChangeText={value => setMinPlayer(value.replace(/[^0-9]/g, ''))}
              placeholder={'Minimum Player'}
              keyboardType={'numeric'}
            />
            
            {/* Maximum Player Input */}
            <ComponentView.Input
              inputTitle={'Maximum Player'}
              textInputStyle={styles.input}
              value={maxPlayer}
              onChangeText={value => setMaxPlayer(value.replace(/[^0-9]/g, ''))}
              placeholder={'Maximum Player'}
              keyboardType={'numeric'}
            />

            {/* Date Picker */}
            <ComponentView.Input
              inputTitle={'Date'}
              textInputStyle={styles.input}
              editable={false}
              Nav={() => setDatePickerOpen(true)}
              placeholder={'Date'}
              value={formatDateForDisplay(selectedDate)}
            />
            
            {/* Time Section: Start Time and End Time */}
            <View style={styles.timeSection}>
              <View style={styles.timeInputContainer}>
                <ComponentView.Input
                  inputTitle={'Start Time'}
                  textInputStyle={styles.input}
                  editable={false}
                  Nav={() => {
                    setTimePickerMode('start');
                    setTimePickerOpen(true);
                  }}
                  placeholder={'Start Time'}
                  value={formatTimeForDisplay(selectedStartTime)}
                />
              </View>
              <Text style={styles.toText}>to</Text>
              <View style={styles.timeInputContainer}>
                <ComponentView.Input
                  inputTitle={'End Time'}
                  textInputStyle={styles.input}
                  editable={false}
                  Nav={() => {
                    setTimePickerMode('end');
                    setTimePickerOpen(true);
                  }}
                  placeholder={'End Time'}
                  value={formatTimeForDisplay(selectedEndTime)}
                />
              </View>
            </View>

            {/* Date Picker Modal */}
            <CustomDatePicker
              open={datePickerOpen}
              setOpen={setDatePickerOpen}
              date={selectedDate ? new Date(selectedDate) : new Date()}
              setDate={date => {
                setSelectedDate(date);
                setDatePickerOpen(false);
              }}
              mode="date"
              minimumDate={new Date()}
            />

            {/* Time Picker Modal */}
            <CustomDatePicker
              open={timePickerOpen}
              setOpen={setTimePickerOpen}
              date={
                timePickerMode === 'start' && selectedStartTime 
                  ? new Date(selectedStartTime)
                  : timePickerMode === 'end' && selectedEndTime 
                    ? new Date(selectedEndTime)
                    : new Date()
              }
              setDate={time => {
                const selectedTime = new Date(time);
                if (timePickerMode === 'start') {
                  setSelectedStartTime(selectedTime);
                  // Auto-set end time to 1 hour after start if not set or invalid
                  if (!selectedEndTime || selectedEndTime <= selectedTime) {
                    const endTime = new Date(selectedTime);
                    endTime.setHours(endTime.getHours() + 1);
                    setSelectedEndTime(endTime);
                  }
                } else {
                  if (selectedStartTime && selectedTime <= selectedStartTime) {
                    showToast('End time must be after start time');
                    return;
                  }
                  setSelectedEndTime(selectedTime);
                }
                setTimePickerOpen(false);
              }}
              mode="time"
            />

            {/* Skill Level Dropdown */}
            <CustomDropDown
              inputTitle={'Skill Level'}
              righticon={ImageAssets.down}
              value={skill || 'Skill Level'}
              options={skillOptions}
              onSelect={setSkill}
              container_style={styles.dropdownContainer}
            />
            
            {/* Notes Input */}
            <ComponentView.Input
              inputTitle={'Notes'}
              textInputStyle={[styles.input, { height: 50 }]}
              multiline={true}
              placeholder={'Enter your note here'}
              onChangeText={setNote}
              value={note}
            />
            
            {/* Submit Button */}
            <ComponentView.Button
              onPress={handleCreateGame}
              btnstyle={styles.submitButton}
              title="SUBMIT"
            />
          </View>
        )}
        
        {selectedTab === 1 && (
          <Adapter data={data} />
        )}
      </ScrollView>
    </ComponentView.MainContainer>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    width: width * 0.9,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center', // Center the tabs
  },
  tabButton: {
    borderWidth: 1,
    borderColor: ComponentView.Colors.greyborder,
    width: '48%',
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: ComponentView.Colors.black,
    borderColor: ComponentView.Colors.border,
  },
  tabText: {
    ...ComponentView.font_style.text_14_600,
    color: ComponentView.Colors.black,
  },
  activeTabText: {
    color: ComponentView.Colors.white,
  },
  formContainer: {
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center', // Center all form elements
  },
  dropdownContainer: {
    marginBottom: 15,
    marginTop: 10,
    width: '100%', // Full width for dropdowns
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    borderColor: ComponentView.Colors.greytxt,
    marginVertical: 5, // Consistent spacing between inputs
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  timeInputContainer: {
    width: '45%', // Split the time inputs evenly
  },
  toText: {
    ...ComponentView.font_style.text_14_600,
    color: ComponentView.Colors.black,
    marginHorizontal: 10,
  },
  submitButton: {
    width: '90%',
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: ComponentView.Colors.black,
    borderRadius: 10,
    paddingVertical: 15,
  },
});

export default HostGame;