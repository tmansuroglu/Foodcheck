import React from "react";
import { List, Avatar } from "antd";
const ListItem = ({ item }) => {
    return (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={item.photo.thumb} />}
                title={
                    <>
                        <span
                            style={{
                                float: "left",
                            }}
                        >
                            {item.nutrientsConsumed.serving_amount}{" "}
                            {item.nutrientsConsumed.serving_size}{" "}
                            {item.food_name}
                        </span>
                        <span
                            style={{
                                float: "right",
                            }}
                        >
                            {item.nutrientsConsumed.calories} kcal
                        </span>
                    </>
                }
            />
        </List.Item>
    );
};

export default ListItem;
