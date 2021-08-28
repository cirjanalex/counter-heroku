import React, { Component } from 'react';
import './Home.css';
export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { counter: [], loading: true, loadingIn: 10 };
    this.incrementCounter = this.incrementCounter.bind(this);
    var i = 10;
    setInterval(() => {
      this.state.loadingIn = i;      
      i--;
      this.setState({ loadingIn: i });
      if (i == 0) {
        this.fetchCounter();
        i = 10;
      }
    }, 1000);
  }

  componentDidMount() {
    this.fetchCounter();
  }

  async incrementCounter() {
    await fetch('api/counter', {
      method: 'POST'
    });
    await this.fetchCounter();
  }

  async fetchCounter() {
    const response = await fetch('api/counter');
    const data = await response.json();
    this.setState({ counter: data, loading: false });
  }

  render() {
    return (
      <div>
        <h1>Current Counter: <span class="counterValue">{this.state.counter.value}</span></h1>        
        <div>Refreshing in {this.state.loadingIn}</div>
        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment from here</button>
      </div>
    );
  }
}
