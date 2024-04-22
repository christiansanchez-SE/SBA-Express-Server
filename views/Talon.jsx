import React, { Component } from "react";

export default class Talon extends Component {
  render() {
    const myStyle = {
      color: "white",
      backgroundColor: "crimson",
      padding: "10px",
      fontFamily: "Arial",
    };

    const myStyleOne = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "5px",
      fontFamily: "Arial",
    };

    const { talonData } = this.props;

    return (
      <>
        <div>
          <h1 style={myStyle}>Talon Characters Index Page</h1>
          <ul style={myStyleOne}>
            {talonData.map((Character, i) => {
              return (
                <li key={i}>
                  <a href={`/overwatchData/${i}`} style={myStyleOne}>
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
