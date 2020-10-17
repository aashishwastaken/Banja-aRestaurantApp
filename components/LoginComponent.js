import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Icon, CheckBox, Input, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import baseUrl from '../shared/baseUrl';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false,
            imageUrl: baseUrl + 'images/cat.png'
        }
    }
    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then(userdata => JSON.parse(userdata))
            .then(userdata => {
                if (userdata) {
                    if (userdata.remember) {
                        this.setState({
                            username: userdata.username,
                            password: userdata.password,
                            remember: userdata.remember,
                            imageUrl: (userdata.imageUrl) ? userdata.imageUrl : baseUrl + 'images/cat.png'
                        });
                    }
                }
            });
    }

    handleLogin() {
        if (this.state.remember) {
            SecureStore.setItemAsync('userinfo', JSON.stringify({ username: this.state.username, password: this.state.password, remember: true }))
                .catch(err => console.log("Error= " + err));
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log("Error= " + err));
        }
    }

    render() {

        if (this.props.route.params != undefined) {
            let x = (this.props.route.params.rerender != null) ? this.props.route.params.rerender : false;
            if (x) {
                this.componentDidMount();
                this.props.route.params.rerender = false;
            }
        }


        return (
            <ScrollView contentContainerStyle={styles.container}>

                <Image
                    source={{ uri: this.state.imageUrl }}
                    loadingImageSource={baseUrl + "/images/cat.png"}
                    style={{ marginBottom: 20, width: 100, height: 120 }}
                />

                <Input containerStyle={styles.inputContainer}
                    leftIcon={{
                        type: 'font-awesome', name: 'user', margin: 10,
                        size: 35
                    }}
                    placeholder="Enter Username"
                    onChangeText={(x) => this.setState({ username: x })}
                    value={this.state.username} />




                <Input containerStyle={styles.inputContainer}
                    leftIcon={{
                        type: 'font-awesome-5', name: 'key', margin: 10,
                        size: 30,
                    }}
                    placeholder="Enter Password"
                    onChangeText={(x) => this.setState({ password: x })}
                    value={this.state.password}
                    secureTextEntry={true}
                />



                <CheckBox
                    title="Remember Me"
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })} />




                <Button title="Login"
                    icon={{ name: 'sign-in-alt', type: 'font-awesome-5', color: 'white' }}
                    iconRight
                    buttonStyle={{ marginTop: 10 }}
                    onPress={() => { this.handleLogin() }} />

            </ScrollView>
        )
    }
}








export class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/cat.png'
        }
    }


    handleRegister() {

        SecureStore.setItemAsync('userinfo', JSON.stringify(this.state))
            .catch(er => console.log(er));



    }

    getImageForCamera = async () => {
        console.log("camera");
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA);
        if (status == 'granted') {
            const imgData = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [5, 6],
                quality: 1,

            });

            if (!imgData.cancelled) {
                console.log(imgData);
                this.processImage(imgData.uri);

            }

        }
    }

    getImageFromGallery = async () => {
        console.log("camera");
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status == 'granted') {
            let imgData = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [5, 6],
                quality: 1,
            });

            if (!imgData.cancelled) {
                console.log(imgData);
                this.processImage(imgData.uri);

            }

        }
    }

    processImage = async (imgUri) => {
        const resultImage = await ImageManipulator.manipulateAsync(
            imgUri,
            [{ resize: { width: 100 } }, { flip: ImageManipulator.FlipType.Horizontal }],
            { format: ImageManipulator.SaveFormat.PNG }
        );
        this.setState({
            imageUrl: resultImage.uri
        });

    }


    render() {



        return (

            <ScrollView contentContainerStyle={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center'
            }}  >

                <View style={styles.row}>
                    <Image
                        source={{ uri: this.state.imageUrl }}
                        loadingImageSource={baseUrl + "/images/cat.png"}
                        style={{ width: 100, height: 120 }}
                    />
                    <View style={{ ...styles.row,margin:10,justifyContent:'center', flexDirection: 'column' }}  >
                        <Button title="Camera" onPress={() => { this.getImageForCamera() }}
                            icon={
                                {
                                    name: 'camera',
                                    type: 'font-awesome-5',
                                    color: 'white'
                                }
                            }

                            buttonStyle={{ marginBottom: 5 }} />

                        <Button title="Gallery" onPress={() => this.getImageFromGallery()}
                            icon={
                                {
                                    type: 'font-awesome-5',
                                    name: 'images',
                                    color: 'white'
                                }
                            }

                        />
                    </View>

                </View>





                <Input
                    placeholder="Username"
                    leftIcon={
                        {
                            margin: 10,
                            size: 35,
                            name: 'user',
                            type: 'font-awesome'
                        }
                    }
                    onChangeText={t => this.setState({ username: t })}
                    value={this.state.username}
                    containerStyle={styles.inputContainer}
                    autoCompleteType="username"
                />
                <Input
                    placeholder="Password"
                    leftIcon={
                        {
                            margin: 10,
                            size: 35,
                            name: 'key',
                            type: 'font-awesome-5'
                        }
                    }
                    secureTextEntry={true}
                    onChangeText={t => this.setState({ password: t })}
                    value={this.state.password}
                    containerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="First Name"
                    leftIcon={
                        {
                            margin: 10,
                            size: 35,
                            name: 'id-card',
                            type: 'font-awesome'
                        }
                    }
                    onChangeText={t => this.setState({ firstname: t })}
                    value={this.state.firstname}
                    containerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="Last Name"
                    leftIcon={
                        {
                            margin: 10,
                            size: 35,
                            name: 'id-card',
                            type: 'font-awesome'
                        }
                    }
                    onChangeText={t => this.setState({ lastname: t })}
                    value={this.state.lastname}
                    containerStyle={styles.inputContainer}
                />
                <Input
                    placeholder="Email"
                    leftIcon={
                        {
                            margin: 10,
                            size: 35,
                            name: 'at',
                            type: 'font-awesome'
                        }
                    }
                    onChangeText={t => this.setState({ email: t })}
                    value={this.state.email}
                    containerStyle={styles.inputContainer}
                    textContentType="emailAddress"
                    autoCompleteType="email"
                />

                <CheckBox
                    title="Remember Me"
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    checked={this.state.remember} />

                <Button
                    onPress={() => {
                        this.handleRegister();
                        this.props.navigation.navigate('Login', { screen: 'Login', params: { rerender: true } });
                    }}
                    icon={{
                        name: 'user-plus',
                        type: 'font-awesome-5',
                        color: 'white'
                    }
                    }
                    iconRight
                    title="Register"
                    buttonStyle={{ marginTop: 10 }}
                />


            </ScrollView>
        )
    }
}











const styles = StyleSheet.create({

    inputContainer: {
        marginTop: 0

    },
    container: {

        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 50
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    text: { height: 30, borderBottomColor: 'grey', borderBottomWidth: 2, flex: 5, margin: 10 },
    inputs: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    checkbox: {
        flex: 1,
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    btn: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center'
    }
});


