import {useCallback, useState} from 'react'
import {Stack, useRouter, useLocalSearchParams} from 'expo-router'
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native'

import useFetch from '../../hook/useFetch'
import {COLORS, icons} from "../../constants"
import {ScreenHeaderBtn, Company, About, Footer, Specifics, Tabs} from "../../components"

const JobDetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()       //id가 여기에 들어감
    const {data, isLoading, error, refetch} = useFetch("job-details",{
        job_id:params.id
    })
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(()=>{
        setRefreshing(true)
        refetch()
        setRefreshing(false)
    },[])

    return (
        <SafeAreaView style = {{flex:1, backgroundColor:COLORS.lightWhite}}>
            {/* 공통된 레이아웃을 넣기위해 Stack.Screen 사용 */}
            <Stack.Screen   
                options={{
                    headerStyle:{backgroundColor:COLORS.lightWhite},
                    headerShadowVisible:false,
                    headerBackVisible:false,
                    headerLeft:() => (
                    <ScreenHeaderBtn
                        iconUrl={icons.left}
                        dimension="60%"
                        handlePress={()=>router.back()}
                    />),
                    headerRight:() => (
                        <ScreenHeaderBtn
                        iconUrl={icons.share}
                        dimension="60%"
                    />),
                    headerTitle:"",
                    
                    
                }}
            
            />
            <ScrollView showsVerticalScrollIndicator = {false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            >
                <Company/>
                <About/>
                <Footer/>
                <Specifics/>
                <Tabs/>

            </ScrollView>
        </SafeAreaView>
    )
}

export default JobDetails