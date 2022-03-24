import React from "react";
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import { fetchCatalogRequest} from "../../actions/catalog"
import {fetchSubCatalogByIdRequest} from "../../actions/subCatalog"

class MenuUser extends React.Component {
    componentDidMount(){
        this.props.fetchCatalogRequest();
        
    }

    
    render() {
        return(
            <nav className="vertical_nav">
                <div className="left_section menu_left" id="js-menu" >
                    <div className="left_section">
                        <ul>
                            <li className="menu--item">
                                <Link to= "/index" className="menu--link" title="Home">
                                    <i className='uil uil-home-alt menu--icon'></i>
                                    <span className="menu--label">Home</span>
                                </Link>
                            </li>
                            <li className="menu--item">
                                <Link to="/course" className="menu--link" title="Explore">
                                    <i className='uil uil-search menu--icon'></i>
                                    <span className="menu--label">Explore</span>
                                </Link>
                            </li>
                            {localStorage.getItem("isLogin")?
                            <li className="menu--item">
                                <Link to="detail/user" params='user' className="menu--link" title="Profile">
                                    <i className='uil uil-clipboard-alt menu--icon'></i>
                                    <span className="menu--label">Profile</span>
                                </Link>
                            </li>
                            :''}
                            <li className="menu--item menu--item__has_sub_menu">
                                <label className="menu--link" title="Categories">
                                    <i className='uil uil-layers menu--icon'></i>
                                    <span className="menu--label">Categories</span>
                                </label>
                                <ul className="sub_menu">
                                    {this.props.catalogs.map((catalog,i) => {
                                        return (
                                            
                                    <li className="menu--item menu--item__has_sub_menuu" key={i}>
                                        <label className="menu--linkk" title="Categories">
                                            <span className="menu--labell">{catalog.name}</span>
                                        </label>
                                        
                                        <ul className="sub_menuu">
                                            {catalog.subCatalogs.map((subCatalog,index) => {
                                            return (
                                                <li className="sub_menu--itemm" key={index}>
                                                    <Link to={`/courses/${subCatalog.name}/${subCatalog.id}`}  params={subCatalog.id}  className="sub_menu--linkk">{subCatalog.name}
                                                    </Link>
                                                </li>
                                            )})}
                                            
                                        </ul>
                                    </li>
                                    )})}
                                   
                                </ul>
                            </li>
                            
                            {localStorage.getItem("role")=="ROLE_USER"?
                            <li className="menu--item">
                                <Link to='saved-course' className="menu--link" title="Saved Courses">
                                <i className="uil uil-heart-alt menu--icon"></i>
                                <span className="menu--label">Favorite Courses</span>
                                </Link>
                            </li>:''}
                            {localStorage.getItem("role")=="ROLE_USER"?
                            <li className="menu--item">
                                <Link to='enroll-course' className="menu--link" title="Enroll Courses">
                                <i class="uil uil-bag menu--icon"></i>
                                <span className="menu--label">Enroll</span>
                                </Link>
                            </li>:''}
                            {localStorage.getItem("role")=="ROLE_USER"?
                            <li class="menu--item">
                                <Link to="orders" class="menu--link" title="Orders">
                                <i class='uil uil-file-alt menu--icon'></i>
                                <span class="menu--label">Orders</span>
                                </Link>
                            </li>:''}
                            <li class="menu--item  menu--item__has_sub_menu">
                                <label class="menu--link" title="Pages">
                                <i class='uil uil-file menu--icon'></i>
                                <span class="menu--label">Pages</span>
                                </label>
                                <ul class="sub_menu">
                                    <li class="sub_menu--item">
                                        <Link to ="/about" class="sub_menu--link">About</Link>
                                    </li>
                                    
                                    <li class="sub_menu--item">
                                        <Link to ="/contact" class="sub_menu--link">Contact</Link>
                                    </li>
                                    <li class="sub_menu--item">
                                        <Link to ="/privacy" class="sub_menu--link">Privacy Policy</Link>
                                    </li>
                                
                                </ul>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="left_section pt-2">
                        <ul>
                            <li className="menu--item">
                                <Link to ="/help" className="menu--link" title="Help">
                                    <i className='uil uil-question-circle menu--icon'></i>
                                    <span className="menu--label">Help</span>
                                </Link>
                            </li>
                            <li class="menu--item">
                                <Link to="/report" class="menu--link" title="Report History">
                                    <i class='uil uil-windsock menu--icon'></i>
                                    <span class="menu--label">Report History</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    
                    
                    <div className="left_footer">
                        <ul>
                            <li><Link to ="/about">About</Link></li>
                            <li><Link to ="/contact">Contact Us</Link></li>
                            <li><Link to ="/privacy">Privacy Policy</Link></li>
                        </ul>
                        <div className="left_footer_content">
                            <p>© 2022 <strong>Cursus</strong>. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </nav>
            
        );
    }
};

const mapStateToProps = state => {
    return {        
        catalogs: state.catalog.catalogs,
        subCatalog: state.subCatalog.subCatalog
    }
}

const mapDispatchToProps = dispatch => {
    return {
        
        fetchCatalogRequest:() => dispatch (fetchCatalogRequest()),
        fetchSubCatalogByIdRequest:(e) => dispatch (fetchSubCatalogByIdRequest(e))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuUser)