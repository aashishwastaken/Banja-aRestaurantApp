import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export default function LoadingComponent() {
    return (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="large" />
            <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>Loading...</Text>
        </View>
    )
}
