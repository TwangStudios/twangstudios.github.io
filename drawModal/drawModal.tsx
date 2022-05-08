import React, { useRef, useState } from "react";
import ReactModal from "react-modal";
import './drawModal';
import CanvasDraw from "react-canvas-draw";
import * as uuid from "uuid";
import useLocalStorage from "use-local-storage";

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
    
    const [id, setId] = useState<string>(uuid.v4())
    const [modalIsOpen, setIsOpen] = useState(false);
    const [name, setName] = useState<string>('');
    const [item, setItem] = useLocalStorage<ItemProps>(id, {name, image: undefined});
    const canvas = useRef<CanvasDraw>(null);
    debugger;

    function openModal() {
        setIsOpen(true);
        setId( editId || uuid.v4() );
        setName('');
        setItem(undefined);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function save() {
        if(!canvas.current) {
            return closeModal();
        }
        const image = canvas.current.getSaveData();
        setItem({name, image})
        closeModal();
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <ReactModal
                isOpen={modalIsOpen}
                contentLabel="Minimal Modal Example"
            >
                <CanvasDraw ref={canvas} saveData={item?.image}/>
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
                <input placeholder={name || "What's the item called?"} onBlur={(e) => setName(e.target.value)} />
                <button onClick={save}>Save</button>
                <button onClick={closeModal}>Cancel</button>
            </ReactModal>
        </div>
    )
}