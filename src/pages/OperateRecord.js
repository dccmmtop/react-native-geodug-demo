import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ListView } from 'react-native';
import Loading from '../components/Loading';
import HeaderTitle from '../components/CommonHeaderTitle';
import RecordList from '../components/RecordList';
import http from '../utils/ajax';

let pageNum = 1; // 数据当前页
let pageSize = 4; // 每页数据条数
let pageCount = 0; // 数据总页数
let recordData = []; // 数据

export default class GeoList extends Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    return {
      headerTitle: <HeaderTitle text="操作记录" />
    }
  }

  state = {
    dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id}),
    showLoading: true,
    foot: 0, // 0: 隐藏; 1: 加载完成； 2：加载中
    finish: false // 数据是否全部加载完毕的标志：pageNum >= pageCount
  }

  componentDidMount() {
    this._getRecordData();
  }

  render() {
    return (
      <View style={[StyleSheet.absoluteFill, {backgroundColor: '#F4F4F4',}]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(item) => <RecordList data={item} /> }
          renderFooter={this._renderFooter.bind(this)}
          onEndReached={this._endReached.bind(this)}  
          onEndReachedThreshold={0}
        />
        {
          this.state.showLoading ? <Loading /> : null
        }
      </View>
    );
  }

  _getRecordData() {
    http.get('http://192.168.10.187:8081/mock/record.json').then( async res => {
      recordData.push(res.records);
      pageCount = res.total_page;

      await this.setState({
        dataSource: this.state.dataSource.cloneWithRows(recordData)
      });

      // 如果是第一页，
      if (pageNum === 1) {
        await this.setState({
          showLoading: false
        });
      }
      
      if (pageNum >= pageCount) {
        await this.setState({
          foot: 0,
          finish: true
        })
      } else {
        await this.setState({
          foot: 1
        })
        
        pageNum++;
          
        setTimeout(() => {
          this.setState({
            foot: 0
          })
        }, 500);
      }
    });
  }

  _renderFooter() {
    if(this.state.foot === 1){//加载完毕  
      return (  
        <View style={{height:40,alignItems:'center',justifyContent:'flex-start',}}>  
          <Text style={{color:'#999999',fontSize:12,marginTop:10}}>  
            加载完成
          </Text>
        </View>
      );  
    }else if(this.state.foot === 2) {//加载中  
      return (  
        <View style={{height:40, flexDirection: 'row', alignItems:'center',justifyContent:'center',}}>  
          <ActivityIndicator size="small" />
          <Text style={{marginLeft: 10}}>加载中...</Text>
        </View>
      );  
    }
  }

  _endReached() {
    if(this.state.foot != 0 || this.state.finish){  
      return ;  
    } 

    if (pageCount !== 1) {
      this.setState({
        foot: 2
      }, () => {
        setTimeout(() => {
          this._getRecordData();
        }, 1000);
      })
    }
  }
  
}

const styles = StyleSheet.create({

})
