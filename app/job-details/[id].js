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

const JobDetails = () => {
    const params = useLocalSearchParams()
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
        <Text>{params.id}</Text>
    )
}

export default JobDetails