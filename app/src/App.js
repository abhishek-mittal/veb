import React from 'react';
import './App.scss';
import EmployeeCard from './components/EmployeeCard';
import { ModalProvider } from './components/Modal/context';
import renderTreeComponent from './helpers/renderTree';
import OrgData from './models/OrgData';

const fetchData = () => {
  const oD =  OrgData.getOrgHeirarchySync();
  return oD;
}

let oDReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      let od = fetchData();
      return od
    case 'SUCCESS':
      state = action.payload;
      return state
    default:
      throw new Error('Invalid Action Type')
  }
}

function App() {

  
  const [orgData, dispatch] = React.useReducer(oDReducer, null);

  React.useEffect(() => {
    OrgData.getOrgHeirarchy().then( data => {
      dispatch({ type:"SUCCESS", payload: data })
    })
  }, [])

  const updateData = (data) => {
    console.log(data);
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            Veb😂
          </div>
        </nav>
      </header>

      <main>
        <div className="container is-max-desktop">
          <div className="veb-org-chart hero is-primary columns is-fullheight-with-navbar pt-6" >
            
        
              <ModalProvider>
              {orgData && renderTreeComponent([orgData], {
                renderItem: (node) => (<EmployeeCard employee={node} onClick={updateData} />)
              })
              }
               
            </ModalProvider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
