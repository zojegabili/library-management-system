import { BrowserRouter as Router, Route } from 'react-router-dom';
import UserRegistrationForm from './components/UserRegistrationForm';
import Login from './components/Login';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Dashboard from './components/Dashboard';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <NavigationBar />
        {/* <div> */}
          <Route path="/home" component={Home} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route path="/registernewuser" component={UserRegistrationForm}/>
          <Route path="/dashboard" component={Dashboard}/>
        {/* </div> */}
    </Router>
    
  );
}

export default App;
