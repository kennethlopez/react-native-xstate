import * as Colors from './colors';
import * as Mixins from './mixins';

import {StyleSheet} from "react-native";

const AppStyle =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
        justifyContent: "center",
    },
    buttonLabel: {
        textTransform: "none",
    },
    errorMessage: {
        color: 'red',
        fontSize: 13
    },
    appBar: {
        backgroundColor: Colors.WHITE
    },
    textInput: {
        backgroundColor: Colors.WHITE
    }
});

export {Colors, AppStyle, Mixins};
