import { SafeAreaView } from "react-native";
import { Stack } from 'expo-router'
import { COLORS, icons, images, SIZES } from "../constants"
import { ScreenHeaderBtn, Welcome } from "../components";


const Home = () => {
    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.wow} dimension='100%' />
                    ),
                    headerTitle: "Header"
                }}
            />
            <Welcome></Welcome>
        </SafeAreaView>

    )
}

export default Home;