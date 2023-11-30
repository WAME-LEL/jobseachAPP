import { useCallback, useState } from 'react'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

import useFetch from '../../hook/useFetch'
import { COLORS, icons } from "../../constants"
import { ScreenHeaderBtn, Company, About, Footer, Specifics, Tabs } from "../../components"
const tabs = ["About", "Qualifications", "Responsibilities"]

const JobDetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()       //id가 여기에 들어감
    const { data, isLoading, error, refetch } = useFetch("job-details", {
        job_id: params.id
    })
    const [refreshing, setRefreshing] = useState(false)
    const [activeTab, setActiveTab] = useState(tabs[0]);
    console.log(data)

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualifications":
                return (<Specifics
                        title = "Qualifications"
                        points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
                />)
            case "About":
                return (<About
                            info={data[0].job_description ?? "No data provided"}
                />)
            case "Responsibilities":
                return (<Specifics
                    title = "Responsibilities"
                    points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
            />)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            {/* 공통된 레이아웃을 넣기위해 Stack.Screen 사용 */}
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />),
                    headerTitle: "",


                }}

            />
            <ScrollView showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary}></ActivityIndicator>
                ) : error ? (
                    <Text>Something Wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data</Text>
                ) : (
                    <View>
                        <Company
                            companyLogo={data[0].employer_logo}
                            jobTitle={data[0].job_title}
                            companyName={data[0].employer_name}
                            location={data[0].job_country}
                        />
                        <Tabs
                            tabs={tabs}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {displayTabContent()}
                        <Footer
                            url = {data[0]?.job_google_link ?? 'https://google.com'}
                        />

                    </View>
                )}


            </ScrollView>
        </SafeAreaView>
    )
}

export default JobDetails