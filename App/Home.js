import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert
} from "react-native";

import { connect } from "react-redux";
import user from "./data/user.json";
import { bindActionCreators } from "redux";
import { ActionCreators } from "./redux/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: "",
      password: ""
    };

    this.submitHandler = this.submitHandler.bind(this);
  }

  emailChangeHandler = email => {
    this.setState({ emailAddress: email });

    console.log(`The email you entered is ${this.state.emailAddress}`);
  };

  passChangeHandler = password => {
    this.setState({ password: password });

    console.log(`The password you are entered is ${this.state.password}`);
  };

  submitHandler = () => {
    const { emailAddress, password } = this.state;
    if (this.props.logIn(emailAddress, password)) {
      Alert.alert(
        "Email and Password is matched. You have logged in Successfully "
      );
    } else {
      Alert.alert(
        `You have Entered Wrong Email: ${emailAddress} or Password: ${password}. Try again`
      );
    }
  };

  render() {
    const { emailAddress, password } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.welcome}> React Native Redux Example </Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={{ height: 40, borderBottomWidth: 1, width: 200 }}
            placeholder="enter Email here"
            value={emailAddress}
            onChangeText={this.emailChangeHandler}
          />
        </View>

        <View style={styles.container}>
          <TextInput
            style={{ height: 40, borderBottomWidth: 1, width: 200 }}
            placeholder="enter Password here"
            value={password}
            onChangeText={this.passChangeHandler}
          />
        </View>

        <View style={styles.container}>
          <Button title="Submit to Login" onPress={this.submitHandler} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInStatus: state.loggedInStatus
  };
};
const mapDispatchToProps = dispatch => {
  return bindActionCreators(ActionCreators, dispatch);
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDDCFF"
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10
  },
  subContainer: {
    textAlign: "center",
    width: "90%",
    marginBottom: 5
  }
});
