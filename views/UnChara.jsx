import React, {Component} from "react"
export default class UnChara extends Component {
    render() {
        const myStyle = {
            color: "white",
            backgroundColor: "lightslategray ",
            padding: "10px",
            fontFamily: "Arial"}
            const {unCharaData} = this.props
        return (
        <>
          <div>
            <h1 style={myStyle} >Unaligned Characters Index Page</h1>
            <ul>
              {unCharaData.map((Character, i) => {
                return (
                  <li key={i}>
                    <a href={`/unCharaData/${i}`}>{Character.Name}</a> role is a {Character.Role}. {Character.Description} There location is at {Character.Location}.{" "}
                  </li>
                );
              })}
            </ul>
          </div>
       </>
        )
    }
}