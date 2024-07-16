import React from 'react';
import ReactDOM from 'react-dom/client';

const parent = React.createElement(
    "div",
    {id: "parent"},
    [
        React.createElement(
            "div",
            {id: "child1"},
            [
                React.createElement(
                    "h1",
                    {},
                    "This is namaste react 🚀"
                ),
                React.createElement(
                    "h2",
                    {},
                    "I am a sibling 1"
                ), 
            ]
        ),
        React.createElement(
            "div",
            {id: "child2"},
            [
                React.createElement(
                    "h1",
                    {},
                    "Hello world from 3 layers nested h1"
                ),
                React.createElement(
                    "h2",
                    {},
                    "I am a sibling 2"
                ), 
            ]
        )
    ]
)


const heading = React.createElement(
    "h1",
    {id: "heading", xyz: "abc"},
    "Hello World, from React!"
);
const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(heading);
root.render(parent);
