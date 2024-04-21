import React, {Component} from "react"
export default class Talon extends Component {
    render() {
        const myStyle = {
            color: "white",
            backgroundColor: "crimson",
            padding: "10px",
            fontFamily: "Arial"}
            const {talonData} = this.props
        return (
        <>
          <div>
            <h1 style={myStyle} >Talon Characters Index Page</h1>
            <ul>
              {talonData.map((Character, i) => {
                return (
                  <li key={i}>
                    <a href={`/talonData/${i}`}>{Character.Name}</a> role is a {Character.Role}. {Character.Description} There location is at {Character.Location}.{" "}
                  </li>
                );
              })}
            </ul>
          </div>
       </>
        )
    }
}