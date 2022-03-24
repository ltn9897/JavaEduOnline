import React from "react";
import $ from "jquery"

// $("#test").delay(5000).fadeOut();


class Warning extends React.Component {

	constructor(){
        super()
		this.state = ({
			
		})
    }
    
    render() {
        return (
            <div className="alert_wrapper"  >
				<div className="alert_backdrop"></div>
				    <div className="alert_inner">
					
					<div className="alert_item alert_warning active">
						<div className="icon data_icon">
                            <i className="fas fa-exclamation-triangle"></i>
						</div>
						<div  className="data" style={{width:"300px"}}>
							{/* <p  className="title"><span>Warning</span>
							</p> */}
                            
							<span style={{fontSize:"16px",width:"200px"}}>{this.props.name?this.props.name:''}</span>
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

export default Warning;