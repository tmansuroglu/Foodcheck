import React from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { connect } from "react-redux";
import { SignIn } from "../redux/actions/AuthActions";
import { Redirect } from "react-router-dom";

function LoginForm(props) {
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    const tailLayout = {
        wrapperCol: { offset: 8, span: 16 },
    };

    const onFinish = values => {
        console.log("Success:", values);
        props.auth(values);
    };

    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };
    if (props.authStatus) {
        return <Redirect to="/" />;
    } else {
        return (
            <Row style={{ marginTop: "10vh" }}>
                <Col span={10} offset={7}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                },
                                {
                                    required: true,
                                    message: "Please input your E-mail!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            {...tailLayout}
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                            <div>{props.authError ? props.authError : ""}</div>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        authError: state.AuthReducer.authError,
        authStatus: state.firebase.auth.uid,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        auth: user => dispatch(SignIn(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
