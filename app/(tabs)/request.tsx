
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IconSymbol } from "@/components/IconSymbol";
import { useTheme } from "@react-navigation/native";
import { colors } from "@/styles/commonStyles";
import { Stack, router } from "expo-router";

interface ServiceOption {
  id: string;
  title: string;
  icon: string;
  description: string;
}

export default function RequestScreen() {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const serviceOptions: ServiceOption[] = [
    {
      id: 'towing',
      title: 'Standard Towing',
      icon: 'car.fill',
      description: 'Vehicle breakdown or relocation',
    },
    {
      id: 'roadside',
      title: 'Roadside Assistance',
      icon: 'wrench.fill',
      description: 'Jump start, tire change, fuel',
    },
    {
      id: 'accident',
      title: 'Accident Recovery',
      icon: 'exclamationmark.shield.fill',
      description: 'Post-accident vehicle recovery',
    },
    {
      id: 'transport',
      title: 'Vehicle Transport',
      icon: 'truck.box.fill',
      description: 'Long distance vehicle transport',
    },
  ];

  const vehicleTypes = [
    { id: 'sedan', label: 'Sedan' },
    { id: 'suv', label: 'SUV' },
    { id: 'truck', label: 'Truck' },
    { id: 'motorcycle', label: 'Motorcycle' },
  ];

  const handleSubmit = () => {
    if (!selectedService || !vehicleType || !location) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    console.log('Service request submitted:', {
      service: selectedService,
      vehicleType,
      location,
      description,
    });

    Alert.alert(
      'Request Submitted',
      'Your towing service request has been submitted. A driver will contact you shortly.',
      [
        {
          text: 'OK',
          onPress: () => router.push('/(tabs)/(home)/'),
        },
      ]
    );
  };

  const renderHeaderRight = () => (
    <Pressable
      onPress={() => router.back()}
      style={styles.headerButtonContainer}
    >
      <Text style={[styles.headerButtonText, { color: colors.primary }]}>Cancel</Text>
    </Pressable>
  );

  return (
    <>
      {Platform.OS === 'ios' && (
        <Stack.Screen
          options={{
            title: "Request Service",
            headerRight: renderHeaderRight,
          }}
        />
      )}
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top']}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
        >
          {/* Service Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Service Type</Text>
            <View style={styles.serviceGrid}>
              {serviceOptions.map((service) => (
                <Pressable
                  key={service.id}
                  style={[
                    styles.serviceOption,
                    selectedService === service.id && styles.serviceOptionSelected,
                  ]}
                  onPress={() => setSelectedService(service.id)}
                >
                  <IconSymbol
                    name={service.icon as any}
                    color={selectedService === service.id ? colors.primary : colors.textSecondary}
                    size={32}
                  />
                  <Text
                    style={[
                      styles.serviceOptionTitle,
                      selectedService === service.id && styles.serviceOptionTitleSelected,
                    ]}
                  >
                    {service.title}
                  </Text>
                  <Text style={styles.serviceOptionDescription}>{service.description}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Vehicle Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vehicle Type</Text>
            <View style={styles.vehicleTypeContainer}>
              {vehicleTypes.map((type) => (
                <Pressable
                  key={type.id}
                  style={[
                    styles.vehicleTypeButton,
                    vehicleType === type.id && styles.vehicleTypeButtonSelected,
                  ]}
                  onPress={() => setVehicleType(type.id)}
                >
                  <Text
                    style={[
                      styles.vehicleTypeText,
                      vehicleType === type.id && styles.vehicleTypeTextSelected,
                    ]}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Location Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pickup Location</Text>
            <View style={styles.inputContainer}>
              <IconSymbol name="location.fill" color={colors.textSecondary} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Enter your location"
                placeholderTextColor={colors.textSecondary}
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Issue Description (Optional)</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the issue with your vehicle..."
              placeholderTextColor={colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Request Service</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </>
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
  headerButtonContainer: {
    padding: 8,
  },
  headerButtonText: {
    fontSize: 16,
    fontWeight: '600',
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
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  serviceOption: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  serviceOptionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  serviceOptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  serviceOptionTitleSelected: {
    color: colors.primary,
  },
  serviceOptionDescription: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  vehicleTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vehicleTypeButton: {
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  vehicleTypeButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },
  vehicleTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  vehicleTypeTextSelected: {
    color: colors.primary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  textArea: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.text,
    minHeight: 100,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    boxShadow: '0px 4px 12px rgba(41, 98, 255, 0.3)',
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
