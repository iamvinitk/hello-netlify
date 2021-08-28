import React from "react";
import './index.css';

const TYPING_SPEED = 150;
const DELETING_SPEED = 60;

const dataText = ['JavaScript', 'Python', "React", "MongoDB"]
const colors = ['#fcdc00', '#244d70', "#61dafb", "#13aa52"]
const fontColors = ['#050505', '#FFFFFFFF', "#FFFFFFFF", "#ffffff"]

export default class App extends React.Component {

    state = {
        text: '',
        isDeleting: false,
        loopNum: 0,
        typingSpeed: TYPING_SPEED
    }

    componentDidMount() {
        this.handleType();
    }

    handleType = () => {
        const {isDeleting, loopNum, text, typingSpeed} = this.state;
        const i = loopNum % dataText.length;
        const fullText = dataText[i];

        this.setState({
            text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
            typingSpeed: isDeleting ? DELETING_SPEED : TYPING_SPEED
        });

        if (!isDeleting && text === fullText) {
            setTimeout(() => this.setState({isDeleting: true}), 500);
        } else if (isDeleting && text === '') {
            this.setState({
                isDeleting: false,
                loopNum: loopNum + 1
            });
        }

        setTimeout(this.handleType, typingSpeed);
    };

    render() {
        return (
            <h1 style={{
                margin: '8px',
                textAlign: 'center',
                fontFamily: 'Nunito',
                fontSize: '1.8rem',
                maxWidth: '100%',
                fontWeight: 'normal',
                color: 'white'
            }}>Hello World,
                <br/>
                I do &nbsp;
                <span style={{
                    padding: '8px',
                    fontSize: '2rem',
                    backgroundColor: colors[this.state.loopNum % 4],
                    color: fontColors[this.state.loopNum % 4]
                }}>{this.state.text}</span>
                <span id="cursor"/>
            </h1>
        );
    }
}

