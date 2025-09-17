import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type CircleButtonProps = {
  title: string;
  onPress: () => void;
};

export const CircleButton: React.FC<CircleButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.circleButton} onPress={onPress}>
      <Text style={styles.circleButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50, // This creates the circle
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginHorizontal: 5,
  },
  circleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center',
  },
});