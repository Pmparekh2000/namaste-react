import { useState } from "react";

const User = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="user-card">
            <h1>Count: {count}</h1>
            <h2>Name: Prerak</h2>
            <h3>Location: Mumbai</h3>
            <h4>Contact: @pmparekh</h4>
        </div>
    );
};

export default User;
