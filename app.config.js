module.exports = {
  name: "hospital-app",
  slug: "hospital-app",
  description:
    "Nice and small app to see doctors and hospitals in Lviv oblast and make appointment with them",
  version: "1.0.0",
  platforms: ["android"],
  icon: "/assets/cat-icon.png",
  extra: {
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  expo: {
    scheme: "hospital-app",
  },
  assets: ["./assets/fonts"],
  plugins: ["expo-font", "expo-secure-store"],
};
