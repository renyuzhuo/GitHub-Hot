import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { GLOBAL_CONFIG } from '../../constants/globalConfig'
import { AtIcon } from 'taro-ui'
import IssueCommentItem from '../../components/account/issueCommentItem'
import Markdown from '../../components/repo/markdown'

import { REFRESH_STATUS } from '../../constants/status'
import LoadMore from '../../components/common/loadMore'

import api from '../../service/api'
import './issueDetail.less'

class IssueDetail extends Component {

  config = {
    navigationBarTitleText: 'Issue Comments',
    enablePullDownRefresh: true
  }

  constructor(props) {
    super(props)
    this.state = {
      issue: null,
      page: 1,
      comments: [],
      refresh_status: REFRESH_STATUS.NORMAL
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillMount() {
    let params = this.$router.params
    this.setState({
      url: params.url
    })
  }

  componentDidMount() {
    Taro.showLoading({title: GLOBAL_CONFIG.LOADING_TEXT})
    this.getIssue()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onPullDownRefresh() {
    let that = this
    this.setState({
      page: 1
    }, ()=>{
      that.getIssue()
    })
  }

  onReachBottom() {
    const { page, refresh_status } = this.state
    if (refresh_status !== REFRESH_STATUS.NO_MORE_DATA) {
      let that = this
      this.setState({
        page: page + 1
      }, ()=>{
        that.getComments()
      })
    }
  }

  getComments() {
    let that = this
    const { url, page, comments } = this.state

    if (page !== 1) {
      that.setState({
        refresh_status: REFRESH_STATUS.REFRESHING
      })
    }

    let comments_url = url + '/comments'
    let params = {
      page: page,
      per_page: GLOBAL_CONFIG.PER_PAGE
    }
    api.get(comments_url, params).then((res)=>{
      if (page === 1) {
        that.setState({
          comments: res.data
        })
      } else {
        that.setState({
          comments: comments.concat(res.data)
        })
      }
      let status = res.data.length < GLOBAL_CONFIG.PER_PAGE ? REFRESH_STATUS.NO_MORE_DATA : REFRESH_STATUS.NORMAL
      that.setState({
        refresh_status: status
      })
      Taro.stopPullDownRefresh()
      Taro.hideLoading()
    })
  }

  getIssue() {
    const { url } = this.state
    let that = this
    api.get(url).then((res)=>{
      that.setState({
        issue: res.data
      }, ()=>{
        that.getComments()
      })
      Taro.hideLoading()
    })
  }

  addComment() {
    const { url } = this.state
    Taro.navigateTo({
      url: '/pages/repo/addComment?url=' + encodeURI(url + '/comments')
    })
  }

  render () {
    const { issue, comments, refresh_status } = this.state
    if (!issue) return <View />
    return (
      <View className='content'>
        <View className='title_view'>
          <Text className='title'>{'#' + issue.number + ' ' + issue.title}</Text>
          {
            issue.body.length > 0 ? (
              <View className='markdown'>
                <View className='md'>
                  <Markdown md={issue.body} />
                </View>
              </View>
            ) : (
              <Text className='description'>
                no description
              </Text>
            )
          }
        </View>
        {
          comments.map((item, index) => {
            return (
              <IssueCommentItem item={item} key={index} />
            )
          })
        }
        <LoadMore status={refresh_status} />
        <View className='add_comment' onClick={this.addComment.bind(this)}>
          <AtIcon prefixClass='ion'
                  value='ios-add'
                  size='40'
                  color='#fff' />
        </View>
      </View>
    )
  }
}

export default IssueDetail
