import { Link } from 'react-router-dom';

// Order matters here in order to want to overwrite semantic ui css
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <div>
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem',
        }}
      >
        <Link to='/home'>Home</Link>
        <Link to='/login'>Login</Link>
      </nav>
    </div>
  );
}

export default App;
