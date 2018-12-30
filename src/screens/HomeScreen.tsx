import * as React from "react";
import WholeHomeScreen from "../components/Home/WholeHomeScreen";

class HomeScreen extends React.Component<HomeScreenProps, {}> {
  render() {
    return <WholeHomeScreen navigation={this.props.navigation} />;
  }
}

interface HomeScreenProps {
  navigation: {
    navigate: Function;
  };
}

export default HomeScreen;
