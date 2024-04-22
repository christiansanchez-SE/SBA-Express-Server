import React, { Component } from "react";
export default class Overwatch extends Component {
  render() {
    const myStyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "15px",
      fontFamily: "Arial",
    };

    const myStyleOne = {
      color: "black",
      backgroundColor: "lightblue",
      padding: "5px",
      fontFamily: "Arial",
    };

    const { overwatchData } = this.props;

    return (
      <>
        <div>
          <h1 style={myStyle}>Overwatch Characters Index Page</h1>
          <ul style={myStyleOne}>
            {overwatchData.map((Character, i) => {
              return (
                <li key={i}>
                  <a href={`/overwatchData/${i}`}>
                    <strong>{Character.Name}</strong>
                  </a>{" "}
                  role is a {Character.Role}. {Character.Description} There
                  location is at {Character.Location}
                  <hr></hr>{" "}
                </li>
              );
            })}
          </ul>
        </div>
      </>
    );
    //   const {overwatchData} = this.props
    //   console.log(overwatchData)
    //   return(
    //   <>
    //   <html>
    //     <head>
    //       <link rel="stylesheet" type="text/css" href="style.css" />
    //     </head>
    //     <h1>Overwatch Character Page</h1>
    //     <ul>
    //   {overwatchData.map((Character, i) => {
    //            return (
    //              <li key={i}>
    //                <a href={`/overwatchData/${i}`}>{Character.Name}</a>
    //              </li>
    //             );
    //           })}
    //         </ul>
    //   </html>
    //   </>
    //   )
  }
}
