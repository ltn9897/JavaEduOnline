import React from "react";
import {Link} from "react-router-dom";
import { fetchCourseRequest } from "../../actions/course";
import {connect}  from "react-redux";
import { fetchCatalogRequest} from "../../actions/catalog";
import {withRouter} from "../../Admin/Auth/withRouter"

class HeaderGuest extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchCourseRequest(0);
    }

    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value}); 
        console.log(value) 
    }

    searchCourse = (search) => {
        this.props.navigate(`/search/${search}`,{params:search})
    }
    render() {
        const { cartItems, catalogs } = this.props;
        return (
            <header className="header clearfix">
                <button type="button" id="toggleMenu" className="toggle_menu">
                <i className='uil uil-bars'></i>
                </button>
                <button  className="collapse_menu">
                    <i className="uil uil-bars collapse_menu--icon "></i>
                    <span className="collapse_menu--label"></span>
                </button>
                <div className="main_logo" id="logo">
                    <Link to = "/"><img src="/images/logo.svg" alt="" /></Link>
                    <Link to ="/"><img className="logo-inverse" src="images/ct_logo.svg" alt=""/></Link>
                </div>
                <div className="top-category">
                    <div className="ui compact menu cate-dpdwn" >
                        <div className="ui simple dropdown item">
                            <a href="#" className="option_links p-0" title="categories" ><i className="uil uil-apps"></i></a>
                            <div className="menu dropdown_category5">
                                {catalogs.map((catalog)=>
                                <Link to="/course" className="item channel_item" style={{width:"230px"}}><i className="dropdown icon"/><span className="text">{catalog.name}</span>
                                    {catalog.subCatalogs?
                                    <div className="menu">
                                        {catalog.subCatalogs.map((sub)=>
                                        <Link to="/" className="item channel_item">{sub.name}</Link>)}
                                    </div>:''}
                                </Link>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div class="search120">
                    <div class="ui search">
                    <div class="ui left icon input swdh10">
                    <input className="prompt srch_explore" type="text" placeholder="Search for Courses..." onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchCourse(this.state.searchCourse)}/>

                        <i class='uil uil-search-alt icon icon1'></i>
                    </div>
                    </div>
                </div>
                <div className="header_right">
                    <ul>
                        <li>
                            <a href="/login" class="upload_btn" title="Login">Login</a>
                        </li>
                        <li>
                            <Link to="/cart" class="option_links" title="cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">{cartItems?cartItems.length:'0'}</span></Link>
				        </li>
                        
                        <li className="ui dropdown">
                            <a href="#" className="opts_account" title="Account">
                                <img src="images/hd_dp.jpg" alt=""/>
                            </a>
                            <div className="menu dropdown_account">
                                <div className="channel_my">
                                    <div className="profile_link">
                                        <img src="images/hd_dp.jpg" alt=""/>
                                        <div className="pd_content">
                                            <div className="rhte85">
                                                <h6>Guest</h6>
                                                <div className="mef78" title="Verify">
                                                    <i className='uil uil-check-circle'></i>
                                                </div>
                                            </div>
                                            <span>Please Login to your account</span>
                                        </div>							
                                    </div>						
                                </div>
                                <div className="night_mode_switch__btn">
                                    <a href="#" id="night-mode" className="btn-night-mode">
                                        <i className="uil uil-moon"></i> Night mode
                                        <span className="btn-night-mode-switch">
                                            <span className="uk-switch-button"></span>
                                        </span>
                                    </a>
                                </div>
                                <a href='/login' className="item channel_item">Sign In </a>
                                <a href='/signup' className="item channel_item">Sign Up </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </header>
        );
    }  
};
 
const mapStateToProps = state => {
    return {        
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
     
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderGuest))