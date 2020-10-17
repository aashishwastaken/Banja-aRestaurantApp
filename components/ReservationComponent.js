import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, ScrollView, Picker, Switch, Button, Alert, Modal, Settings } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Animatable from 'react-native-animatable';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';


export default class Reservation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            dateVisible: false,
            modalVisible: false
        }
    }

    async obtainCalendarPermission() {
        const permission = await Calendar.requestCalendarPermissionsAsync();
        if (permission.status == 'granted') {
            const cals=await Calendar.getCalendarsAsync();
         //   console.warn(cals[0].source.isLocalAccount);
          const x=  cals.filter(each=>each.source.isLocalAccount);
          // console.warn(x[0].id);
           return x[0];
        } else {
            console.warn("Calendar Permission not granted");
        }
    }

    async addReservationToCalendar(date) {
        const calen=await this.obtainCalendarPermission();
      // console.warn(calen);
       // Calendar.createEventAsync(Calendar.DEFAULT);
        const calEvent = await Calendar.createEventAsync(calen.id.toString(), {
            title: 'Con Fusion Table Reservation',
            startDate: date,
            endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });


    }

    handleReservation() {
        this.addReservationToCalendar(this.state.date);
        //   Alert.alert("RESVERVATION Guests: " + this.state.guests +
        //       "\nDate: " + this.state.date.toUTCString());
        // console.log("date:::::::::::::::"+this.state.date.toUTCString());
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date()
        });
    }

    async obtainNotificationPermission() {
        let permission = await Notifications.getPermissionsAsync();
        if (permission.granted) {
            return permission.granted || permission.ios?.status === Notifications.IOSAuthorizationStatus.PROVISIONAL;
        } else {
            return await Notification.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowBadge: true,
                    allowSound: true,
                    allowAnnouncements: true
                }
            })
        }
    }

    async presentLocalNotification(st) {
        await this.obtainNotificationPermission();
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true
            })
        });

        Notifications.scheduleNotificationAsync({
            content: {
                title: "You have a reservation for " + st.guests + " Guests",
                body: "Date: " + st.date + "\nSmoking: " + st.smoking
            },
            trigger: {
                seconds: 1
            }
        });
    }






    toggleModal() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    showConfirmationAlert = () => {

        Alert.alert('Your Reservation OK?',
            "Number of Guests: " + this.state.guests + "\n" + "Smoking: " + this.state.smoking + "\n" +
            "Date and Time: " + this.state.date

            , [
                { text: "Cancel", style: 'cancel', onPress: () => { this.handleReservation(); } },
                {
                    text: 'Ok', onPress: () => {
                        this.presentLocalNotification(this.state);
                        this.handleReservation();
                    }

                }], { cancelable: true });
    }



    hideDatePicker = () => {
        this.setState({ dateVisible: false });
    }
    showDatePicker = () => {
        this.setState({ dateVisible: true });
    }

    datePressed = (date) => {
        date = new Date(date.getTime())
        this.setState({ date: date });
        this.hideDatePicker();
    }

    

    render() {

        return (
            <SafeAreaView>
                <Animatable.View animation="zoomIn" duration={500}>
                    <View style={styles.row}>

                        <Text style={styles.label} >Guests:</Text>
                        <Picker style={styles.item}
                            selectedValue={this.state.guests}
                            onValueChange={(item, index) => {
                                this.setState({ guests: item });
                            }}>
                            <Picker.Item value="1" label="1" />
                            <Picker.Item value="2" label="2" />
                            <Picker.Item value="3" label="3" />
                            <Picker.Item value="4" label="4" />
                            <Picker.Item value="5" label="5" />

                        </Picker>


                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Smoking/Non-Smoking:</Text>
                        <Switch
                            style={styles.item}
                            value={this.state.smoking}
                            trackColor="blue"
                            onValueChange={(value) => {
                                this.setState({ smoking: value })
                            }}
                        />
                    </View>

                    <View style={{ ...styles.row, marginTop: 30 }}>
                        <Text style={styles.label}>Date and Time:</Text>
                        <Text style={{ flex: 3 }} >{this.state.date.toString()}</Text>
                        <Icon type="font-awesome-5" name="calendar-alt" raised onPress={() => {
                            this.setState({ dateVisible: true })
                        }} />

                        <DateTimePickerModal
                            isVisible={this.state.dateVisible}
                            mode='datetime'
                            minimumDate={this.state.date}
                            onConfirm={this.datePressed}
                            onCancel={this.hideDatePicker}
                        />

                    </View>



                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: 30
                    }}>
                        <Button
                            onPress={() => this.showConfirmationAlert()}
                            color="green"
                            title="Reserve"
                            accessibilityLabel="Learn about Green Button"

                        />


                    </View>

                    <Modal
                        animationType="slide"
                        visible={this.state.modalVisible}
                        onDismiss={() => this.toggleModal()}
                        onRequestClose={() => this.toggleModal()}
                        transparent={false}
                    >
                        <SafeAreaView >
                            <Text style={{
                                fontSize: 24,
                                fontWeight: 'bold',
                                backgroundColor: 'blue',
                                textAlign: 'center',
                                color: 'white',
                                marginBottom: 15
                            }}>Your Reservation Details</Text>
                            <View style={styles.row}>
                                <Text style={styles.label}>Guests</Text>
                                <Text style={styles.item}>{this.state.guests}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Smoking</Text>
                                <Text style={styles.item}>{this.state.smoking ? "Yes" : "No"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Date and Time:</Text>
                                <Text style={{ flex: 4 }}>{this.state.date.toUTCString()}</Text>
                            </View>
                            <View style={styles.modalrow}>
                                <Button title="Close" onPress={() => { this.toggleModal(); this.handleReservation(); }}
                                    color="blue" style={{ flex: 1, margin: 10 }} />
                            </View>
                        </SafeAreaView>
                    </Modal>
                </Animatable.View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    modalrow: {
        fontSize: 15,
        fontWeight: 'bold',

        textAlign: 'center',

        margin: 10

    },
    label: {
        flex: 2,
        fontWeight: 'bold',
        margin: 20

    },
    item: {
        flex: 1,
        margin: 20
    }

});