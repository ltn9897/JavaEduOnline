import React from "react";
import $ from "jquery";
import {connect} from 'react-redux';
import {alertDelete, alertCancel} from "../actions/alert"

class Confirm extends React.Component {

	constructor(){
        super()
    }

	delete = () => {
		this.props.alertDelete()
	}

	cancel = () => {
		$('#confirm').fadeOut('fast');
		this.props.alertCancel()
	}

    render() {
        return (
           
			<div className="cd-popup" role="alert">
				<div className="cd-popup-container">
					<p style={{paddingTop:"15px", paddingBottom:"0"}}><span class="iconify" data-icon="ep:warning" data-width="30" ></span></p>
				<p style={{paddingTop:"5px", paddingBottom:"10px"}}> Are you sure you want to delete this?</p>
					<ul className="cd-buttons">
						<li><a href='#' value="yes" onClick={()=>this.delete()}>Delete</a></li>
						<li><a href='#' value="no" onClick={()=>this.cancel()}>Cancel</a></li>
					</ul>
					<a href="#0" className="cd-popup-close img-replace"></a>
				</div> 
			</div> 
			
        );
    }
}

const mapStateToProps = state => {
    return {        
        deleteSuccess: state.alert.deleteSuccess,
        cancelSuccess: state.alert.cancelSuccess,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        alertDelete:() => dispatch (alertDelete()),
        alertCancel:() => dispatch (alertCancel())

    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Confirm);