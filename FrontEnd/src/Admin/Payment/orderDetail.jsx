import React from 'react'
import Footer from '../Layout/footer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrderRequest, fetchOrderByIdRequest } from '../../actions/payment';
import $ from "jquery";
import {withRouterParams} from "../Auth/withRouter"
import sum from "../../Student/Cart/sum"
import moment from 'moment';
import ReactToPrint from "react-to-print";

class OrderDetail extends React.PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id
        }
                       
    }

    print = () => { 
        window.print();
    }

    componentDidMount(){
        this.props.fetchOrderByIdRequest(this.state.id);
    } 
    render() { 
        const { cartItems, orderById } = this.props;
        return (
            <div className="wrapper">		
                <div className="container">
                <div className="row justify-content-md-center"  id="printarea">
                    <div className="col-md-12">
                        <div className="invoice_header_main">
                            <div className="invoice_header_item">
                                <div className="invoice_logo">
                                    <a href="index.html"><img src="/images/ct_logo.svg" alt=""/></a>
                                </div>
                                
                            </div>						
                        </div>						
                    </div>		
                    <div className="col-md-12">
                        <div className="invoice_body">
                            <div className="invoice_dts">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2 className="invoice_title">Cursus, LTD</h2>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="vhls140">
                                            <ul>
                                                <li><div className="vdt-list">590, Cách Mạng Tháng Tám, P11, Quận 3</div></li>
                                                <li><div className="vdt-list">Thành phố Hồ Chí Minh</div></li>
                                                <li><a href="#">  cursus.com</a></li>
                                                
                                            </ul>
                                        </div>		
                                    </div>
                                    <div className="col-md-3">
                                        <div className="vhls140">
                                            <ul>
                                            <li><div className="vdt-list"><span>Date :</span>{moment(orderById.dateOrder).format('MMM DD, YYYY')}</div></li>
                                            <li><div className="vdt-list"><span>Order ID :</span><b>#{orderById.orderNumber}</b> </div></li>
                                
                                            </ul>
                                        </div>		
                                    </div>
                                </div>
                            </div>
                            <div className="invoice_table">
                                <div className="table-responsive-md">
                                    <table className="table table-borderless">
                                        <thead>
                                            <tr>
                                            <th scope="col">Item</th>
                                            <th scope="col">Purchase Date</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                            <th scope="col" >Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                orderById.orderDetails&&orderById.orderDetails.map((order,index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                <div className="user_dt_trans">
                                                                    <p>{order.course.title}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">														
                                                                    <p>{moment(orderById.dateOrder).format('MMM DD, YYYY')}</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">
                                                                    <p>1</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">
                                                                    <p>${order.course.price }</p>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="user_dt_trans">														
                                                                    <p>${orderById.totalAmount }</p>
                                                                </div>
                                                            </td>		
                                                        </tr>);
                                                    }
                                                    
                                                )
                                            } 
                                                <td colSpan={4}></td>
                                                <td colSpan={1} style={{width:"200px"}}>
                                                    <div className="user_dt_trans">														
                                                        <h3>Total paid : ${orderById.totalAmount }</h3>
                                                        <p>Paid via Paypal</p>
                                                    </div>
                                                </td>												
                                            										
                                        </tbody>
                                    </table>	
                                    													
                                </div>
                            </div>
                            <div className="invoice_footer">
                                <div className="leftfooter">
                                    <p>Thanks for buying.</p>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="leftfooter"  style={{paddingTop:"30px"}}>
                
                 <Link to='/orders'><button className="studio-link-btn btn500">Back</button></Link>

                </div>
                {/* <div className="rightfooter"  style={{paddingTop:"30px"}}>
                    <a className="print_btn" type="button" onClick={this.print}>Print</a> 
                </div> */}
                <iframe id="ifmcontentstoprint" 
                    ></iframe> 
		        </div>	
               
                <Footer/>
            </div>
        )
    };
}

const mapStateToProps = state => {
    return {        
        orders: state.payment.orders,
        page: state.payment.page,
        totalPages: state.payment.totalPages,
        orderById: state.payment.order
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderRequest:(e) => dispatch (fetchOrderRequest(e)),
        fetchOrderByIdRequest:(e) => dispatch (fetchOrderByIdRequest(e)),
    };
}

export default withRouterParams(connect(mapStateToProps,mapDispatchToProps)(OrderDetail));

