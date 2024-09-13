import SideMenu from './components/SideMenu/SideMenu';
import Header from './components/Header/Header';
import BoardRender from './components/BoardRender/BoardRender';
import './App.css'


const App = () => {
  return (
    <div className="container">
      <Header/>
      <div className='main_content'>
        <SideMenu/>
        <BoardRender/>
      </div>
    </div>
  )
}

export default App;
