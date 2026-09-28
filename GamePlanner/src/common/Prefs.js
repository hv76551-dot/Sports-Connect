import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from './Constants'

const TOKEN = 'token' + Constants.RN_CODEBASE_VERSION

export async function setPrefs (key, value) {
  return await AsyncStorage.setItem(key, value)
}

export async function getPrefs (key) {
  return await AsyncStorage.getItem(key)
}

export async function setPhoneId (key, value) {
  return await AsyncStorage.setItem(key, value)
}

export async function getPhoneId (key) {
  return await AsyncStorage.getItem(key)
}

export async function setToken (token) {
  return await AsyncStorage.setItem(TOKEN, token)
}
export async function getToken () {
  return await AsyncStorage.getItem(TOKEN)
}

export async function setLocation (key, value) {
  return await AsyncStorage.setItem(key, value)
}

export async function getLocation (key) {
  return await AsyncStorage.getItem(key)
}

export async function clearAll () {
  // return await AsyncStorage.clear();
  try {
    await AsyncStorage.clear()
    await AsyncStorage.removeItem("location")
    console.log('AsyncStorage cleared successfully!')
  } catch (error) {
    console.error('Failed to clear AsyncStorage:', error)
  }
}
