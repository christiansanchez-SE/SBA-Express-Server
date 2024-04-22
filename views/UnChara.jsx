import React, { Component } from "react";
export default class UnChara extends Component {
  render() {
    const myStyle = {
      color: "white",
      backgroundColor: "lightslategray ",
      padding: "10px",
      fontFamily: "Arial",
    };

    const myStyleOne = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "5px",
      fontFamily: "Arial",
    };

    const { unCharaData } = this.props;

    return (
      <>
        <div>
          <h1 style={myStyle}>Unaligned Characters Index Page</h1>
          <ul style={myStyleOne}>
            {unCharaData.map((Character, i) => {
              return (
                <li key={i}>
                  <a href="/overwatchData/{i}">
                    <strong>{Character.Name}</strong>
                  </a>{" "}
                  role is a {Character.Role}. {Character.Description} Their
                  location is at {Character.Location}
                  <hr></hr>{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
  }
}
