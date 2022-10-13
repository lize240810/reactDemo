import { Text, View } from "react-native";
import { Platform } from 'react-native';

import React from "react";

export default function sysInfo(){
  return(
    <React.Fragment>
      <View>
        <Text>版本号:</Text>
        <Text>{Platform.Version}</Text>
      </View>
    </React.Fragment>
  )
}
