import React, {Component} from 'react';
import './App.css';
import logFile from './bluetooth.json';
import convertHex from 'convert-hex';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: [],
      dataId: []
    }
  }

  componentWillMount() {
    console.log('this is working...')
    logFile.map(files => this.getPressureTemp(files._source.layers.bthci_evt['btcommon.eir_ad.advertising_data']['btcommon.eir_ad.entry']['btcommon.eir_ad.entry.service_data']));
    console.log(logFile.map(files => files._source.layers.frame['frame.time']));
    console.log(logFile.map(files => {
      time : files._source.layers.frame['frame.time']
    }));
    console.log(logFile[1]._source.layers.bthci_evt['btcommon.eir_ad.advertising_data']['btcommon.eir_ad.entry']['btcommon.eir_ad.entry.service_data'])
    console.log(logFile[0]._source.layers.frame['frame.time'])

    this.getPressureTemp('f0:3f:07:88:15:00:c7:01:2f:0a:49');
  }

  getPressureTemp(data) {
    if (data === undefined) {
      console.log('--- this data is undefined ---')
    } else {
      let splitData = data.split(':');

      console.log('Temperature: ', convertHex.hexToBytes(splitData[10]).join(',') - 50);
      console.log('Battery: ', convertHex.hexToBytes(splitData[8] + splitData[9]).join(','));
      console.log('Pressure: ', convertHex.hexToBytes(splitData[6] + splitData[7]).join(','));
    }

  }
  render() {
    return (<div className="App"></div>);
  }
}

export default App;
