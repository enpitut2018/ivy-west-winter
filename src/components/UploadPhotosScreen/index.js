import React, { Component } from "react";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Actions } from "react-native-router-flux";
import TouchablePhoto from "../../components/common/TouchablePhoto";
import { getFetchWithToken } from "../../models/fetchUtil";
import { baseURL } from "../../libs/const";

// 画面幅サイズを取得
const { width } = Dimensions.get("window");

export default class UploadPhotosScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      refreshing: false
    };
  }

  componentWillMount() {
    url = baseURL + "/uploads";
    getFetchWithToken(url)
      .then(json => {
        this.setState({ photos: json.reverse() });
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    url = baseURL + "/uploads";
    getFetchWithToken(url)
      .then(json => {
        this.setState({ photos: json.reverse(), refreshing: false });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <View style={styles.photoView}>
          {this.state.photos.map((photo, index) => {
            return (
              <TouchablePhoto
                key={photo.ID}
                photo={photo}
                width={width / 3}
                height={width / 3}
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  photoView: {
    flex: 3,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sampel: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
