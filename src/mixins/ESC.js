import React, { Component } from 'react';
import { ToastAndroid, BackHandler } from 'react-native';

/**
 * 退出应用高阶组件
 * @param {react.component} WrappedComponent 需包裹组件
 * @param {boolean} isIndex 是否是首页，如果是首页则需要在首页的focus和blur进行监听 
 */
export default function (WrappedComponent, isIndex) {
  return class extends Component {
    constructor(props) {
      super(props);
      this._onBackAndroid = this._onBackAndroid.bind(this);
    }

    componentWillMount(){
      !isIndex && 
        BackHandler.addEventListener('hardwareBackPress', this._onBackAndroid);
    }
  
    componentWillUnmount() {
      !isIndex && 
        BackHandler.removeEventListener('hardwareBackPress', this._onBackAndroid);
    }

    render() {
      return (
        <WrappedComponent {...this.props} backHandler={this._onBackAndroid} />
      )
    }

    _onBackAndroid() {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        //最近2秒内按过back键，可以退出应用。
        return false;
      }
    
      this.lastBackPressed = Date.now();
      
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      
      return true;
    }
  }
}