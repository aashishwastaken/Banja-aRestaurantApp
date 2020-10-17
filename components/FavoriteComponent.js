import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, TouchableOpacity, TouchableHighlight, Alert } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import Loading from './LoadingComponent';
import baseUrl from '../shared/baseUrl';
import { connect } from 'react-redux';
import { Avatar, Icon } from 'react-native-elements';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deleteFavorite: (id) => dispatch(deleteFavorite(id))
    };
}




class Favorite extends Component {





    render() {
        const { navigate } = this.props.navigation;
        const { deleteFavorite } = this.props;
        const renderHidden = (data) => {
            return (
            
             
            <View style={styles.hidden}>
                   <Animatable.View animation="fadeIn" delay={2000}>
                <Icon name="trash" type="font-awesome" color='red' size={35}
                    onPress={() => {
                        Alert.alert(
                            "Are you sure",
                            "You want to delete " + data.item.name + '?',
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log(data.item.name + " not deleted"),
                                    style: "cancel"
                                }, {
                                    text: "Ok",
                                    onPress: () => deleteFavorite(data.item.id)
                                }
                            ],
                            { cancelable: false }

                        );

                    }} />
                          </Animatable.View>

            </View>
      
            );
        };

        const renderFav = (rowData, rowMap) => {
            const { item } = rowData;
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                <TouchableOpacity style={styles.renList} onPress={() => navigate('Dishes Available', { screen: 'Dishdetail', params: { dishId: item.id } })}>
                    <Avatar containerStyle={styles.avatar} rounded source={{ uri: baseUrl + item.image }} size={60} />
                    <View style={{ flex: 7, flexDirection: 'column' }}>
                        <Text style={styles.label}>{item.name}</Text>
                        <Text>{item.description}</Text>
                    </View>
                </TouchableOpacity>
                </Animatable.View>
            );
        }

        if (this.props.dishes.isLoading) {
            return (<Loading />);
        } else if (this.props.dishes.errorMess) {
            return (<View>
                <Text>{this.props.dishes.errprMess}</Text>
            </View>);

        } else {

            return (


                <SwipeListView
                    useFlatList={true}
                    data={this.props.dishes.dishes.filter(x => this.props.favorites.some(y => y == x.id))}
                    renderItem={renderFav}
                    leftOpenValue={75}
                    rightOpenValue={-100}
                    renderHiddenItem={renderHidden}
                    keyExtractor={(x) => x.id.toString()}
                    disableRightSwipe
                />



            );

        }
    }
}


const styles = StyleSheet.create({
    hidden: {
        justifyContent: 'flex-end',
        marginRight: 30,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    renList: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        padding: 10
    },
    label: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold'
    },
    avatar: {
        flex: 1,
        marginTop: 8,
        padding: 5
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);