import React from "react"

export default class CCBtn extends React.Component {

    constructor(props){

        super(props)

        this.state={}
    }

    ChangeColor = (e) =>{
        this.setState({backgroundColor: `${e.target.innerHTML}`})
    }

    render() {
        
        return (
            <>
            <div style={{backgroundColor:`${this.state.backgroundColor}`, padding:20, borderRadius:15}}>
            <button onClick={this.ChangeColor}>Pink</button>
            <button onClick={this.ChangeColor}>Purple</button>
            <button onClick={this.ChangeColor}>Red</button>
            <button onClick={this.ChangeColor}>Orange</button>
            <button onClick={this.ChangeColor}>Blue</button>
            <button onClick={this.ChangeColor}>Green</button>
            <button onClick={this.ChangeColor}>Yellow</button>
            <button onClick={this.ChangeColor}>Indigo</button>  
            </div>
            </>
        )
    }

}