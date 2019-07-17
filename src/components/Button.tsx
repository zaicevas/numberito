import { LinearGradient } from 'expo';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Theme } from '../constants/index';

class Button extends React.Component<ButtonProps, {}> {
  public static defaultProps = {
    startColor: Theme.colors.primary,
    endColor: Theme.colors.secondary,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0.1, 0.9],
    opacity: 0.8,
    color: Theme.colors.white,
  };

  public render() {
    const {
      style,
      opacity,
      gradient,
      color,
      startColor,
      endColor,
      end,
      start,
      locations,
      shadow,
      children,
      ...props
    } = this.props;

    const buttonStyles = [
      styles.button,
      shadow && styles.shadow,
      color && styles[color], // predefined styles colors for backgroundColor
      color && !styles[color] && { backgroundColor: color }, // custom backgroundColor
      style,
    ];

    if (gradient) {
      return (
        <TouchableOpacity
          style={buttonStyles}
          activeOpacity={opacity}
          {...props}
        >
          <LinearGradient
            start={start}
            end={end}
            locations={locations}
            style={buttonStyles}
            colors={[startColor, endColor]}
          >
            {children}
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={buttonStyles}
        activeOpacity={opacity || 0.8}
        {...props}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.sizes.radius,
    height: Theme.sizes.base * 3,
    justifyContent: 'center',
    marginVertical: Theme.sizes.padding / 3,
  },
  shadow: {
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  accent: { backgroundColor: Theme.colors.accent },
  primary: { backgroundColor: Theme.colors.primary },
  secondary: { backgroundColor: Theme.colors.secondary },
  tertiary: { backgroundColor: Theme.colors.tertiary },
  black: { backgroundColor: Theme.colors.black },
  white: { backgroundColor: Theme.colors.white },
  gray: { backgroundColor: Theme.colors.gray },
  gray2: { backgroundColor: Theme.colors.gray2 },
});

interface ButtonProps {
  style: StyleMedia;
  opacity: number;
  gradient: boolean;
  color: string;
  startColor: string;
  endColor: string;
  start: [number, number];
  end: [number, number];
  locations: number[];
  shadow: {
    shadowColor: string,
    shadowOffset: { width: number, height: number },
    shadowOpacity: number,
    shadowRadius: number,
  };
  children: JSX.Element[];
}

export default Button;
