
import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Platform, Alert } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import * as Location from 'expo-location';

interface TowingService {
  id: string;
  name: string;
  type: string;
  eta: string;
  distance: string;
  rating: number;
  price: string;
}

export default function HomeScreen() {
  const theme = useTheme();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermission, setLocationPermission] = useState<boolean>(false);

  const towingServices: TowingService[] = [
    {
      id: '1',
      name: 'Quick Tow Services',
      type: 'Standard Towing',
      eta: '15 mins',
      distance: '2.3 miles',
      rating: 4.8,
      price: '$75',
    },
    {
      id: '2',
      name: 'Emergency Roadside',
      type: 'Roadside Assistance',
      eta: '10 mins',
      distance: '1.5 miles',
      rating: 4.9,
      price: '$50',
    },
    {
      id: '3',
      name: 'Heavy Duty Towing',
      type: 'Heavy Vehicle',
      eta: '25 mins',
      distance: '4.1 miles',
      rating: 4.7,
      price: '$150',
    },
  ];

  useEffect(() => {
    (async () => {
      console.log('Requesting location permission...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        setLocationPermission(false);
        return;
      }

      setLocationPermission(true);
      console.log('Location permission granted');
      
      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        console.log('Current location:', currentLocation);
      } catch (error) {
        console.log('Error getting location:', error);
      }
    })();
  }, []);

  const handleServicePress = (service: TowingService) => {
    Alert.alert(
      service.name,
      `Request ${service.type}?\n\nETA: ${service.eta}\nPrice: ${service.price}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Request', onPress: () => console.log('Service requested:', service.name) }
      ]
    );
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => Alert.alert("Notifications", "No new notifications")}
      style={styles.headerButtonContainer}
    >
      <IconSymbol name="bell.fill" color={colors.primary} size={24} />
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Towing Services",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            Platform.OS !== 'ios' && styles.scrollContentWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Location Card */}
          <View style={styles.locationCard}>
            <View style={styles.locationHeader}>
              <IconSymbol name="location.fill" color={colors.primary} size={24} />
              <Text style={styles.locationTitle}>Your Location</Text>
            </View>
            {locationPermission ? (
              <View style={styles.locationInfo}>
                <Text style={styles.locationText}>
                  {location ? 
                    `Lat: ${location.coords.latitude.toFixed(4)}, Lng: ${location.coords.longitude.toFixed(4)}` 
                    : 'Getting location...'}
                </Text>
                <Text style={styles.locationSubtext}>
                  Note: react-native-maps is not supported in Natively. Location services are available via expo-location.
                </Text>
              </View>
            ) : (
              <Text style={styles.locationText}>Location permission required</Text>
            )}
          </View>

          {/* Emergency Button */}
          <Pressable 
            style={styles.emergencyButton}
            onPress={() => Alert.alert('Emergency', 'Calling emergency towing service...')}
          >
            <IconSymbol name="exclamationmark.triangle.fill" color="#FFFFFF" size={28} />
            <Text style={styles.emergencyButtonText}>Emergency Towing</Text>
          </Pressable>

          {/* Available Services */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Services</Text>
            <Text style={styles.sectionSubtitle}>Nearby towing trucks</Text>
          </View>

          {towingServices.map((service) => (
            <Pressable
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
            >
              <View style={styles.serviceIcon}>
                <IconSymbol name="car.fill" color={colors.primary} size={32} />
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceType}>{service.type}</Text>
                <View style={styles.serviceDetails}>
                  <View style={styles.detailItem}>
                    <IconSymbol name="clock.fill" color={colors.textSecondary} size={14} />
                    <Text style={styles.detailText}>{service.eta}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="location.fill" color={colors.textSecondary} size={14} />
                    <Text style={styles.detailText}>{service.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <IconSymbol name="star.fill" color={colors.secondary} size={14} />
                    <Text style={styles.detailText}>{service.rating}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{service.price}</Text>
                <IconSymbol name="chevron.right" color={colors.textSecondary} size={20} />
              </View>
            </Pressable>
          ))}

          {/* Quick Actions */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.quickActionsGrid}>
            <Pressable 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Roadside Assistance', 'Feature coming soon')}
            >
              <IconSymbol name="wrench.fill" color={colors.primary} size={32} />
              <Text style={styles.quickActionText}>Roadside{'\n'}Assistance</Text>
            </Pressable>

            <Pressable 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Accident Recovery', 'Feature coming soon')}
            >
              <IconSymbol name="exclamationmark.shield.fill" color={colors.primary} size={32} />
              <Text style={styles.quickActionText}>Accident{'\n'}Recovery</Text>
            </Pressable>

            <Pressable 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Vehicle Transport', 'Feature coming soon')}
            >
              <IconSymbol name="truck.box.fill" color={colors.primary} size={32} />
              <Text style={styles.quickActionText}>Vehicle{'\n'}Transport</Text>
            </Pressable>

            <Pressable 
              style={styles.quickActionCard}
              onPress={() => Alert.alert('Tire Change', 'Feature coming soon')}
            >
              <IconSymbol name="circle.fill" color={colors.primary} size={32} />
              <Text style={styles.quickActionText}>Tire{'\n'}Change</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  scrollContentWithTabBar: {
    paddingBottom: 100,
  },
  headerButtonContainer: {
    padding: 8,
  },
  locationCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  locationInfo: {
    gap: 8,
  },
  locationText: {
    fontSize: 14,
    color: colors.text,
  },
  locationSubtext: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  emergencyButton: {
    backgroundColor: colors.error,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(244, 67, 54, 0.3)',
    elevation: 5,
  },
  emergencyButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  serviceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  serviceType: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  quickActionCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
    minHeight: 120,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
  },
});
