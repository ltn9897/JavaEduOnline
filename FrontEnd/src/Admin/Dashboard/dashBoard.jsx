import React from "react";
import Footer from "../Layout/footer";
import {connect}  from "react-redux";
import {fetchDashboardRequest} from "../../actions/dashboard"

class DashBoard extends React.Component {
	constructor(props) {
        super(props)

        this.state = {
        }

    }
    
    componentDidMount(){
        this.props.fetchDashboardRequest();
    }

    render() {
		const {dashboard} = this.props
        return (
            <div className="wrapper">
				<div className="sa4d25">
					<div className="container-fluid">			
						<div className="row">
							<div className="col-lg-12">	
								<h2 className="st_title"><i className="uil uil-apps"></i> Dashboard</h2>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6">
								<div className="card_dash">
									<div className="card_dash_left">
										<h5>Total Sales</h5>
										<h2>${dashboard.totalSales}</h2>
										<span className="crdbg_1">New ${dashboard.totalTodaySales}</span>
									</div>
									<div className="card_dash_right">
										<img src="images/dashboard/achievement.svg" alt=""/>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6">
								<div className="card_dash">
									<div className="card_dash_left">
										<h5>Total Enroll</h5>
										<h2>{dashboard.totalEnroll}</h2>
										<span className="crdbg_2">New {dashboard.totalTodayEnroll}</span>
									</div>
									<div className="card_dash_right">
										<img src="images/dashboard/graduation-cap.svg" alt=""/>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6">
								<div className="card_dash">
									<div className="card_dash_left">
										<h5>Total Courses</h5>
										<h2>{dashboard.totalCourses}</h2>
										<span className="crdbg_3">New {dashboard.totalTodayCourses}</span>
									</div>
									<div className="card_dash_right">
										<img src="images/dashboard/online-course.svg" alt=""/>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-lg-6 col-md-6">
								<div className="card_dash">
									<div className="card_dash_left">
										<h5>Total Customers</h5>
										<h2>{dashboard.totalUsers}</h2>
										<span className="crdbg_4">New {dashboard.totalTodayUsers}</span>
									</div>
									<div className="card_dash_right">
										<img src="images/dashboard/knowledge.svg" alt=""/>
									</div>
								</div>
							</div> 					
						</div>
					</div>
				</div>
				<Footer/>
			</div>
        );
    }
}


const mapStateToProps = state => { 
    return {        
		dashboard: state.dashboard.dashboard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDashboardRequest:() => dispatch (fetchDashboardRequest()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(DashBoard);