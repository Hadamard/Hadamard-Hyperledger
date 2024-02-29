import React, { PureComponent, Fragment } from 'react';
import { connect, injectIntl } from 'umi';

@connect(({ network, node, user, organization, loading }) => ({
  node,
  user,
  organization,
  loadingNodes: loading.effects['node/listNode'],
  loadingUsers: loading.effects['user/fetch'],
  creatingUser: loading.effects['user/createUser'],
  network,
  loadingNetworks: loading.effects['network/listNetwork'],
}))
class UserManagement extends PureComponent {
    
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetch',
     
    });
  }


  render() {
    
    const {
      user: { users, pagination, currentUser },
      organization: { organizations },
      loadingUsers,
      node: { nodes },
      loadingNodes,
      network: { networks },
      loadingNetworks,
      creatingUser,
      dispatch,
      intl,
    } = this.props;
   
     
   

   
   console.log(users);
   console.log(currentUser.username);
   console.log(nodes);
   console.log(networks);

    
    return (
      <div>
      {/* Hier können Inhalte hinzugefügt werden, wenn benötigt */}
    </div>
    );
  }
}
export default injectIntl(UserManagement);
