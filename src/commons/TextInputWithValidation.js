import React from 'react';
import { View } from 'react-native';
import { FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';

import { Colors } from '../../constants/Colors';

const TextInputWithValidation = ({ input, label, containerStyle, meta: { touched, error }, ...custom }) => (
  <View style={containerStyle}>
    <FormLabel fontFamily='montserrat' style={{ color: Colors.blackBlueColor }}>
      {label}
    </FormLabel>
    <FormInput {...input} {...custom} />
    {error && touched &&
      <FormValidationMessage fontFamily='montserrat' label={Colors.redColor}>
        {error}
      </FormValidationMessage>
    }
  </View>
);

export default TextInputWithValidation;
