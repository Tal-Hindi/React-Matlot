import React from "react";
import Input_text from "../Functional Components/FC_InputText";

export default class CCForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastNameMessage: "",
      firstNameMessage: "",
      psychometricScoreMessage: "",
      schoolMessage: "",
    };
  }

  ShowMessage = (e) => {
    let textInput = e.target.id;

    if (e.target.value === "") {
      let newMessage = `You must fill in a ${textInput}.`;

      this.setState({ [`${textInput}Message`]: newMessage });
    } else {
      this.setState({ [`${textInput}Message`]: "" });
    }
  };

  HideMessage = (e) => {
    let textInput = e.target.id;

    this.setState({ [`${textInput}Message`]: "" });

    const inputValue = e.target.value;

    if (textInput == "psychometricScore" && inputValue != "") {
      if (inputValue < 555) {
        this.setState({ [`schoolMessage`]: "Try again next year!" });
      } else {
        this.setState({ [`schoolMessage`]: "You can be accepted for studies" });
      }
    }
  };

  render() {
    // I used functional component to create the div element for the input text because the code repats it self

    return (
      <>
        <form>
          <Input_text
            message={this.state.lastNameMessage}
            type="text"
            label="Last name: "
            id="lastName"
            onFocus={this.ShowMessage}
            onBlur={this.HideMessage}
          />
          <Input_text
            message={this.state.firstNameMessage}
            type="text"
            label="First name: "
            id="firstName"
            onFocus={this.ShowMessage}
            onBlur={this.HideMessage}
          />
          <Input_text
            message={this.state.psychometricScoreMessage}
            type="number"
            label="Psychometric score: "
            id="psychometricScore"
            onFocus={this.ShowMessage}
            onBlur={this.HideMessage}
          />
          <p> {this.state.schoolMessage}</p>
        </form>
      </>
    );
  }
}
