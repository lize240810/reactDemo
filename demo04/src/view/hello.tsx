import { Button, Image, Text, TextInput, View } from "react-native";
import React, { useState } from "react";

const Img = {
  source: {
    uri: "https://reactnative.dev/docs/assets/p_cat2.png",
  },
  style: { width: 200, height: 200 },
};
const IptStyle = { height: 40, borderColor: "gray", borderWidth: 1 };


export default function Hello() {
  const [name, setName] = useState("");
  const [isHungry, setIsHungry] = useState(false);

  function handleChange() {
    setIsHungry(!isHungry);
  }


  return (
    <View>
      <Text>
        Try editing me! {name}
        {isHungry ? "正确" : "取消"}
      </Text>

      <Image source={Img.source} style={Img.style} />
      <TextInput defaultValue={name} placeholder="请输入名称" style={IptStyle} onChangeText={text => setName(text)} />
      <Button onPress={handleChange} title={(isHungry ? "" : "取消") + "确认"} />
    </View>
  );
}
