import React, {Component} from 'react';
import './App.css';
import logFile from './bluetooth.json';
import { LineChart, Line, XAxis, YAxis } from 'recharts';
import moment from 'moment';
let blue = [];


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: [],
      dataId: [],
      bluetoothData: []
    }
  }

  componentWillMount() {
    console.log('this is working...')
    logFile.map(files => this.getPressureTemp(files._source.layers.bthci_evt['btcommon.eir_ad.advertising_data']['btcommon.eir_ad.entry']['btcommon.eir_ad.entry.service_data'], files._source.layers.frame['frame.time']));
  }

  componentDidMount() {
    console.log(JSON.stringify(blue))
    console.log(blue);
    console.log(moment('14-05-1991').format('DD-MM-YYYY'));
  }

  getPressureTemp(data, time) {
    if (data === undefined) {
      console.log('--- this data is undefined ---')
    } else {
      let splitData = data.split(':');
      // console.log('Device ID: ', splitData[0] + splitData[1])
      // console.log('Device ID: ', parseInt(splitData[1] + splitData[0], 16))
      // console.log('Temperature: ', parseInt(splitData[10], 16) - 50)
      // console.log('Pressure: ', parseInt(splitData[7] + splitData[6], 16));
      // console.log('Battery: ', parseInt(splitData[9] + splitData[8], 16));
      // console.log('Time: ', time);
      blue.push({
        deviceId: splitData[0] + splitData[1],
        temperature: parseInt(splitData[10], 16) - 50,
        pressure: parseInt(splitData[7] + splitData[6], 16),
        battery: parseInt(splitData[9] + splitData[8], 16),
        time: time
      });

      //  this.setState({ bluetoothData: [...this.state.bluetoothData, splitData[0] + splitData[1]]})
    }
  }

  render() {
    return (
      <div className="App">
      <LineChart width={800} height={800} data={blue}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8"/>
        <XAxis dataKey="Temperature" />
        <YAxis dataKey="deviceId" />
      </LineChart>
    </div>);
  }
}

export default App;
