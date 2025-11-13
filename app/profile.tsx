// app/profile.tsx
// Will be interactive some time, this is just concept




import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { BottomNav } from "../components/BottomNav";

const COLORS = {
  background: "#F9F7F2",
  text: "#3A2F22",
  muted: "#9B8A70",
  accent: "#B77A3F",
  chip: "#F1EBE4",
  card: "#FFFFFF",
  borderSoft: "rgba(210,200,185,0.9)",
};

const fakeMemories = [
  { id: "1", title: "Lisbon", subtitle: "May 2025" },
  { id: "2", title: "Amman", subtitle: "Spring" },
  { id: "3", title: "Istanbul", subtitle: "Hostel roof" },
  { id: "4", title: "Barcelona", subtitle: "Night out" },
];


export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Identity block */}
          <View style={styles.topSection}>
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarCircle}>
                {/* Replace this with a real profile image if you have one */}
                <Text style={styles.avatarInitial}>H</Text>
              </View>

              <TouchableOpacity style={styles.avatarEdit}>
                <Text style={styles.avatarEditIcon}>✎</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.nameText}>Your profile</Text>
            <Text style={styles.subtitleText}>Backpacker since 2025</Text>

            <View style={styles.chipsRow}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Hostel enjoyer</Text>
              </View>
              <View style={styles.chip}>
                <Text style={styles.chipText}>Solo traveller</Text>
              </View>
            </View>
          </View>

          {/* Stats row */}  
          <View style={styles.statsRow}>
            <StatCard number="12" label="Backpackers pinned" />
            <StatCard number="7" label="Cities visited" />
            <StatCard number="3" label="Trips this year" />
          </View>

          {/* Goal card */}
          <View style={styles.goalCard}>
            <Text style={styles.goalTitle}>Next goal</Text>
            <Text style={styles.goalText}>Pin ten new backpackers</Text>

            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>

            <Text style={styles.goalCaption}>You are three away from it</Text>
          </View>

          {/* Memories strip */}
          <View style={styles.memoriesSection}>
            <View style={styles.memoriesHeaderRow}>
              <Text style={styles.memoriesTitle}>Recent memories</Text>
              <TouchableOpacity>
                <Text style={styles.memoriesSeeAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.memoriesRow}
            >
              {fakeMemories.map((memory) => (
                <View key={memory.id} style={styles.memoryCard}>
                  {/* Placeholder image block */}
                  <View style={styles.memoryImagePlaceholder}>
                    <Text style={styles.memoryEmoji}>📍</Text>
                  </View>
                  <Text style={styles.memoryTitle}>{memory.title}</Text>
                  <Text style={styles.memorySubtitle}>{memory.subtitle}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Actions */}
          <View style={styles.actionsSection}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <BottomNav active="profile" />
      </View>
    </SafeAreaView>
  );
}

type StatCardProps = {
  number: string;
  label: string;
};

function StatCard({ number, label }: StatCardProps) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 120,
  },

  // identity
  topSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarWrapper: {
    marginBottom: 12,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.chip,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  avatarInitial: {
    fontSize: 50,
    fontWeight: "700",
    color: COLORS.text,
  },
  avatarEdit: {
    position: "absolute",
    bottom: 6,
    right: 6,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.card,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  avatarEditIcon: {
    fontSize: 14,
    color: COLORS.accent,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },
  subtitleText: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.muted,
  },
  chipsRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: COLORS.chip,
  },
  chipText: {
    fontSize: 12,
    color: COLORS.text,
  },

  // stats
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    shadowColor: "#000000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.muted,
  },

  // goal card
  goalCard: {
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 16,
    backgroundColor: "#F1E6D8",
    marginBottom: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  goalTitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 4,
  },
  goalText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 10,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.6)",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    width: "70%",
    borderRadius: 999,
    backgroundColor: COLORS.accent,
  },
  goalCaption: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },

  // memories
  memoriesSection: {
    marginBottom: 26,
  },
  memoriesHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  memoriesTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
  },
  memoriesSeeAll: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "500",
  },
  memoriesRow: {
    paddingVertical: 4,
  },
  memoryCard: {
    width: 120,
    marginRight: 12,
    borderRadius: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  memoryImagePlaceholder: {
    height: 70,
    backgroundColor: "#E3D7C8",
    justifyContent: "center",
    alignItems: "center",
  },
  memoryEmoji: {
    fontSize: 26,
  },
  memoryTitle: {
    paddingHorizontal: 10,
    paddingTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  memorySubtitle: {
    paddingHorizontal: 10,
    paddingBottom: 8,
    paddingTop: 2,
    fontSize: 11,
    color: COLORS.muted,
  },

  // actions
  actionsSection: {
    marginBottom: 16,
  },
  primaryButton: {
    borderRadius: 24,
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 7 },
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  secondaryButton: {
    borderRadius: 24,
    paddingVertical: 13,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: "transparent",
  },
  secondaryButtonText: {
    color: COLORS.accent,
    fontWeight: "500",
    fontSize: 14,
  },
});
