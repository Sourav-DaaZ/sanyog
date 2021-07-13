import AsyncStorage from '@react-native-community/async-storage';
import defaultValue from '../constants/defaultValue';
import Toaster from '../sharedComponents/toster';

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const validate = (value, rules) => {
  let isValid = true;
  if (!rules) {
    return true;
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.password) {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    isValid = pattern.test(value) && isValid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};

export const displayResponse = (msg, type) => {
  if (type === undefined) {
    type = false;
  }
  if (typeof msg === 'string' && defaultValue.debuggingMode && !type) {
    return Toaster(msg, 10000);
  } else if (typeof msg === 'string' && !defaultValue.debuggingMode && !type) {
    return Toaster(msg, 5000);
  } else if (
    (typeof msg !== 'string' && type && defaultValue.debuggingMode) ||
    (typeof msg !== 'string' && !type)
  ) {
    return Toaster(JSON.stringify(msg), 10000);
  }
  return null;
};

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    displayResponse(error);
  }
}

export const _retrieveData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    displayResponse(error);
  }
}

