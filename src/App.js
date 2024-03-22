import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AddItem from "./Components/AddItem";
import MyList from "./Components/MyList";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/additem" Component={AddItem} />
          <Route path="/mylist" Component={MyList} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
