import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { counter: [], loading: true };
    this.incrementCounter = this.incrementCounter.bind(this);
    setInterval(() => {
      this.fetchCounter();
    }, 10000);
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
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : (<div>
          <h2>{this.state.counter.value}</h2>
          <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        </div>)

    return (
      <div>
        <h1>S1 Current Counter</h1>
        {contents}
      </div>
    );
  }
}
