import React, {useRef, useState} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import TesterTable from './TesterTable';

function App() {

  const nameInput = useRef(null);
  const [badInput, setBadInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [testerData, setTesterData] = useState('');

  const fetchData = () => {
    const {value} = nameInput.current;
    if (value.length < 2 || value.length > 12) {
      setBadInput(true);
    } else {
      setBadInput(false);
      //option for use without proxy is commented out
      fetch(`api/ex/${value}`)
      //fetch(`https://cors-anywhere.herokuapp.com/https://test-api.techsee.me/api/ex/${value}`)
      //I used .text() because .json() returns error on empty result
         .then(res => res.text())
        .then(data => {
            let json = data === '' ? [] : JSON.parse(data);
            //to avoid sending different data types as a prop to the table
            if (typeof json.length == 'undefined') json = [json];
            setTesterData(json);
        }).catch(err => {
          setErrorMessage('Temporary error occurred, please try again later');
        })
    }
  }

  return (
    <div className="App">
      <h1>Search Bugs</h1>      
      <Form>
        <Form.Label>Tester Name:</Form.Label>
        <Form.Control id="name"
                      type="text"
                      ref={nameInput}
                      placeholder="Enter the tester name"
                      className={`nameInput${badInput ? ' badInput' : ''}`} onChange={() => setBadInput(false)}
        />
        <Button onClick={fetchData}>Fetch</Button>
      </Form>
      <div className="error">{errorMessage}</div>
      {testerData.length > 0 && <TesterTable data={testerData} />}
    </div>
  );
}

export default App;
