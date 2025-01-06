import { Link } from 'react-router-dom';
import './style.less'

const Header = () =>{
    return(
        <header>
            <Link to="/">Home</Link>
            <Link to="/game">Game</Link>
            <Link to="/scores">Scores</Link>
        </header>
    )
}

export default Header;