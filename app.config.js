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
    android: {
      package: "com.yivgha.hospitalapp",
    },
    extra: {
      eas: {
        projectId: "212e3173-d32c-40da-b0fb-14e337b0a534",
      },
    },
  },
  assets: ["./assets/fonts"],
  plugins: ["expo-font", "expo-secure-store"],
};
