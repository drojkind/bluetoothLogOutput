import React from 'react';
import {
  message,
  Select
} from 'antd';
import 'antd/dist/antd.css';
import '../../css/App.css'; // General APP css. Try to use internal functions.
//Read cookie and make sure users are authenticated.
import Cookies from 'universal-cookie';
//Redux imports
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
//Import Actions
import {AddProjectUsers,RemoveProjectUsers, LatLong} from '../actions/ProjectNew';


const cookies = new Cookies();

const Option = Select.Option;

class ProjectUsers extends React.Component {

  componentWillMount() {
    this.fetchUsers();
  }

  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      selectedItems: []
    }
  }

  fetchUsers() {
    fetch(process.env.REACT_APP_APIDOMAIN + '/user/view?token=' + cookies.get('jwt'), {method: 'post'}).then((response) => {
      return response.json();
    }).then((userData) => {
      console.log(userData);
      if (userData) {
        this.setState({userData});
      } else {
        message.error('Login token expired, please log back in.');
        this.props.history.push('/login')
      }
    }).catch(function(err) {
      console.log(err);
    });
  }

  componentWillReceiveProps(props, nextProps) {
  //  console.log('received props!!!!!!!!', props, nextProps)
  }
  //Add items to state
  handleChange = (selectedItems) => {
    var selectedUser = this.state.userData.filter(function(user) {return user.id === selectedItems[selectedItems.length - 1]})[0];
    this.props.AddProjectUsers({
        ...this.props.AddProjectUsers.selectedItems,
        selectedUser
    })
  }

  //Remove items from state
  handleDeselect = (deselectedItems) => {
    console.log('deselected items !!!&&##&#&#&: ',  deselectedItems);
    // console.log(this.props.addProjectUsers.users);
    // var selectedUser = this.state.userData.filter(function(user) {return user.id === deselectedItems[deselectedItems.length - 1]})[0];
    // this.props.RemoveProjectUsers({
    //     ...this.props.AddProjectUsers.selectedItems,
    //     selectedUser
    // })

    // var selectedUser = this.state.userData.filter(function(user) {return user.id === selectedItems[selectedItems.length - 1]})[0];
    // this.props.AddProjectUsers({
    //     ...this.props.AddProjectUsers.selectedItems,
    //     selectedUser
    // })
  }

  render() {
    return (<div>
      <Select mode="multiple" placeholder="Select users" style={{
          width: '100%'
        }} onDeselect={this.handleDeselect} onChange={this.handleChange} filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {this.state.userData.map(user => <Option key={user.id} value={user.id}>{user.name}</Option>)}
      </Select>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    addProjectUsers: state.NewProjectReducer,
  };
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    RemoveProjectUsers: RemoveProjectUsers,
    AddProjectUsers: AddProjectUsers,
    LatLong: LatLong,
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProjectUsers);
