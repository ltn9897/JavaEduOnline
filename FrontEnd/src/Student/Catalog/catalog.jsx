import React from "react";

class Catalog extends React.Component {
    render(){
        return (
            <ul className="sub_menu">
                <li className="sub_menu--item">
                    <a href="#" className="sub_menu--link">Development</a>
                </li>
                <li className="sub_menu--item">
                    <a href="#" className="sub_menu--link">Business</a>
                </li>
            </ul>
        );
    }
}

export default Catalog;