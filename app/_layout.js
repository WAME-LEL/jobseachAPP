import {Stack } from "expo-router"
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen"
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync()
export const unstable_settings = {
    initialRouteName:"home"
}

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),

    });
    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync()
        }
    }, [fontsLoaded])

    if(!fontsLoaded){
        return null;
    }

    return(
        <Stack initialRouteName="home"
            onLayout = {onLayoutRootView}>
                
            <Stack.Screen name="home"
                options={{
                    headerTitle: "Home Screen"
                }}


            />


        </Stack>
    )
}


export default Layout;