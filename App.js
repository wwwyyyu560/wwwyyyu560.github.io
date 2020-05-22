import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {singerData: []};
  }

  renderSon = ({item, index}) => {
    return (
      <View key={index}>
        <TouchableOpacity
          style={{
            height: 100,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margintop: 10,
            marginBottom: 10,
          }}>
          <Text style={{marginRight: 5, marginLeft: 10}}>{index + 1}</Text>
          <Image
            source={{uri: item.img}}
            style={{
              height: 100,
              width: 115,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}
          />
          <Text style={{textAlign: 'center', width: 150}}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => {
                this.del(item.id);
              }}
              style={{
                width: 50,
                height: 100,
                backgroundColor: '#fff',
                alignItems: 'center',
                overflow: 'hidden',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}>
              <Text
                style={{
                  height: 100,
                  width: 50,
                  textAlign: 'center',
                  lineHeight: 100,
                  color: '#fff',
                  backgroundColor: '#42b983',
                }}>
                删除
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  del(id) {
    let {singerData} = this.state;
    for (let i = 0; i < singerData.length; i++) {
      if (singerData[i].id === id) {
        singerData.splice(i, 1);
        this.setState({
          singerData,
        });
        break;
      }
    }
  }

  componentDidMount() {
    fetch('http://www.cjlly.com:3041/record')
      .then(res => res.json())
      .then(res => {
        this.setState({
          singerData: res,
        });
      });
  }

  render() {
    let {singerData} = this.state;
    return (
      <View>
        <FlatList
          data={singerData}
          renderItem={this.renderSon}
          refreshing={false}
          keyExtractor={(item, index) => JSON.stringify(index)}
        />
      </View>
    );
  }
}
export default App;
