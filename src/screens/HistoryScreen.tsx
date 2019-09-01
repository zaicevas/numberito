import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Layout, Text, Button, OverflowMenu } from 'react-native-ui-kitten';

// class HistoryScreen extends React.PureComponent {
//   public render() {
//     return (
//       <Layout style={styles.container}>
//         <Text style={styles.text} category="h4">
//           Welcome to UI Kitten
//         </Text>
//         <OverflowMenu>
//           <Button>BUTTON</Button>
//         </OverflowMenu>
//       </Layout>
//     );
//   }
// }

class TheScreen extends React.Component {
  public state = {
    menuVisible: false,
  };
  private items = [
    { text: 'Menu Item 1' },
    { text: 'Menu Item 2' },
    { text: 'Menu Item 3' },
  ];

  public render(): React.ReactNode {
    return (
      <OverflowMenu
        items={this.items}
        visible={this.state.menuVisible}
        onSelect={this.onItemSelect}
        onBackdropPress={this.toggleMenu}
        placement="top start"
      >
        <Button style={{ marginTop: 350 }} onPress={this.toggleMenu}>
          TOGGLE MENU
        </Button>
      </OverflowMenu>
    );
  }

  private onItemSelect = (index: number) => {
    // Handle Menu Item selection
  }

  private toggleMenu = () => {
    this.setState({ menuVisible: !this.state.menuVisible });
  }
}

interface Style {
  container: ViewStyle;
  text: ViewStyle;
}
const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginVertical: 32,
  },
});

export default TheScreen;
