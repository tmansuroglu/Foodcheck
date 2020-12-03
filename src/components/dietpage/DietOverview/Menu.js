import React from "react";
import { Menu } from "antd";

const menu = handleMealCreation => {
    return (
        <Menu>
            <Menu.Item
                onClick={() => handleMealCreation("Pre-Breakfast Snack")}
            >
                Pre-Breakfast Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Breakfast")}>
                Breakfast
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Lunch Snack")}>
                Pre-Lunch Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Lunch")}>
                Lunch
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Dinner Snack")}>
                Pre-Dinner Snack
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Dinner")}>
                Dinner
            </Menu.Item>
            <Menu.Item onClick={() => handleMealCreation("Pre-Sleep Snack")}>
                Pre-Sleep Snack
            </Menu.Item>
        </Menu>
    );
};

export default menu;
