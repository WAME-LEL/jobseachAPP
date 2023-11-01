import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import styles from "./welcome.style";
import { icons, SIZES } from '../../constants'

const jobTypes = ["Full time", "Part time", "contractor"]

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState("Full time");
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Welcome PARK</Text>
                <Text style={styles.welcomeMessage}>직업찾기:</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput 
                        style={styles.searchInput}
                        value= {searchTerm}
                        onChangeText={(text) => setSearchTerm}
                        placeholder="입력해주세요"
                    />
                </View>

                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image
                        source={icons.search}
                        resizeMode="contain"
                        style={styles.searchBtnImage}
                    
                    />

                </TouchableOpacity>
            </View>
            
            <View style={styles.tabsContainer}>
                <FlatList
                    data = {jobTypes}
                    renderItem={({item})=>(
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={()=>{
                                setActiveJobType(item)
                                router.push(`/search/${item}`)
                            }}
                        >
                            
                            <Text style={styles.tab(activeJobType, item)}>{item}</Text>

                        </TouchableOpacity>
                    )}
                    keyExtractor={(item)=>item}
                    contentContainerStyle = {{columnGap: SIZES.small}}
                    horizontal
                
                
                />

                
            </View>

        </View>

    )
}

export default Welcome;