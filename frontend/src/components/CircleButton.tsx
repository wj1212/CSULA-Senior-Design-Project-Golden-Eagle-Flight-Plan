import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

type CircleButtonProps = {
  title: string;
  onPress: () => void;
  size: number;
  points?: number;
  percent?: number;
  color?: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

export const CircleButton: React.FC<CircleButtonProps> = ({
  title,
  onPress,
  size,
  points,
  percent,
  color = COLORS.primary,
  icon,
}) => {
  const iconSize = Math.round(size * 0.21);
  const percentFontSize = Math.round(size * 0.17);

  return (
    <TouchableOpacity
      style={[
        styles.circle,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: color,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {icon && (
        <Ionicons name={icon} size={iconSize} color={color} style={styles.icon} />
      )}
      <Text style={styles.title}>{title}</Text>
      {percent !== undefined && (
        <Text style={[styles.percent, { color, fontSize: percentFontSize }]}>
          {percent}%
        </Text>
      )}
      {points !== undefined && (
        <Text style={styles.pts}>{points} pts</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
  icon: {
    marginBottom: 3,
  },
  title: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: 6,
  },
  percent: {
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 2,
    letterSpacing: -0.5,
  },
  pts: {
    fontSize: 11,
    color: COLORS.muted,
    textAlign: 'center',
    marginTop: 1,
  },
});
