import "./App.css";
import { Component } from "react";
import Movies from "./movies";

class App extends Component {
  render() {
    return (
      <main className='container'>
        <Movies />
      </main>
    );
  }
}
export default App;
