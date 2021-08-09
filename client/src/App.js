import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import DetailPage from './routes/DetailPage';
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';

const App = () => {
  return (
    <RestaurantsContextProvider>
      <div className='container'>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/restaurants/:id/' component={DetailPage} />
            <Route
              exact
              path='/restaurants/:id/update'
              component={UpdatePage}
            />
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
};

export default App;
