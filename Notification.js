'use strict';
/**
 * This exposes the native Notification Activity module as a JS module. This has a
 * function 'notify' which takes the following parameters:
 *
 * 1. String message: A string with the text to notify
 */
import { NativeModules } from 'react-native';

var Notification = NativeModules.Notification;
export { Notification };
