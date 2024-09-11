import MainBoard from './components/MainBoard/MainBoard'
import './App.css'
import SideMenu from './components/SideMenu/SideMenu';
import Header from './components/Header/Header';
import BoardRender from './components/BoardRender/BoardRender';

const App = () => {
  return (
    <div className="container">
      <Header/>
      <div className='main_content'>
        <SideMenu/>
        <BoardRender id={"6b57d7aa641abf9e3befc4f3bed4aa1e"}/>
      </div>
    </div>
  )
}

export default App;
