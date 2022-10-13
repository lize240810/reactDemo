import React from "react";
import Hello from './src/view/hello';
import TestList from './src/view/testList';
import SysInfo from './src/view/sysInfo';
import { ScrollView } from "react-native";


const App = () => {
  return (
    <ScrollView>
      <Hello />
      <TestList/>
      <SysInfo/>
    </ScrollView>
  );
};

export default App;
