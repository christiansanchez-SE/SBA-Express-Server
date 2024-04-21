import React, {Component} from "react"
export default class Overwatch extends Component {
    render() {
        const myStyle = {
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial"}
            const {overwatchData} = this.props
        return (
        <>
          <div>
            <h1 style={myStyle} >Characters Index Page</h1>
            <ul>
              {overwatchData.map((Character, i) => {
                return (
                  <li key={i}>
                    The <a href={`/overwatchData/${i}`}>{Character.Name}</a> is {Character.Description}{" "}
                  </li>
                );
              })}
            </ul>
          </div>
      </>
        )
    }
}