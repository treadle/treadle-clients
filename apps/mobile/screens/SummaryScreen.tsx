import { View, Text, Button } from "react-native";

export default function SummaryScreen({navigation, route}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{route.params.distance}</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}