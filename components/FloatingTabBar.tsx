
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '@/styles/commonStyles';

export interface TabBarItem {
  name: string;
  route: string;
  icon: string;
  label: string;
}

interface FloatingTabBarProps {
  tabs: TabBarItem[];
  containerWidth?: number;
  borderRadius?: number;
  bottomMargin?: number;
}

export default function FloatingTabBar({
  tabs,
  containerWidth = Dimensions.get('window').width - 32,
  borderRadius = 24,
  bottomMargin = 16,
}: FloatingTabBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const activeIndex = tabs.findIndex((tab) => {
    if (tab.route === '/(tabs)/(home)/') {
      return pathname === '/' || pathname.startsWith('/(tabs)/(home)');
    }
    return pathname.includes(tab.name);
  });

  const translateX = useSharedValue(activeIndex >= 0 ? activeIndex : 0);

  React.useEffect(() => {
    if (activeIndex >= 0) {
      translateX.value = withSpring(activeIndex, {
        damping: 20,
        stiffness: 90,
      });
    }
  }, [activeIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    const tabWidth = containerWidth / tabs.length;
    return {
      transform: [{ translateX: translateX.value * tabWidth }],
      width: tabWidth,
    };
  });

  const handleTabPress = (route: string) => {
    console.log('Tab pressed:', route);
    router.push(route as any);
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { bottom: bottomMargin }]}
      edges={['bottom']}
    >
      <View style={[styles.container, { width: containerWidth, borderRadius }]}>
        <BlurView
          intensity={80}
          tint={theme.dark ? 'dark' : 'light'}
          style={[styles.blurView, { borderRadius }]}
        >
          <View style={styles.tabBar}>
            <Animated.View
              style={[
                styles.activeIndicator,
                animatedStyle,
                { backgroundColor: colors.primary },
              ]}
            />
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <TouchableOpacity
                  key={tab.name}
                  style={styles.tab}
                  onPress={() => handleTabPress(tab.route)}
                  activeOpacity={0.7}
                >
                  <IconSymbol
                    name={tab.icon as any}
                    size={24}
                    color={isActive ? '#FFFFFF' : colors.text}
                  />
                  <Text
                    style={[
                      styles.label,
                      { color: isActive ? '#FFFFFF' : colors.text },
                    ]}
                  >
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    overflow: 'hidden',
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    elevation: 8,
  },
  blurView: {
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    height: 64,
    position: 'relative',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    zIndex: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    height: '100%',
    borderRadius: 20,
    zIndex: 1,
  },
});
