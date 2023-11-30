import { View, Text, TouchableOpacity, FlatList } from "react-native"
import styles from "./tabs.style"
import { SIZES } from "../../../constants"

function TabButton({ name, activeTab, onHandlerSearchType }) {
    return (
        <TouchableOpacity
            style={styles.btn(name, activeTab)}
            onPress={onHandlerSearchType}
        >
            <Text style={styles.btnText(name, activeTab)}>{name}</Text>
        </TouchableOpacity>

    )
}


const Tabs = ({ tabs, activeTab, setActiveTab }) => {
    return (
        <View>
            <FlatList
                data={tabs}
                horizontal
                showsHorizontalScrollIndicator
                renderItem={({ item }) => (
                    <TabButton
                        name={item}
                        activeTab={activeTab}
                        onHandlerSearchType={()=>setActiveTab(item)}
                
                    
                    />
                        
                    
                )}
                contentContainerStyle={{ columnGap: SIZES.small / 2 }}
                keyExtractor={(item) => item}



            />




        </View>


    )
}

export default Tabs