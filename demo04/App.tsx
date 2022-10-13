import React from "react";
import Hello from './src/view/hello';
import TestList from './src/view/testList';
import SysInfo from './src/view/sysInfo';
import TestStyle from './src/view/testStyle';
import { ScrollView } from "react-native";


const App = () => {
  return (
    <ScrollView>
      {/*<Hello />*/}
      {/*<TestList/>*/}
      {/*<SysInfo/>*/}
      <TestStyle/>
    </ScrollView>
  );
};

export default App;
