import { View, Text, Button } from "react-native";

export default function SummaryScreen({navigation, route}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Distance: {route.params.distance}</Text>
            <Text>Time: {route.params.time}</Text>
            <Text>Earned tokens: {route.params.earnedTokens}</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    )
}