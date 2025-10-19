
import React from "react";
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";

interface ServiceHistory {
  id: string;
  service: string;
  date: string;
  status: string;
  price: string;
}

export default function ProfileScreen() {
  const theme = useTheme();

  const serviceHistory: ServiceHistory[] = [
    {
      id: '1',
      service: 'Standard Towing',
      date: 'Jan 15, 2024',
      status: 'Completed',
      price: '$75',
    },
    {
      id: '2',
      service: 'Roadside Assistance',
      date: 'Dec 28, 2023',
      status: 'Completed',
      price: '$50',
    },
    {
      id: '3',
      service: 'Tire Change',
      date: 'Nov 10, 2023',
      status: 'Completed',
      price: '$40',
    },
  ];

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon');
  };

  const handlePaymentMethods = () => {
    Alert.alert('Payment Methods', 'Payment management feature coming soon');
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings feature coming soon');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.contentContainer,
          Platform.OS !== 'ios' && styles.contentContainerWithTabBar
        ]}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <IconSymbol name="person.circle.fill" size={80} color={colors.primary} />
          </View>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <Pressable style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </Pressable>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <IconSymbol name="phone.fill" size={20} color={colors.textSecondary} />
              <Text style={styles.infoText}>+1 (555) 123-4567</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <IconSymbol name="location.fill" size={20} color={colors.textSecondary} />
              <Text style={styles.infoText}>San Francisco, CA</Text>
            </View>
          </View>
        </View>

        {/* Service History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service History</Text>
          {serviceHistory.map((item) => (
            <View key={item.id} style={styles.historyCard}>
              <View style={styles.historyIcon}>
                <IconSymbol name="car.fill" color={colors.primary} size={24} />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyService}>{item.service}</Text>
                <Text style={styles.historyDate}>{item.date}</Text>
              </View>
              <View style={styles.historyRight}>
                <Text style={styles.historyPrice}>{item.price}</Text>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Methods</Text>
          <Pressable style={styles.actionCard} onPress={handlePaymentMethods}>
            <View style={styles.actionCardLeft}>
              <IconSymbol name="creditcard.fill" size={24} color={colors.primary} />
              <Text style={styles.actionCardText}>Manage Payment Methods</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <Pressable style={styles.actionCard} onPress={handleSettings}>
            <View style={styles.actionCardLeft}>
              <IconSymbol name="gear" size={24} color={colors.primary} />
              <Text style={styles.actionCardText}>App Settings</Text>
            </View>
            <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoText: {
    fontSize: 16,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  historyCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  historyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyService: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: colors.success,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  actionCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
});
