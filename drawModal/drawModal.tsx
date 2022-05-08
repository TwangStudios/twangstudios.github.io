import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import './drawModal';
import CanvasDraw from "react-canvas-draw";
import * as uuid from "uuid";
import '../styles.tsx';

ReactModal.setAppElement('body');

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

type SaveAction = {onSave: VoidFunction};
export default function DrawModal({id:editId, onSave}: ItemId & SaveAction) {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string>(uuid.v4());
    const [name, setName] = useState('New Item');
    const [imageInit, setImageInit] = useState<string|undefined>()
    const canvas = useRef<CanvasDraw>(null);

    function openModal() {
        setIsOpen(true);
        debugger;

        if(editId) {
            setId(editId)
            const storage = localStorage.getItem(editId) || '{"name":""}';
            const parsed = JSON.parse(storage);
            setName(parsed.name)
            setImageInit(parsed.image)
        } else {
            setId(uuid.v4())
        }
    }

    function closeModal() {
        setIsOpen(false);
        setId(uuid.v4());
    }

    function save() {
        debugger
        if(!canvas.current) {
            return closeModal();
        }
        const image = canvas.current.getSaveData();
        localStorage.setItem(id, JSON.stringify({name, image}))
        closeModal();
        if(onSave) onSave();
    }
    
    function checkName(name: string){
        if (name==""){setName("Unnamed item")}
        else {setName(name)}
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <ReactModal
                isOpen={modalIsOpen}
                contentLabel="Minimal Modal Example"
            >
                <button onClick={closeModal}>close</button>
                <br/>
                <CanvasDraw ref={canvas} saveData={imageInit}/>
                <input placeholder={name || "What's the item called?"} onBlur={(e) => checkName(e.target.value)}/>
                <br/>
                <textarea placeholder={"Item Description"}/>
                <br/>
                <button onClick={save}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </ReactModal>
        </div>
    )
}