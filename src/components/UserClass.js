import React from "react";

class UserClass extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            userInfo: {
                name: "Dummy name",
                bio: "Default Location",
            },
        };
        console.log("From UserClass component constructor", this.props);
    }
    async componentDidMount() {
        console.log("From UserClass component componentDidMount", this.props);
        // Api call
        const data = await fetch('https://api.github.com/users/Pmparekh2000');
        const json = await data.json();
        this.setState({
            userInfo: json,
        });
    }
    componentDidUpdate() {
        console.log("Calling component did update after mounting");
    }
    componentWillUnmount() {
        console.log("Calling component will unmount");
    }
    render() {
        console.log("From UserClass component render", this.props);
        const {name, bio, avatar_url} = this.state.userInfo;
        return (
            <div className="user-card">
                <h2>Name: {name}</h2>
                <h3>Location: {bio}</h3>
                <img src={avatar_url}></img>
                <h4>Contact: @pmparekh</h4>
            </div>
        );
    };
};

export default UserClass;
