import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: null
        }
        this.handlenameclick = this.handlenameclick.bind(this);
        this.handleemailclick = this.handleemailclick.bind(this);
        this.handlephoneclick = this.handlephoneclick.bind(this);
        this.handleresnameclick = this.handleresnameclick.bind(this);
        this.handlecuisineclick = this.handlecuisineclick.bind(this);
        this.handlepasswordclick = this.handlepasswordclick.bind(this);
    }
    handlenameclick() {
        this.setState({ edit: "name" });
    }
    handleemailclick() {
        this.setState({ edit: "email" });
    }
    handlephoneclick() {
        this.setState({ edit: "phone" });
    }
    handleresnameclick() {
        this.setState({ edit: "resname" });
    }
    handlecuisineclick() {
        this.setState({ edit: "cuisine" });

    }
    handlepasswordclick() {
        this.setState({ edit: "password" });
    }
    
    render() {
        const edit = this.state.edit;
        let button;

        if (edit == "name") {

            button = (
                <div>
                <form>
                <h3>Edit Name</h3>
                <p>First Name</p>
                <input class="input1" type="text" name="firstname"/>
                <p>Last Name</p><br/>
                <input class="input1" type="text" name="lastname"/>
                <p>Current Password</p><br/>
                <input class="input1" type="text" name="currentPassword"/><br/>
                <button class="s2-btn" type="submit">Update Name</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }

        else if (edit == "email") {
            button = (
                <div>
                <form>
                <h3>Edit Email</h3><br/>
                <p>New Email</p><br/>
                <input type="text" name="email"/><br/>
                <p>Current Password</p><br/>
                <input type="text" name="currentPassword"/><br/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }

        else if (edit == "phone") {
            button = (
                <div>
                <form>
                <h3>Edit Phone</h3><br/>
                <p>New Phone</p><br/>
                <input type="text" name="phone"/><br/>
                <p>Current Password</p><br/>
                <input type="text" name="currentPassword"/><br/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }

        else if (edit == "resname") {
            button = (
                <div>
                <form>
                <h3>Edit Restaurant Name</h3><br/>
                <p>New Name</p><br/>
                <input type="text" name="resname"/><br/>
                <p>Current Password</p><br/>
                <input type="text" name="currentPassword"/><br/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }

        else if (edit == "password") {
            button = (
                <div>
                <form>
                <h3>Edit Password</h3><br/>
                <p>New Password</p><br/>
                <input type="text" name="password"/><br/>
                <p>Current Password</p><br/>
                <input type="text" name="currentPassword"/><br/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }
        
        return(
            <div>
                <div>
                    <h5 class="font-bold">Name</h5>
                    <button onClick={this.handlenameclick}>Edit</button>
                </div>
                <div>
                    <h5 class="font-bold">Email id</h5>
                    <button onClick={this.handleemailclick}>Edit</button>
                </div>
                <div>
                    <h5 class="font-bold">Phone</h5>
                    <button onClick={this.handlephoneclick}>Edit</button>
                </div>
                <div>
                    <h5 class="font-bold">Restaurant</h5>
                    <button onClick={this.handleresnameclick}>Edit</button>
                </div>
                <div>
                    <h5 class="font-bold">Password</h5>
                    <button onClick={this.handlepasswordclick}>Edit</button>
                </div>

            <div>
                {button}
            </div>
            </div>
        )
    
}
}
export default update;