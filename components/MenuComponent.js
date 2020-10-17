import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import Loading from './LoadingComponent';
import  baseUrl  from '../shared/baseUrl';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes
    };
}
class Menu extends Component {





    render() {
        const { navigate } = this.props.navigation;
        let renderMenu = ({ item, index }) => {
            return (
            <Animatable.View animation="fadeInRightBig" duration={2000} >
            <Tile
                key={index}
                title={item.name}
                caption={item.description}
                featured
                onPress={() => navigate('Dishes Available', { screen: 'Dishdetail', params: { dishId: item.id } })}
                imageSrc={{ uri: baseUrl + item.image }}
            />
            </Animatable.View>);
        }

if(this.props.dishes.isLoading){
    return (<Loading/>);
}else if(this.props.dishes.errorMess){
return (<View>{this.props.dishes.errorMess}</View>)
}else{
        return (
            <FlatList

                data={this.props.dishes.dishes}
                renderItem={renderMenu}
                keyExtract={item => item.id.toString()}

            />
        );
    }
    }

}

export default connect(mapStateToProps)(Menu);