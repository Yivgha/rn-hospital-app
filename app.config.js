module.exports = {
  name: "hospital-app",
  version: "1.0.0",
  extra: {
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  expo: {
    scheme: "hospital-app",
  },
  assets: ["./assets/fonts"],
};
