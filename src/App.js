import React, {useState, useContext} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import './App.css';

import {MyButton} from './components';
import Modal from "./Modal";
import useModal from './useModal';

const ToggleContext = React.createContext();


function App() {
  

  const [count, setCount] = useState(0);
  const [data, setData] = useState([])
  const [colums, setColumns] = useState(['id', 'name', 'lastname','actions'])
  const {isShowing, toggle} = useModal();
  
  // useEffect(()=> {
  //   console.log('useEffect')
    
  // }, [])


  const getData = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      setData( res.data )
    })
    .catch(console.log)
  }



  // if (!data) {
  //   return (
  //     <div>spinner</div>
  //   )
  // }

  return (
    <div className="App">
      <header className="App-header">
        <MyButton handleClick={getData}/>
        <ToggleContext.Provider value={toggle}>
          <Table data={data} columns={colums}/>
        </ToggleContext.Provider>
      </header>
  
      <Modal
        isShowing={isShowing}
        hide={toggle}
      />
    </div>
  );
}

const Table = props => {
  const {data} = props;

  const {columns} = props;

  return (
    <table>
      <thead>
        <tr>
      {
        columns.length && columns.map(thead => {
          return <ColumnCell key={Math.random()} label={thead}/>
        })
        }
        </tr>
      </thead>
      <tbody>
        {
          data.length && data.map(user => {
            return <Row key={user.id} {...user}/>
          })
        }
      </tbody>
    </table>
  )

}

const Row = (props) => {
  return (
    <tr style={{
      border: '1px solid red'
    }}>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.username}</td>
      <ActionCell actions={props.actions}/>
    </tr>
  )
}

const ColumnCell = (props) => {
  return (
    <th>{props.label}</th>
  )
}

const ActionCell = () => {
  const toggle = useContext(ToggleContext);
  return (
    <td><DeleteIcon /><EditIcon onClick={toggle} /></td>
  )
}

export default App;
