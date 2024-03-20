import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.css';
import customTheme from './theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import routesConfig from './components/Routers';

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <ThemeProvider theme={customTheme}>
          <CssBaseline />
          <Routes>
            {routesConfig.map((route, index) => (
              <Route key={index} path={route.path} element={route.element}>
                {route.children &&
                  route.children.map((childRoute, childIndex) => (
                    <Route
                      key={childIndex}
                      path={childRoute.path}
                      element={childRoute.element}
                    />
                  ))}
              </Route>
            ))}
          </Routes>
          {/* <Home/> */}
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
