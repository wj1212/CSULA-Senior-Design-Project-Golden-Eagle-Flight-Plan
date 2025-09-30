import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { COLORS } from '../constants/colors';
import { SPACING } from '../constants/spacing';

export const Footer: React.FC = () => {
    return (
        <View style={styles.footerContainer}>
            <Image
                source={require('../../../assets/logo-d.png')}
                style={styles.footerLogoImage}
            />
            <Text style={styles.copyrightText}>
                © 2025 Trustees of the California State University
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footerContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'web' ? 0 : -35,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: COLORS.headerBackground,
        paddingTop: SPACING.xl,
        paddingBottom: SPACING.xxl,
    },
    footerLogoImage: {
        width: 150,
        height: 50,
        resizeMode: 'contain',
        marginBottom: SPACING.lg,
    },
    copyrightText: {
        fontSize: 12,
        color: '#888888',
    },
});

