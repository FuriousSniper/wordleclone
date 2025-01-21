import { useRef, useState } from "react"
import toast from 'react-hot-toast';
import "./style.less"
import { getFavWords, replaceFavWords, saveFavWord } from "../../utils";

interface DrawerProps {
    isOpen: boolean,
    closeDrawer: ()=> void,
}

const Drawer = (props: DrawerProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [words, setWords] = useState(getFavWords())

    const addWord = () => {
        if (!inputRef) {
            return
        }

        if(words.length>=20){
            toast.error('You can only save 20 words!');
            return
        }

        const word = inputRef.current?.value
        if (word?.length !== 5) {
            toast.error('Word needs to have 5 letters');
            return
        }

        setWords([
            ...words, word
        ])
        saveFavWord(word)
    }

    const deleteWord = (index: number) =>{
        const newArray = [...words]

        newArray.splice(index,1)
        setWords(newArray)
        replaceFavWords(newArray)
    }

    return (
        <div className={`drawerWrapper ${props.isOpen ? "drawerOpen" : ""}`}>
            <h3>Favorite words</h3>
            <div className="closeIcon" onClick={()=>props.closeDrawer()}>X</div>
            <div className="drawerRow">
                <label htmlFor="newWord">New word</label>
                <div>
                    <input type="text" id="newWord" name="newWord" placeholder="word" ref={inputRef} />
                    <button type="button" onClick={addWord} className="buttonClass">Add</button>
                </div>
            </div>
            {
                words.length === 0 &&
                <div className="drawerRow">
                    No words!
                </div>
            }
            {
                words.map((w: string, key: number) => {
                    return (
                        <div className="drawerRow" key={key}>
                            <div className="drawerWord">{w}</div>
                            <button onClick={()=>deleteWord(key)} type="button" className="buttonClass">Delete</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Drawer
