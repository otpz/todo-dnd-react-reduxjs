import MainBoard from './components/MainBoard/MainBoard'
import './App.css'
import SideMenu from './components/SideMenu/SideMenu';
import Header from './components/Header/Header';
const App = () => {
  return (
    <div className="container">
      <Header/>
      <div className='main_content'>
        <SideMenu/>
        <MainBoard/>
      </div>
    </div>
  )
}

export default App;
