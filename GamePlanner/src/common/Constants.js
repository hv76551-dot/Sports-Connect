import Colors from './Colors';
import ImageAssets from './ImageAssets';
import {Platform} from 'react-native';

const DEBUG = false;
// API base URL - try these options in order:
// Option 1: Your actual IP (for physical device)
// Option 2: 10.0.2.2 (for Android emulator)
// Option 3: localhost (for testing)
// Use LAN IP in dev so both Android emulator and physical devices can reach backend
// Development: prefer LAN IP so physical Android devices (and iOS simulators)
// can reach the backend. For Android emulators you can still use adb reverse
// (localhost) or rely on the fallback logic in APICall which will try
// localhost, 10.0.2.2 and the LAN IP automatically.
// Use the current PC Wi‑Fi IP so physical devices can reach the dev backend.
// If you switch networks, update this IP accordingly.
// While developing with the Android emulator prefer 10.0.2.2 which routes
// to the host machine. For physical phones use the PC's LAN IP (set or
// update this value when testing on the phone). You can override this in
// the device with adb reverse if needed.
// For physical devices on the same Wi‑Fi network set API_BASE_URL to your
// host machine's LAN address so the phone can reach the backend.
// The backend indicates it is reachable at 192.168.158.165:4000 in this project,
// so use that IP when testing on a physical device.
// When testing over Wi‑Fi on a physical device set this to your host's LAN IP.
// If you keep using adb reverse (USB) switch this back to 'localhost'.
const API_BASE_URL = __DEV__
  ? 'http://localhost:4000/api/' // Use localhost with adb reverse for USB device testing
  : 'https://your-production-server.com/api/'; // Production URL (adjust as needed)

const ADDRESS_URL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
const IMAGE_BASE_URL = '';
const DATE_FORMAT = 'YYYY-MM-DD';
const GOOGLE_API_KEY = 'AIzaSyBT5a-ykF3onLvlIlW4TxHbLmwJlaGFJiY';

export default {
  DEBUG,
  API_BASE_URL,
  IMAGE_BASE_URL,
  DATE_FORMAT,
  ADDRESS_URL,
  GOOGLE_API_KEY,
};

export const genderData = [
  {
    id: '1',
    title: 'Male',
    value: 'Male',
    selected: true,
  },
  {
    id: '2',
    title: 'Female',
    value: 'Female',
    selected: false,
  },
  {
    id: '3',
    title: 'Other',
    value: 'Other',
    selected: false,
  },
];

export const language = [
  {
    id: '1',
    title: 'Hindi',
    value: 'hi',
  },
  {
    id: '2',
    title: 'English',
    value: 'en',
  },
  {
    id: '3',
    title: 'Gujarati',
    value: 'gu',
  },
];

export var fcm_token = '';
export var user_id = '';
export var access_token = '';
export var userData = {};
export var RN_CODEBASE_VERSION = '1.0.0';
export function debugLog(...msg) {
  if (DEBUG === true) console.log(msg);
}