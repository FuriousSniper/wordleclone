import { Link } from "react-router-dom";
import './style.less'
import Letter from "../../components/Letter";
import useTitle from "../../hooks/useTitle";

const MainPage = () => {
    useTitle("Wordle")
    return (
        <div className="App mainPage">
            <div className="bannerLetters">
                <div className="bannerWord">
                    <Letter letter="P" green={true} />
                    <Letter letter="L" yellow={true} />
                    <Letter letter="A" />
                    <Letter letter="Y" green={true} />
                </div>
                <div className="bannerWord">
                <Letter letter="W" green={true} />
                <Letter letter="O" />
                <Letter letter="R" green={true} />
                <Letter letter="D" yellow={true} />
                <Letter letter="L" green={true} />
                <Letter letter="E" yellow={true} />
                </div>
            </div>
            <div className="menu">
                <Link to="/game">New game</Link>
                <Link to="/scores">Scores</Link>
            </div>
        </div>
    )
}

export default MainPage;