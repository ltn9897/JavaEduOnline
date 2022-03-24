import React from "react";
import axios from "axios";
import validator from 'validator';
import { USER_INFO_API_BASE_URL } from "../../config/env";
import $ from "jquery";
import Success from "../../Alert/success";
import Error from "../../Alert/error";
import { withRouter } from "../../Admin/Auth/withRouter"
import { Link } from "react-router-dom"

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            addUser: {
                username: '',
                email: '',
                password: '',
                confirmPassword: '',
            },
            error: {},
            isShow: false,
            messageSuccess: '',
        }

        this.handleInputChange = this.handleInputChange.bind(this);

    }

    validateFormData = () => {
        let isValid = true;

        const error = {}

        if (validator.isEmpty(this.state.addUser.username)) {
            error['username'] = 'The Username field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.password)) {
            error['password'] = 'The Password field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.confirmPassword)) {
            error['confirmPassword'] = 'The Confirm password field is required.';
            isValid = false;
        }

        if (validator.isEmpty(this.state.addUser.email)) {
            error['email'] = 'The Email field is required.';
            isValid = false;
        }

        if (this.state.addUser.email !== '') {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.addUser.email)) {
                isValid = false;
                error["email"] = "Please enter valid email address.";
            }
        }

        this.setState({
            error: error
        })

        return isValid;
    }

    handle = (mess) => {

        this.setState({ messageSuccess: mess })

        if (mess == "Success") {
            $('#signup').fadeIn('fast').delay(1000).fadeOut('slow');
            setTimeout(() => {
                this.props.navigate('/login')
                window.location.reload();
            }, 2000);
        }
        else {
            $('#error').fadeIn('fast').delay(1000).fadeOut('slow');
        }


    }

    handleInputChange = e => {
        let formData = Object.assign({}, this.state.addUser);
        console.log(formData)
        formData[e.target.name] = e.target.value;
        this.setState({ addUser: formData });
        console.log(formData)
    }

    handleSubmit = (addUser) => {
        if (this.validateFormData()) {
            axios.post('http://localhost:8080/api/auth/signup', addUser).then(res => {
                // update state.staff.staffInfo
                //this.setState({addUser: res.data.data}) 
                this.handle(res.data.message);
            })
        }
    }

    showHide = () => {
        this.state.isShow ?
            this.setState({
                isShow: false
            }) :
            this.setState({
                isShow: true
            });
    }

    render() {
        return (
            <div className="sign_in_up_bg">
                <div className="container">
                    <div className="row justify-content-lg-center justify-content-md-center">
                        <div className="col-lg-12">
                            <div className="main_logo25" id="logo">
                                <a href="index.html"><img src="images/logo.svg" alt="" /></a>
                                <a href="index.html"><img className="logo-inverse" src="images/ct_logo.svg" alt="" /></a>
                            </div>
                        </div>
                        <div id="signup" style={{ display: "none" }}><Success name={this.state.messageSuccess} /></div>
                        <div id="error" style={{ display: "none" }}><Error name={this.state.messageSuccess} /></div>

                        <div className="col-lg-6 col-md-8">
                            <div className="sign_form">
                                <h2>Welcome to Cursus</h2>
                                <p>Sign Up and Start Learning!</p>
                                <form>
                                    <div className="ui search focus">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input className="prompt srch_explore" type="text" name="username" maxlength="64" placeholder="Username" onChange={this.handleInputChange} />
                                        </div>
                                        {this.state.error.username && <div className="validation alert alert-warning">{this.state.error.username}</div>}

                                    </div>
                                    <div className="ui search focus mt-15">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input className="prompt srch_explore" type="text" name="email" maxlength="64" placeholder="Email Address" onChange={this.handleInputChange} />
                                        </div>
                                        {this.state.error.email && <div className="validation alert alert-warning">{this.state.error.email}</div>}

                                    </div>
                                    <div className="ui search focus mt-15">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input className="prompt srch_explore" type="password" name="password" maxlength="64" placeholder="Password" onChange={this.handleInputChange} />
                                        </div>
                                        {this.state.error.password && <div className="validation alert alert-warning">{this.state.error.password}</div>}

                                    </div>
                                    <div className="ui search focus mt-15">
                                        <div className="ui left icon input swdh11 swdh19">
                                            <input className="prompt srch_explore" type="password" name="confirmPassword" maxlength="64" placeholder="Confirm password" onChange={this.handleInputChange} />
                                        </div>
                                        {this.state.error.confirmPassword && <div className="validation alert alert-warning">{this.state.error.confirmPassword}</div>}

                                    </div>
                                    <button className="login-btn" type="button" onClick={() => this.handleSubmit(this.state.addUser)}>Signup</button>
                                </form>
                                <p className="sgntrm145">By signing up, you agree to our <Link to="/privacy">Privacy Policy</Link>.</p>
                                <p className="mb-0 mt-30">Already have an account? <Link to="/login">Log In</Link></p>
                            </div>
                            <div className="sign_footer"><img src="images/sign_logo.png" alt="" />© 2022 <strong>Cursus</strong>. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Signup);