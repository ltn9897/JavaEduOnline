import React from "react";
import {login, logout} from "../../actions/auth"
import {connect}  from "react-redux"
import { Link } from "react-router-dom"
import {fetchDetailUserRequest} from "../../actions/detail"
import {withRouter} from '../Auth/withRouter'
import { fetchCourseRequest } from "../../actions/course";
import { fetchCatalogRequest} from "../../actions/catalog"

class Header extends React.Component {
    constructor(){
        super()
       
    }

    componentDidMount(){
        this.props.fetchDetailUserRequest();
        this.props.fetchCourseRequest(0);
        this.props.fetchCatalogRequest();
    }
    
    handleInputSearchChange = e => {   
        let value = e.target.value       
        this.setState({searchCourse:value}); 
        console.log(value) 
    }

    searchCourse = (search) => {
        if(search!=''){
            this.props.navigate(`/search/${search}`,{params:search})
        }
        else {
            this.props.navigate('/course')
        }

    }

    // logout = () => {
    //     localStorage.removeItem("accessToken")
    //     alert("logout")
    //     window.location.reload();
    // }

    // loadData = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " + localStorage.getItem("accessToken"));

    //     axios.get('http://localhost:8080/api/users/?pageNumber='+ this.state.page).then((res) => {
    //         this.setState({users: res.data.data.content, 
    //                         page: res.data.data.pageable.pageNumber,
    //                         totalPages: res.data.data.totalPages});   
    //     });

    // }
    render() {
        const { cartItems, catalogs } = this.props;
        return(
            <header className="header  d-flex">
                <button type="button" className="toggle_menu">
                <i className='uil uil-bars'></i>
                </button>
                <button id="collapse_menu" className="collapse_menu">
                    <i className="uil uil-bars collapse_menu--icon "></i>
                    <span className="collapse_menu--label"></span>
                </button>
                <div className="main_logo" id="logo">
                    <Link to ="/"><img src="/images/logo.svg" alt=""/></Link>
                    <Link to ="/"><img className="logo-inverse" src="images/ct_logo.svg" alt=""/></Link>
                </div>
                {localStorage.getItem("role")=="ROLE_ADMIN"?'':
                <div className="top-category">
                    <div className="ui compact menu cate-dpdwn" >
                        <div className="ui simple dropdown item">
                            <a href="#" className="option_links p-0" title="categories" ><i className="uil uil-apps"></i></a>
                            <div className="menu dropdown_category5">
                                {catalogs.map((catalog)=>
                                <Link to='' className="item channel_item" style={{width:"230px"}}><i className="dropdown icon"/><span className="text">{catalog.name}</span>
                                    {catalog.subCatalogs?
                                    <div className="menu">
                                        {catalog.subCatalogs.map((sub)=>
                                        <Link to={`/courses/${sub.name}/${sub.id}`}  params={sub.id} className="item channel_item" style={{textAlign:"center"}}>{sub.name}</Link>)}
                                    </div>:''}
                                </Link>
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>}
                {localStorage.getItem("role")=="ROLE_ADMIN"?
                '':<div class="search120">
                    <div class="ui search">
                    <div class="ui left icon input swdh10">
                        <input className="prompt srch_explore" type="text" placeholder="Search for Courses..." onChange={this.handleInputSearchChange} onKeyPress={e=> e.key==='Enter' && this.searchCourse(this.state.searchCourse)}/>

                        <i class='uil uil-search-alt icon icon1'></i>
                    </div>
                    </div>
                </div>}
                <div className="header_right">
                    <ul>
                        {localStorage.getItem("role")=="ROLE_ADMIN"?
                        <li>
                            <Link to= "/add-course" class="upload_btn" title="Create New Course">Create New Course</Link>
                        </li>:localStorage.getItem("role")=="ROLE_USER"?
                        <><li>
                        <Link to="/enroll-course" params="enroll" class="upload_btn"  title="Enroll">Enroll</Link>
                        </li>
                        <li>
                            <Link to="/cart" class="option_links" title="Cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">{cartItems.length}</span></Link>
				        </li></>
                        :
                        <li>
                            <Link to="/cart" class="option_links" title="Cart"><i class='uil uil-shopping-cart-alt'></i><span class="noti_count">{cartItems.length}</span></Link>
				        </li>}
                        
                        <li className="ui dropdown">
                            <a href="#" className="opts_account" title="Account">
                                <img src={this.props.user.avatarImage} alt="" style={{height:"35px"}}/>
                            </a>
                            <div className="menu dropdown_account">
                                <div className="channel_my">
                                    <div className="profile_link">
                                        <img src={this.props.user.avatarImage} alt="" style={{height:"36px"}}/>
                                        
                                        <div className="pd_content">
                                            <div className="rhte85">
                                                <h6>{this.props.user.username}</h6>
                                                <div className="mef78" title="Verify">
                                                    <i className='uil uil-check-circle'></i>
                                                </div>
                                            </div>
                                            <span>{this.props.user.email}</span>
                                        </div>		
                                    </div>
                                </div>
                                <div className="night_mode_switch__btn">
                                    <a href="#" id="night-mode" className="btn-night-mode">
                                        <i className="uil uil-moon"></i> Night
                                        <span className="btn-night-mode-switch">
                                            <span className="uk-switch-button"></span>
                                        </span>
                                    </a>
                                </div>
                                
                                <Link to='/detail' params="user" className="item channel_item" >View Profile</Link>
                                <Link to='/change-password' className="item channel_item" >Change Password</Link>	
                                	
                                {/* <Link to='/help' className="item channel_item">Help</Link> */}
                                <Link to='/' className="item channel_item" onClick={this.props.logout}>Sign Out</Link>
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
        username: state.auth.username,
        token: state.auth.token,
        role: state.auth.role,
        user: state.detail.user,
        cartItems: state.cart.items,
        catalogs: state.catalog.catalogs,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout())
            localStorage.removeItem("isLogin");
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            this.props.navigate('/index');
            window.location.reload();
        },
        fetchCourseRequest:(e) => dispatch (fetchCourseRequest(e)),
        fetchDetailUserRequest:() => dispatch (fetchDetailUserRequest()),
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
    };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))