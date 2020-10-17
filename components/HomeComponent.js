import React, { Component } from 'react';
import { Text, View, Image, Dimensions, ScrollView, ImageBackground, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import Loading from './LoadingComponent';
import baseUrl from '../shared/baseUrl';
import { connect } from 'react-redux';



const mapStateToProps = (state) => {
    return {
        leaders: state.leaders,
        promotions: state.promotions,
        dishes: state.dishes

    };
}

function RenderStuffs(props) {
    const item = props.item;
    console.log("isLoading:" + props.isLoad);
    if (props.isLoad) {
        return (<Card><Loading /></Card>);
    } else if (props.isErr) {
        return (<Card><Text>{props.isErr}</Text></Card>);
    } else {

        if (item != null) {
            return (<Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseUrl + item.image }} >
                <Text style={{ margin: 10 }}>{item.description}</Text>
            </Card>);
        } else {
            return (<View></View>)
        }
    }

}



class Home extends Component {

    state = {
        animatedValue: new Animated.Value(0),
        v: 0
    };

    componentDidUpdate() {
        this.animate();

    }

    animate() {


        this.state.animatedValue.setValue(0);


        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.animatedValue, {
                    toValue: 8,
                    duration: 5000,
                    useNativeDriver: true,
                    easing: Easing.linear
                }),
                Animated.timing(
                    this.state.animatedValue, {
                    toValue: 0,
                    duration: 5000,
                    useNativeDriver: true,
                    easing: Easing.linear
                }
                )
            ]), {
            iterations: -1
        }
        ).start();


    }

    render() {
        const d = Dimensions.get('window');
        let x1 = this.state.animatedValue.interpolate({
            inputRange: [0,4, 8],
            outputRange: [0,-400,-840]
        });
        let x2 = this.state.animatedValue.interpolate({
            inputRange: [0, 4, 8],
            outputRange: [-400,0, 400]
        });
        const x3 = this.state.animatedValue.interpolate({
            inputRange: [0,4, 8],
            outputRange: [400, 0, -400]
        });
        return (<View style={{ flex: 1 ,justifyContent:'flex-start'}}>
            <ImageBackground
                style={{ flex: 1 }}
                source={require('./images/DeliciousPizza.jpg')}
            >
           

                    <Animated.View style={{ flexDirection:'row', width: '100%',transform: [{ translateX: x1 }] }}>
                        <RenderStuffs isLoad={this.props.dishes.isLoading} isErr={this.props.dishes.errorMess} item={this.props.dishes.dishes.filter((x) => x.featured)[0]} />
                        <RenderStuffs isLoad={this.props.promotions.isLoading} isErr={this.props.promotions.errorMess}
                            item={this.props.promotions.promotions.filter((x) => x.featured)[0]} />
                            <RenderStuffs isLoad={this.props.leaders.isLoading} isErr={this.props.leaders.errorMess}
                            item={this.props.leaders.leaders.filter((x) => x.featured)[0]} />
                    </Animated.View>
         <Text>THIS IS SOMETHING NEW!!!!</Text>
                 

    

            </ImageBackground>
        </View>
        );
    }
}


export default connect(mapStateToProps)(Home);