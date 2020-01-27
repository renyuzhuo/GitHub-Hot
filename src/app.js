import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import { get as getGlobalData, set as setGlobalData } from './utils/global_data'

import Index from './pages/index'

import configStore from './store'

import './app.less'
import './assets/ionicons/css/ionicons.min.css'

const store = configStore

class App extends Component {

  config = {
    pages: [
      'pages/account/index',
      'pages/top/top',
      'pages/repo/issues',
      'pages/login/login',
      'pages/repo/repo',
      'pages/account/about',
      'pages/index/index',
      'pages/activity/index',
      'pages/account/follow',
      'pages/account/developerInfo',
      'pages/repo/contentList',
      'pages/repo/issueDetail',
      'pages/repo/addIssue',
      'pages/repo/addComment',
      'pages/repo/repoList',
      'pages/repo/contributors',
      'pages/repo/starredRepo',
      'pages/repo/file',
      'pages/repo/repoEvents'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'GitHub Hot',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/top/top',
          text: 'Top',
          iconPath: './assets/images/tab_trend.png',
          selectedIconPath: './assets/images/tab_trend_s.png'
        }, 
        {
          pagePath: 'pages/activity/index',
          text: 'Activity',
          iconPath: './assets/images/tab_news.png',
          selectedIconPath: './assets/images/tab_news_s.png'
        }, 
        {
          pagePath: 'pages/account/index',
          text: 'Me',
          iconPath: './assets/images/tab_me.png',
          selectedIconPath: './assets/images/tab_me_s.png'
        }
      ],
      color: '#8a8a8a',
      selectedColor: '#2d8cf0',
      backgroundColor: '#ffffff',
      borderStyle: 'white'
    },
    navigateToMiniProgramAppIdList: [
      'wx0c31d04cc83bd649'
    ]
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
