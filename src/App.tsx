import './App.css'
import { UsersList } from "./components/users/UsersList.tsx";
import { Count } from "./components/Count.tsx";

function App() {

  return (
    <>
        <Count />
        <UsersList />
    </>
  )
}

export default App
