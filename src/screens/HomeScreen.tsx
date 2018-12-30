import * as React from "react";
import WholeHomeScreen from "../components/Home/WholeHomeScreen";

class HomeScreen extends React.Component<{ navigation: object }, any> {
  render() {
    return <WholeHomeScreen navigation={this.props.navigation} />;
  }
}

export default HomeScreen;
