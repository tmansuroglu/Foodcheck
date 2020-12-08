import React from 'react';
import './index.css';

const Header = () => {
  return (
    <section>
      <div className='foodcheckDescription'>
        <h1 className='foodcheckDescriptionTitle'>FOODCHECK</h1>
        <p className='foodcheckDescriptionText'>
          Foodcheck is a simple diet planning app. It allows you to pick food,
          serving size and amount from its database and makes calorie
          calculation for you. Foodcheck displays daily consumption graphs,
          calories and nutrients per food and diet overview for you to manage
          your diet easily and it is completely free to use!
        </p>
      </div>
    </section>
  );
};

export default Header;
