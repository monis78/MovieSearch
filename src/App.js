import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SearchContextProvider } from './api-hooks/useSearchContext';
import './App.css';
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const ErrorScreen = lazy(() => import('./pages/ErrorScreen'));

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/search"
              element={
                <SearchContextProvider>
                  <Search />
                </SearchContextProvider>
              }
            />
            <Route path="*" element={<ErrorScreen />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
