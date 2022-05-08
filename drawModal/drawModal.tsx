import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import './drawModal';
import CanvasDraw from "react-canvas-draw";
import * as uuid from "uuid";

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

export default function DrawModal({id:editId}:ItemId) {
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [id, setId] = useState<string>(uuid.v4());
    const [name, setName] = useState('');
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
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <ReactModal
                isOpen={modalIsOpen}
                contentLabel="Minimal Modal Example"
            >
                <CanvasDraw ref={canvas} saveData={imageInit}/>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <input placeholder={name || "What's the item called?"} onBlur={(e) => setName(e.target.value)} />
                <button onClick={save}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </ReactModal>
        </div>
    )
}