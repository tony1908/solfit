import { registerRootComponent } from 'expo';
import 'react-native-get-random-values';
import { TextDecoder, TextEncoder } from 'text-encoding';
import { install } from 'react-native-quick-crypto';
import { Buffer } from "buffer";
global.Buffer = Buffer;

import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); // Disable all warnings

install();

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;



global.Buffer = Buffer;

/*
polyfill()
*/

import App from './App';

// Register the root component
registerRootComponent(App);
