import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Icon,Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';
export default class Contact extends Component {
    render() {

        const sendMail = () => {
            MailComposer.composeAsync({
                recipients: ['confusion@food.net'],
                subject: 'Enquiry',
                body: "To whomever it may concern,\n"
            });
        }

        const a = "Contact Information";
        return (
            <Animatable.View animation="fadeInDown" duration={2000} >

                <Card title={a}
                >
                    <Text style={{ lineHeight: 25 }}>121, Clear Water Bay Road{"\n"}
Clear Water Bay, Kowloon{"\n"}
HONG KONG{"\n"}
Tel: +852 1234 5678{"\n"}
Fax: +852 8765 4321{"\n"}
Email:confusion@food.net{"\n"}
                    </Text>
                    <Button
                        title="Send Mail "
                        buttonStyle={{backgroundColor:'green'}}
                        icon={(<Icon type="font-awesome-5" name="envelope" color="white" />)}
                        iconRight
                        onPress={() => sendMail()}
                    />

                </Card>
            </Animatable.View>
        )
    }
}
