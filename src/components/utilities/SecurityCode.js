import React, { Component } from 'react';

class SecurityCode extends Component{
  constructor(props){
    super(props)
    this.canvas = React.createRef();
    this.canvasEle = null
    this.ctx = null;

    this.state = {
      refresh: props.refresh,
      forceRefresh: false,
    }
  }

  componentDidMount() {
    this.canvasEle = this.canvas.current;
    this.canvasEle.width = this.canvasEle.clientWidth;
    this.canvasEle.height = this.canvasEle.clientHeight;
    this.ctx = this.canvasEle.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);

    this.writeText({ text: this.generateCode(), x: 2, y: 0 });
  }

  writeText = (info, style = {}) => {
    const { text, x, y } = info;
    const { fontSize = 14, fontFamily = 'Arial', fontWeight = 'bold', textWidth = '80', textAlign = 'left', textBaseline = 'top' } = style;

    var gradient = this.ctx.createLinearGradient(20, 0, 80, 0);
    gradient.addColorStop(0,  'rgb(253, 56, 7)');
    gradient.addColorStop(.5, '#fd8555');
    gradient.addColorStop(1, 'rgb(253, 56, 7)');

    this.ctx.beginPath();
    this.ctx.font = fontWeight + ' ' + fontSize + 'pt ' + fontFamily;
    this.ctx.textWidth = textWidth;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    this.ctx.fillStyle = gradient;
    this.ctx.fillText(text, x, y, 80);
    this.ctx.stroke();
  }

  generateCode = () => {
    let text = "QWERTYUIOPASDFGHJKLZXCVBNM123456789QWERTYUIOPASDFGHJKLZXCVBNM123456789"
    let code = ''

    for(var i=0; i<6; i++){
      let rndm = Math.random()
      let start = (Math.floor(rndm * text.length + 1) <= text.length - 1) ? Math.floor(rndm * text.length + 1) : text.length - 1

      let one_char = text.substring(start, start + 1);
      code += one_char;
    }
    sessionStorage.setItem("securityCode", code);
    return code;
  }

  refresh = () =>{
    if(this.canvasEle && this.props.refresh){
      this.ctx = null;

      this.ctx = this.canvasEle.getContext("2d");
      this.ctx.clearRect(0, 0, this.canvasEle.width, this.canvasEle.height);

      this.writeText({ text: this.generateCode(), x: 2, y: 0 });
    }

    this.setState({
      refresh: this.props.refresh,
      forceRefresh: this.props.forceRefresh,
    })
  }

  render = () => {
      return (
      <div>    
        { (this.state.forceRefresh !== this.props.forceRefresh) || (this.state.refresh !== this.props.refresh) ? this.refresh() : '' }
        <canvas ref={this.canvas} width="80" height="20"></canvas>
      </div>
    );
  }
}

export default SecurityCode;
