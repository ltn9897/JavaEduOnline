import React from "react";
import FooterUser from "../Layout/footerUser"
import { connect } from 'react-redux';
import { fetchCourseRequest } from "../../actions/course";
import { fetchDetailUserRequest } from "../../actions/detail";
import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../../actions/cart";
import sum from "../Cart/sum"
import { fetchPaymentRequest } from "../../actions/payment";
import Success from "../../Alert/success"
import Error from "../../Alert/error"
import validator from "validator";
import { withRouter } from "../../Admin/Auth/withRouter"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { fetchAllEnrollRequest } from "../../actions/course";

const initialOptions = {
	"client-id": "ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr",
	"currency": "USD",
	"intent": "capture",
	"data-client-token": "EPvXfu7wGWNtrVgVmSrkwTUBQMzYNbLi0gE0fWbfg63XNOkmwkpmfytv3UjgMym9hoJMzdk-J4KRObiu",
};

class Checkout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			course: '',
			checkout: {
				billingAddress: '',
				nameHolder: '',
				cardNumber: '',
				expirationDate: '',
				zipcode: '',
				cvv: '',
			},
			showButtons: false,
			loading: true,
			paid: false,
			error: {},
		}
	}

	validate = () => {
        let isValid = true;

        const error = {}

		if(this.props.cartItems.length<=0){
			error['cart'] = 'Shopping Cart is empty! Go to shopping now';
            isValid = false;
		}

        this.setState({
            error: error
        })

        return isValid;
    }

	createOrder(data, actions, sum) {
		return actions.order.create({
			purchase_units: [
				{
					amount: {
						currency_code: "USD",
						value: sum,
					},
				},
			],
		});
	}

	onApprove(data, actions, items) {
		actions.order.capture().then(details => {
			const paymentData = {
				payerID: data.payerID,
				orderID: data.orderID
			};
			// console.log("Payment Approved: ", paymentData);
			this.setState({ showButtons: false, paid: true });
			let info = {};
			const cartId = [...new Set(items.map(item => item.id))];
			info.courseIds = cartId;
			info.orderId = paymentData.orderID;
			this.props.fetchPaymentRequest(info);
			setTimeout(() => {
				this.props.navigate('/orders')
			}, 2000);
		});

	}

	componentDidMount() {
		this.props.fetchDetailUserRequest();
		this.props.fetchAllEnrollRequest()
	}

	componentDidUpdate() {
        this.props.cartItems.map((item) => 
            this.props.enroll.map((course)=> 
            (item.id == course.id)?
                this.props.removeFromCart(this.props.cartItems,item):'')
        )
    }



	render() {
		const { cartItems, user } = this.props;
		return (
			<div className="wrapper">
				<div className="_215b15">
					<div className="container">
						<div className="row">
							<div className="col-lg-12">
								<div className="title125">
									<div className="titleleft">
										<div className="ttl121">
											<h2>Checkout</h2>
										</div>
									</div>
								</div>
								{this.props.message == "Success" ?
									<div id="success" style={{ display: "none" }}><Success name="Order Successful" /></div> :
									<div id="success" style={{ display: "none" }}><Error name={this.props.message} /></div>
								}
								<div className="title126">

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mb4d25">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<div className="membership_chk_bg">
									
									<div className="checkout_title">
										<h4>Payment Method</h4>
										<img src="images/line.svg" alt="" />
									</div>
									<div className="tab-content" id="myTabContent">
										<div className="tab-pane fade show active" id="payapl-method-tab" role="tabpanel" aria-labelledby="payapl-tab">
											<div className="row">
												<div className="col-md-12">
													{this.props.cartItems.length<=0?
													<div className="order_dt_section">
														<div className="validation alert alert-warning">Shopping Cart is empty! Go to shopping <Link to='/course'>NOW</Link></div>
													</div>:
													<PayPalScriptProvider options={{ "client-id": "ATNmz7NaSvnCl1jq5kkub9a0jB8chvoO7VWkYSdZMSVTThE80teaQCyYuIIU-viT9-C9bsB7pca_dEhr" }}>
														<PayPalButtons style={{ layout: "horizontal" }} createOrder={(data, actions) => this.createOrder(data, actions, sum.formatCurrency(cartItems.reduce((a, c) => a + c.price, 0)))}
															onApprove={(data, actions) => this.onApprove(data, actions, cartItems)} />
													</PayPalScriptProvider>}
													<p className="t-body">After payment via PayPal's secure checkout, we will send you a link to download your files.</p>
													<div className="media h-mt2">
														<div className="media__item -align-center">
															<p className="t2-body h-m0">PayPal accepts</p>
														</div>
														<div className="media__body">
															<ul id="paypal-gateway" className="financial-institutes">
																<li className="financial-institutes__logo">
																	<img alt="Visa" title="Visa" src="images/membership/pyicon-1.svg" />
																</li>
																<li className="financial-institutes__logo">
																	<img alt="MasterCard" title="MasterCard" src="images/membership/pyicon-2.svg" />
																</li>
																<li className="financial-institutes__logo">
																	<img alt="American Express" title="American Express" src="images/membership/pyicon-3.svg" />
																</li>
																<li className="financial-institutes__logo">
																	<img alt="Discover" title="Discover" src="images/membership/pyicon-4.svg" />
																</li>
																<li className="financial-institutes__logo">
																	<img alt="China UnionPay" title="China UnionPay" src="images/membership/pyicon-5.svg" />
																</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="chckout_order_dt">
										<div className="checkout_title">
											<h4>Order Details</h4>
											<img src="images/line.svg" alt="" />
										</div>


										<div className="order_dt_section">
											{cartItems.map((item) => (

												<div className="order_title">

													<h4><Link to={`/course/${item.id}`} params={item.id} className="hf_img">
														<img className="cart_img" style={{ width: "100px" }} src={item.imageVideoDescription} alt="" />
													</Link>{item.title}</h4>
													<div className="order_price">${item.price}</div>
												</div>
											))}
											<div className="order_title">
												<h6>Discount</h6>
												<div className="order_price">$0</div>
											</div>
											<div className="order_title">
												<h3>Total</h3>
												<div className="order_price">${sum.formatCurrency(
													cartItems.reduce((a, c) => a + c.price, 0)
												)}</div>
											</div>

										</div>
										


									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="membership_chk_bg rght1528">
									<div className="checkout_title">
										<h4>Order Summary</h4>
										<img src="images/line.svg" alt="" />
									</div>
									<div className="order_dt_section">
										<div className="order_title">
											<h4>Orignal Price</h4>
											<div className="order_price">${sum.formatCurrency(
												cartItems.reduce((a, c) => a + c.price, 0)
											)}</div>
										</div>
										<div className="order_title">
											<h6>Discount Price</h6>
											<div className="order_price">$0</div>
										</div>
										<div className="order_title">
											<h2>Total</h2>
											<div className="order_price5">${sum.formatCurrency(
												cartItems.reduce((a, c) => a + c.price, 0)
											)}</div>
										</div>
										{/* <button className="chck-btn22" type="button" onClick={()=>this.checkoutCart(cartItems, this.state.checkout)}>Complete Payment</button> */}
										<div className="scr_text"><i className="uil uil-lock-alt"></i>Secure checkout</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<FooterUser />
			</div>
		);
	}

};

const mapStateToProps = state => {
	return {
		user: state.detail.user,
		cartItems: state.cart.items,
        enroll: state.course.coursesEnroll,
		message: state.payment.messageSuccess,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchDetailUserRequest: () => dispatch(fetchDetailUserRequest()),
		fetchPaymentRequest: (e) => dispatch(fetchPaymentRequest(e)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
        removeFromCart: (e, p) => dispatch(removeFromCart(e, p)),

	};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
