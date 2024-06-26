import { Stack } from "expo-router";
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
      options={{
        title: "Smart Park", 
        headerTitleStyle: {
          fontSize: 24, 
          fontWeight: 'bold',
          fontFamily: '', // Example font family
        },
      }}
   />
  </Stack>
  );
}

