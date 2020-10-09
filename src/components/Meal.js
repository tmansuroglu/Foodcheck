import React from "react";
import { Form, Input, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateDiet } from "../redux/actions/DietActions";
import { connect } from "react-redux";


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};


const Meal = (props) => {
    const onFinish = values => {
        console.log('Received food values of form:', values);
        props.CreateDiet(values)
    };

    return (
        <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
            <h3>{props.name}</h3>
            <Form.List name="names">
                {(fields, { add, remove }) => {
                    return (
                        <div>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? '' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Please input meal or delete this field.",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="type here" style={{ width: '60%' }} />
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            style={{ margin: '0 8px' }}
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        add();
                                    }}
                                    style={{ width: '60%' }}
                                >
                                    <PlusOutlined /> Add food
                    </Button>

                            </Form.Item>
                        </div>
                    );
                }}
            </Form.List>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
            </Button>
            </Form.Item>
        </Form>
    );
}

const mapStateToProps = (state) => { //makes the state accessible as props
    return {
        diet: state.DietReducer
    }
}

const mapDispatchToProps = (dispatch) => {  //allows you to change state
    return {
        CreateDiet: (diet) => dispatch(CreateDiet(diet)) // logIn refers to a type of action(check actions folder).   must be a function. dispatches action type, redux executes it accordingly
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(Meal);