import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select, Input, Button } from 'antd';

const { Option } = Select;

class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: null,
      status: 'scheduled',
    }
  }
  componentDidMount() {
    const { title, status } = this.props.values;
    if (title && status){
      this.setState({
        title,
        status,
      });
      this.props.form.setFieldsValue({title, status});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.loading && prevProps.loading) {
      this.setState({
        title: null,
        status: 'scheduled',
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  };

  handleSelectChange = (value) => {
   this.setState({
     status: value,
   })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item
          label="Title"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input todo title!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Status"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('status', {
            rules: [{ required: true, message: 'Please select todo status!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="scheduled">Scheduled</Option>
              <Option value="in progress">In progress</Option>
              <Option value="done">Done</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  values: PropTypes.object,
};

TodoForm.defaultProps = {
  loading: false,
  values: {},
};

const wrappedForm = Form.create({ name: 'todo_form' })(TodoForm);

export default wrappedForm;