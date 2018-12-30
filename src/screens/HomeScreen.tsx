import * as React from "react";
import WholeHomeScreen from "../components/Home/WholeHomeScreen";

class HomeScreen extends React.Component<{ navigation: any }, any> {
  render() {
    return <WholeHomeScreen navigation={this.props.navigation} smth="hey" />;
  }
}

export default HomeScreen;
