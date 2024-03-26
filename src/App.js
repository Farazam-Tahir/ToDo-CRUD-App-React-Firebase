import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import MyList from "./Components/MyList";
import ItemForm from "./Components/ItemForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/additem" element={<ItemForm mode = 'add' />} />
          <Route path="/mylist" Component={MyList} />
          <Route path="/updateitem" element={<ItemForm mode = 'update' />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
