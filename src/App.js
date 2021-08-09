import React from 'react';
import './App.css';

import Auth from './components/Auth';
import { useUser } from 'reactfire'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './components/Dashboard';
import SiteNavbar from './components/SiteNavbar';
import { Container } from 'react-bootstrap';

function App() {
  const currentUser = useUser();
  return (
    <>
    <div className="App"> 
    <Container>
      { currentUser.data ?(
          <>
          <SiteNavbar></SiteNavbar>
          <Dashboard></Dashboard>
          </>
      ) : 
        (<Auth></Auth>)
        
      }
      </Container> 
    </div>
    </>
  );
}

export default App;
