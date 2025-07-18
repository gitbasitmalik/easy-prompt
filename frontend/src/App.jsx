import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePrompt from './pages/CreatePrompt';
import PromptDetail from './pages/PromptDetail';
import ProtectedRoute from './components/ProtectedRoute';
import { DarkModeProvider } from './context/DarkModeContext';
import Profile from './pages/Profile';

function App() {
  return (
    <DarkModeProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create" element={<CreatePrompt />} />
        </Route>

        <Route path="/prompts/:id" element={<PromptDetail />} />
      </Routes>
    </Router>
    </DarkModeProvider>
  );
}

export default App;
