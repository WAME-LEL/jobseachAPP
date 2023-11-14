import React from "react";
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native'
import styles from "./nearbyjobs.style"
import { useRouter } from "expo-router";
import {COLORS} from "../../constants"
import useFetch from "../../hook/useFetch";
import NearbyJobCard from "../common/cards/nearby/NearbyJobCard";

const Nearbyjobs = () =>{
    const router = useRouter();
    // const isLoading = false;
    // const error = false;

    const {data, isLoading, error} = useFetch("search", {
        query: "React developer",
        num_pages: "1"
    })
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Text style = {styles.headerTitle}>nearbyjobs</Text>
                <TouchableOpacity>
                    <Text style = {styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>
            <View style = {styles.cardsContainer}>
                {isLoading? (
                    <ActivityIndicator size = "large" color = {COLORS.primary}></ActivityIndicator>
                ):error?(
                    <Text>Something Wrong</Text>
                ):(
                    data?.map((job) => (
                        <NearbyJobCard
                            job = {job}
                            key = {`nearby-job-${job?.job_id}`}
                            handleNavigate={() => router.push(`/job-detail/${job.job_id}`)}/>
                    ))
                )
        
            }

            </View>

        </View>
    )
}

export default Nearbyjobs