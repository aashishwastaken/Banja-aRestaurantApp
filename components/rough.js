/*

<ScrollView>

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
                        tintColor="blue"
                        onValueChange={(value) => {
                            this.setState({ smoking: value })
                        }}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Date and Time:</Text>
                    <DatePicker
                        style={{ flex: 2 }}
                        date={this.state.date}
                        format=''
                        minDate={Date()}
                        mode="datetime"
                        placeholder="Select Date and Time"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        onDateChange={(date1) => this.setState({ date: date1 })}

                    />
                </View>
                <View style={styles.row}>
                    <Button
                        onPress={() => this.handleReservation}
                        color="green"
                        title="Reserve"
                        accessibilityLabel="Learn about Green Button"

                    />


                </View>
            </ScrollView>

            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

           


*/