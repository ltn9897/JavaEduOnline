import React from "react";
import FooterUser from "../Layout/footerUser"
import { connect } from 'react-redux';
import { fetchCourseRequest } from "../../actions/course";
import { fetchDetailUserRequest } from "../../actions/detail";
import OwlCarousel from 'react-owl-carousel';
import { Link } from "react-router-dom";
import { addToCart, clearFromCart, removeFromCart } from "../../actions/cart";
import sum from "./sum";
import $ from "jquery"
import {fetchAllEnrollRequest} from "../../actions/course"

class CartInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            course: '',
        }
    }

    componentDidMount() {
        this.props.fetchCourseRequest(0);
        this.props.fetchAllEnrollRequest()
    }

    componentDidUpdate() {
        this.props.cartItems.map((item) => 
            this.props.enroll.map((course)=> 
            (item.id == course.id)?
                this.props.removeFromCart(this.props.cartItems,item):'')
        )
    }

    clearCart = () => {
        $('#confirm').fadeIn('fast')
    }
    alertDelete = () => {
        this.props.clearFromCart()
        $('#confirm').fadeOut('fast');
    }

    alertCancel = () => {
        $('#confirm').fadeOut('fast');
    } 

    render() {
        const { cartItems } = this.props;
        return (
            <div className="wrapper">
                <div className="_215b15">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="title125">
                                    <div className="titleleft">
                                        <div className="ttl121">
                                            <h2>Shopping Cart</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal fade "  tabindex="-1" id='confirm' aria-hidden="true">
                                    <div className="modal-dialog modal-lg modal-content" style={{border: "none"}} >
                                        <div className="cd-popup" role="alert">
                                            <div className="cd-popup-container">
                                                <p style={{paddingTop:"15px", paddingBottom:"0"}}><span class="iconify" data-icon="ep:warning" data-width="30" ></span></p>
                                                <p style={{paddingTop:"5px", paddingBottom:"10px"}}> Are you sure?</p>
                                                <ul className="cd-buttons">
                                                    <li><a  type="button" data-dismiss="modal" onClick={()=>this.alertDelete()}>YES</a></li>
                                                    <li><a type="button" data-dismiss="modal">NO</a></li>
                                                </ul>
                                                <button type="button" className=" cd-popup-close close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div> 
                                        </div> 
                                    </div>
                                </div>
                                <div className="title126">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {cartItems ? (
                    <div className="mb4d25">
                        <div className="container">

                            <div className="row">

                                <div className="col-lg-8">

                                    {cartItems.map((item) => (
                                        <div className="fcrse_1">
                                            <Link to={`/course/${item.id}`} params={item.id} className="hf_img">
                                                <img className="cart_img" src={item.imageVideoDescription} alt="" />
                                            </Link>
                                            <div className="hs_content">
                                                <div className="eps_dots eps_dots10 more_dropdown">
                                                    <a href="#" onClick={(e) => this.props.removeFromCart(this.props.cartItems, item)}><i className='uil uil-times'></i></a>
                                                </div>
                                                <Link to={`/course/${item.id}`} params={item.id} className="crse14s title900 pt-2">{item.title}</Link>
                                                <a href="#" className="crse-cate">{item.shortDescription}</a>
                                                <div className="auth1lnkprce">
                                                    {/* <p className="cr1fot">By <a href="#">John Doe</a></p> */}
                                                    <div className="prce142">${item.price}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {cartItems.length > 0 ?
                                        <a href="#" type="button"data-toggle="modal" data-target='#confirm' data-backdrop="static" data-keyboard="false" onClick={() => this.clearCart()} className="chck-btn22">Clear All Cart</a>
                                        : ''}</div>


                                <div className="col-lg-4">
                                    <div className="membership_chk_bg rght1528">
                                        <div className="checkout_title">
                                            <h4>Total</h4>
                                            <img src="images/line.svg" alt="" />
                                        </div>
                                        <div className="order_dt_section">
                                            <div className="order_title">
                                                <h4>Orignal Price</h4>
                                                <div className="order_price">${sum.formatCurrency(
                                                    cartItems.reduce((a, c) => a + c.price, 0)
                                                )}
                                                </div>
                                            </div>
                                            <div className="order_title">
                                                <h6>Discount Price</h6>
                                                <div className="order_price">$0</div>
                                            </div>
                                            <div className="order_title">
                                                <h2>Total</h2>
                                                <div className="order_price5">${sum.formatCurrency(
                                                    cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                                )}</div>
                                            </div>
                                            {/* <div className="coupon_code">
                                                <p>Learn now is applied.</p>
                                                <div className="coupon_input">
                                                    <div className="ui search focus mt-15">
                                                        <div className="ui left icon input swdh11 swdh19">
                                                            <input className="prompt srch_explore" type="text" name="couponcode" value="" id="id_coupon_code" required="" maxlength="6" placeholder="Enter Coupon Code"/>
                                                        </div>
                                                        <button className="code-apply-btn" type="submit">Apply</button>
                                                    </div>
                                                </div>
                                            </div> */}

                                            {localStorage.getItem("isLogin") ?
                                                <Link to="/checkout" className="chck-btn22">Checkout Now</Link>
                                                : <a href="/login" className="chck-btn22" >Login Now</a>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                    <div className="mb4d25">
                        <div className="container">

                            <div className="row">
                                <div className="col-lg-8"></div>

                                <div className="col-lg-4">
                                    <div className="membership_chk_bg rght1528">
                                        <div className="checkout_title">
                                            <h4>Total</h4>
                                            <img src="images/line.svg" alt="" />
                                        </div>
                                        <div className="order_dt_section">
                                            <div className="order_title">
                                                <h4>Orignal Price</h4>
                                                <div className="order_price">$0
                                                </div>
                                            </div>
                                            <div className="order_title">
                                                <h6>Discount Price</h6>
                                                <div className="order_price">$0</div>
                                            </div>
                                            <div className="order_title">
                                                <h2>Total</h2>
                                                <div className="order_price5">$0</div>
                                            </div>
                                            {/* <div className="coupon_code">
                                                <p>Learn now is applied.</p>
                                                <div className="coupon_input">
                                                    <div className="ui search focus mt-15">
                                                        <div className="ui left icon input swdh11 swdh19">
                                                            <input className="prompt srch_explore" type="text" name="couponcode" value="" id="id_coupon_code" required="" maxlength="6" placeholder="Enter Coupon Code"/>
                                                        </div>
                                                        <button className="code-apply-btn" type="submit">Apply</button>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {localStorage.getItem("isLogin") ?
                                                <Link to="/checkout" className="chck-btn22">Checkout Now</Link>
                                                : <a href="/login" className="chck-btn22" >Login Now</a>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                <FooterUser />
            </div>
        );
    }

};

const mapStateToProps = state => {
    return {
        courses: state.course.courses,
        page: state.course.page,
        totalPages: state.course.totalPages,
        user: state.detail.user,
        enroll: state.course.coursesEnroll,
        cartItems: state.cart.items,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCourseRequest: (e) => dispatch(fetchCourseRequest(e)),
        fetchDetailUserRequest: () => dispatch(fetchDetailUserRequest()),
        addToCart: (e, p) => dispatch(addToCart(e, p)),
        removeFromCart: (e, p) => dispatch(removeFromCart(e, p)),
        fetchAllEnrollRequest:() => dispatch (fetchAllEnrollRequest()),
        clearFromCart: () => dispatch(clearFromCart()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartInfo);
