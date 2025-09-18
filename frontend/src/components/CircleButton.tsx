import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

type CircleButtonProps = {
  title: string;
  onPress: () => void;
  size: number; 
};

export const CircleButton: React.FC<CircleButtonProps> = ({ title, onPress, size }) => {

  const dynamicStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <TouchableOpacity style={[styles.circleButton, dynamicStyle]} onPress={onPress}>
      <Text style={styles.circleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  circleButton: {
    backgroundColor: COLORS.buttonPrimaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  circleButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.buttonPrimaryText,
    textAlign: 'center',
    paddingHorizontal: SPACING.xs,
  },
});