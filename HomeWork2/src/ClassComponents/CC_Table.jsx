import React from "react"
import '../CSS/Table.css'

export default class CCTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tableWidth: `100%`
        }
    }

    changeWidth = () => {
       
        this.setState({ tableWidth: `50%` })

    }

    changeWidthBack = () => {
       
        this.setState({ tableWidth: `100%` })

    }



    render() {
        return (

            <table style={{ width: this.state.tableWidth }} onClick={this.changeWidth} onDoubleClick={this.changeWidthBack}>

                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Data 1</td>
                        <td>Data 2</td>
                    </tr>
                    <tr>
                        <td>Data 3</td>
                        <td>Data 4</td>
                    </tr>
                </tbody>
            </table>

        )
    }



}