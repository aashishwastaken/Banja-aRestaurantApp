import React, { Component } from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'
import { Card, ListItem } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
    // console.log("JSON:mapStatetoProps..LEADERS=======>"+JSON.stringify(state));
    return {
        leaders: state.leaders
    };
}

function History() {

    return (
        <Animatable.View animation="fadeInDown" duration={2000} >
        <Card
            title="Our History">

            <Text style={{ lineHeight: 20 }}>
                Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in
                Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage
                from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world,
                you never know what will arrive on your plate the next time you visit us.
            {"\n"}{"\n"}
            The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan,
            that featured for the first time the world's best cuisines in a pan.
            </Text>
        </Card>
        </Animatable.View>
    )
}



class AboutComponent extends Component {




    render() {


        let renderItems = ({ item, index }) => {

            return (<ListItem
                id={index}
                title={item.name}
                subtitle={item.description}
                leftAvatar={{ source: { uri: baseUrl + item.image } }}



            />);



        };

        console.log("JSON:LEADERS=======>" + JSON.stringify(this.props.leaders));

        if (this.props.leaders.isLoading) {
            return (<ScrollView>
                <History />
                <Card title="Corporate Leadership">

                    <Loading />


                </Card>


            </ScrollView>);
        } else if (this.props.leaders.errMess) {
            return (<ScrollView>
               
                <History />
                <Animatable.View animation="fadeInUp" duration={2000} >
                <Card title="Corporate Leadership">

                    <Text >{this.props.leaders.errMess}</Text>


                </Card>

                </Animatable.View>
            </ScrollView>);
        }


        else {

            return (<ScrollView>
               
                <History />
                <Animatable.View animation="fadeInUp" duration={2000} >
                <Card title="Corporate Leadership">

                    <FlatList

                        data={this.props.leaders.leaders}
                        renderItem={renderItems}
                        keyExtract={(x) => x.id.toString()}

                    />



                </Card>
                </Animatable.View>

            </ScrollView>);

        }
    }






}

export default connect(mapStateToProps)(AboutComponent);