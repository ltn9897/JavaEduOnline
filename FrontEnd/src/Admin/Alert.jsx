import React from "react";
import $ from "jquery"

// $("#test").delay(5000).fadeOut();


class Alert extends React.Component {

	constructor(){
        super()
       
    }
    
    render() {
        return (
            <div className="alert_wrapper"  >
				<div className="alert_backdrop"></div>
				    <div className="alert_inner">
					
					<div className="alert_item alert_success active">
						<div className="icon data_icon">
							<i className="fas fa-check-circle"></i>
						</div>
						<div className="data">
							<p className="title"><span>Success</span>
							</p>
                            
							
						</div>
                        
						{/* <div className="icon close">
							<i className="fas fa-times"></i>
						</div> */}
					</div>
				</div>
			</div>
        );
    }
}

export default Alert;