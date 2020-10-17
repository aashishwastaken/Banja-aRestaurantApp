import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import AboutComponent from './AboutComponent';
import { Icon } from 'react-native-elements';
import Reservation from './ReservationComponent';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import Favorite from './FavoriteComponent';
import { Login, Register } from './LoginComponent';
import NetInfo from '@react-native-community/netinfo';
const mapStateToProps = state => {
    // console.log("JSON:MAINmapStatetoProps..LEADERS=======>"+JSON.stringify(state));
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})
//import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

const styles = StyleSheet.create({
    im: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        width: 130,
        margin: 10

    },
    tx: {
        marginLeft: 35,
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        fontFamily: 'Roboto'
    },
    txC: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',

    },
    outerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffc107'
    }
});

const Stack = createStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator
            initialRouteName="Menu"
        // screenOptions={{ gestureEnabled: false }}
        >

            <Stack.Screen
                name="Menu"
                component={Menu}
                options={({ navigation }) => ({
                    headerLeft: (props) => (
                        <Icon name="menu" size={30} iconStyle={{ marginLeft: 15 }} onPress={() => { navigation.toggleDrawer() }} />
                    )

                })}
            />
            <Stack.Screen
                name="Dishdetail"
                component={DishDetail}
                options={{


                }}
            />

        </Stack.Navigator>
    );
}


//const Stack = createStackNavigator();

function L() {
    return (
        <Stack.Navigator
            initialRouteName="Login"
        // screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen name="Login" component={Login}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu" iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })}

            />
        </Stack.Navigator>
    );
}

function R() {
    return (
        <Stack.Navigator
            initialRouteName="Register"
        // screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen name="Register" component={Register}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu" iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })}

            />
        </Stack.Navigator>
    );
}

function Contactt() {
    return (
        <Stack.Navigator
            initialRouteName="Contact Us"
        // screenOptions={{ gestureEnabled: false }}
        >
            <Stack.Screen name="Contact Us" component={Contact}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu" iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })}

            />
        </Stack.Navigator>
    );
}

function AboutUs() {
    return (
        <Stack.Navigator initialRouteName="About Us" >
            <Stack.Screen name="About Us" component={AboutComponent}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu" iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })} />
        </Stack.Navigator>

    );
}
function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={Home}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu" iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })} />
        </Stack.Navigator>

    );
}


function Reservation1() {
    return (
        <Stack.Navigator initialRouteName="Reserve Tables">
            <Stack.Screen name="Reserve Tables" component={Reservation}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu"
                        iconStyle={{ marginLeft: 15 }} size={30} onPress={() => navigation.toggleDrawer()} />)

                })} />
        </Stack.Navigator>
    );
}

function FavoriteStack() {
    return (
        <Stack.Navigator initialRouteName="Favorites">
            <Stack.Screen name="Favorites" component={Favorite}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu"
                        size={30} iconStyle={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />)
                })} />
        </Stack.Navigator>
    );
}

function LoginStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login}
                options={({ navigation }) => ({
                    headerLeft: (props) => (<Icon name="menu"
                        size={30} iconStyle={{ marginLeft: 15 }} onPress={() => navigation.toggleDrawer()} />)
                })} />

        </Stack.Navigator>
    );
}

const Drawer = createDrawerNavigator();

const DrawCustom = (props) => {
    return (
        <DrawerContentScrollView >
            <View style={styles.outerContainer}>
                <View style={{ flex: 1 }}>
                    <Image source={require("./images/logo.png")} style={styles.im} />
                </View>
                <View style={styles.txC}>
                    <Text style={styles.tx} >Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}



const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Login" >
            <Tab.Screen  name="Login" component={L}
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="user"
                            type="font-awesome"
                            size={size + 5}
                            focused={focused}
                            color={color} />

                    )
                })} />
            <Tab.Screen name="Register" component={R} options={() => ({
                tabBarIcon: ({ focused, color, size }) => (
                    <Icon
                        focused={focused}
                        name='user-plus'
                        type='font-awesome-5'
                        size={size}
                        color={color}

                    />
                )
            })} />
        </Tab.Navigator>
    );
}

function Draw() {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{ backgroundColor: '#fff200' }} edgeWidth={150}
            drawerContent={(props) => <DrawCustom {...props} />} >

            <Drawer.Screen name="Login" options={() => ({
                drawerIcon: (props) => (<Icon name="sign-in-alt" type="font-awesome-5" color={props.color} size={24}
                />)
            })} component={MyTabs} />

            <Drawer.Screen name="Home" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="home" color={props.color} size={24} />)
            })} component={HomeStack} />

            <Drawer.Screen name="About Us" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="info" color={props.color} size={24} />)
            })} component={AboutUs} />

            <Drawer.Screen name="Dishes Available" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="utensils" color={props.color} type="font-awesome-5" size={24} />)
            })} component={RootStack} />

            <Drawer.Screen name="Favorites" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="heart" type="font-awesome" color={props.color} size={24} />)
            })} component={FavoriteStack} />

            <Drawer.Screen name="Reserve Tables" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="chair" type="font-awesome-5" size={24} color={props.color} />)
            })} component={Reservation1} />

            <Drawer.Screen name="Contact Us" options={({ navigation }) => ({
                drawerIcon: (props) => (<Icon name="address-card" color={props.color} type="font-awesome" size={20} />)
            })} component={Contactt} />


        </Drawer.Navigator>

    );
}




class Main extends Component {


    componentDidMount() {
        // console.log("component did mount::");
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchLeaders();
        this.props.fetchPromos();

/*
        NetInfo.fetch().then(netState=>{
            ToastAndroid.showWithGravity("The connection is "+netState.type+"\n is Connection Expensive: "+netState.details.isConnectionExpensive+
            "\n cellularGeneration: "+netState.details.cellularGeneration,
            ToastAndroid.SHORT,ToastAndroid.BOTTOM);
        });

        
        */

        
    }

    /*
     unsubscribe=NetInfo.addEventListener(netState=>{
        ToastAndroid.showWithGravity("(U) The connection is "+netState.type+"\n is Connection Expensive: "+netState.details.isConnectionExpensive+
        "\n cellularGeneration: "+netState.details.cellularGeneration,
        ToastAndroid.SHORT,ToastAndroid.BOTTOM);
    });
*/
    componentWilUnmount(){
        ToastAndroid.showWithGravity("(Unmount Called)",
        ToastAndroid.LONG,ToastAndroid.BOTTOM);
      //  unsubscribe();
    }

    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <NavigationContainer><Draw /></NavigationContainer>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);