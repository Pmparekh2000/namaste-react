import UserContext from "../utils/UserContext";
import User from "./User";

import UserClass from "./UserClass";
import { Component } from "react";

class AboutUs extends Component {
    constructor(props) {
        super(props);
        console.log("From AboutUs component constructor");
    };
    componentDidMount() {
        console.log("From AboutUs component componentDidMount");
        // console.log("json obtained from API is ", json);
    };
    render() {
        // console.log("From AboutUs render function");
        return (
            <div>
                <h1>About</h1>
                <div>
                    Logged in user:
                    <UserContext.Consumer>
                        { (data) => <h1 className="text-xl font-bold">{data.loggedInUser}</h1> }
                    </UserContext.Consumer>
                </div>
                <h2>This is Namaste React Webseries</h2>
                {/* <UserClass name={this.state.data ? this.state.data.name : ""} location={this.state.data ? this.state.data.bio : ""}/> */}
                <UserClass />
                {/* <UserClass name={"Vanshika Dhruv"} location={"Mumbai"}/> */}
            </div>
        );
    };
};

export default AboutUs;
