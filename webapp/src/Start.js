import React, { Component } from 'react';
import {Form,FormGroup,Input,Button} from 'reactstrap';
import openSocket from 'socket.io-client';

const b64EncodeUnicode = function(str) {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

export class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {url: "", isServer: null, serverData: {}, hasCheckedBefore: false};
    this.changeUrl = this.changeUrl.bind(this);
    this.checkForServer = this.checkForServer.bind(this);
  }

  changeUrl(event) {
    event.preventDefault();
    this.setState({url: event.target.value});
  }

  checkForServer(event) {
    event.preventDefault();
    const socket = openSocket(this.state.url);
    socket.on('connect_error', (error) => {
      this.setState({isServer: false});
    });
    socket.on("serverinfo", function(info) {
      console.log(info);
      this.setState({isServer: true, serverData: info});
    }.bind(this))
  }

  render() {
    var x = <p>No implement</p>
    if (this.state.isServer === null) {
      x = <Form onSubmit={this.checkForServer}>
        <FormGroup>
            <Input type="url" name="url" placeholder="Enter server URL" value={this.state.url} onChange={this.changeUrl}/>
          <Button type="submit" id="submit" style={{display: "block", margin: "0 auto", marginTop: 50}}>Connect to server</Button>
        </FormGroup>
      </Form>
    } else if (this.state.isServer === false) {
      x = <Form onSubmit={this.checkForServer}>
        <FormGroup>
            <Input type="url" name="url" placeholder="Enter server URL" value={this.state.url} onChange={this.changeUrl}/>
          <Button type="submit" id="submit" style={{display: "block", margin: "0 auto", marginTop: 50}}>Connect to server</Button>
        </FormGroup>
        <p style={{color: "red"}}>Could not connect to server :(</p>
      </Form>
    } else {
      x = <p>Loading chat...</p>
      window.location.href = window.location.protocol + "//" + 
        window.location.hostname + ':' + window.location.port + '/chat/' + b64EncodeUnicode(this.state.url);
    }
    return (
      <div class="container" style={{margin: "0 auto", width: "50%"}}>
        <h1 style={{textAlign: "center", marginTop: 50, marginBottom: 50}}>Welcome!</h1>
        {x}
      </div>
    )
  }
}