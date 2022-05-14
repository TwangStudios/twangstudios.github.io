import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import './drawModal';
import CanvasDraw from "react-canvas-draw";
import { StyleSheet, View } from "react-native"
import { TextInput } from "react-native";

ReactModal.setAppElement('body');

type SaveAction = {onSave: VoidFunction}
export default function DrawModal({id, onSave}: ItemId & SaveAction) {

    const [name, setName] = useState("")
    const [isBag, setIsBag] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage]  = useState("");
    const [weight, setWeight] = useState(0);
    const [cost, setCost] = useState(0);
    const canvas = useRef<CanvasDraw>(null);

    // When the id changes, we set the information onto our component
    useEffect(() => {
        const stored = localStorage.getItem(id);
        if(!stored) {
            console.error('item {} could not be found in local storage', id);
            return;
        }
        const parsed = JSON.parse(stored);
        setName(parsed.name || "");
        setIsBag(parsed.isBag || false);
        setDescription(parsed.description || "");
        setWeight(parsed.weight || 0);
        setCost(parsed.cost || 0);
        if(!canvas.current) {
            return;
        }
        canvas.current.loadSaveData(parsed.image || "", true);
    }, [id])

    function save() {
        localStorage.setItem(id, JSON.stringify({
            name,
            isBag,
            image,
            description,
            weight,
            cost,
        }))
        return onSave();
    }

    return (
        <View style={styles.content}>
            <CanvasDraw ref={canvas} onChange={(canvas) => setImage(canvas.getSaveData)} />
            <TextInput value={name} onChangeText={setName} placeholder="Your item's name" />
            <TextInput  value={description} onChangeText={setDescription} placeholder="Your item's description" multiline numberOfLines={4} />
            <TextInput  value={cost.toString()} onChangeText={(text) => setCost(Number(text))} placeholder="How much is this worth?" keyboardType="numeric"/>
            <TextInput  value={weight.toString()} onChangeText={(text) => setWeight(Number(text))} placeholder="How much dose this weigh?" keyboardType="numeric"/>
            <label>
                <input type="checkbox" checked={isBag} onChange={setIsBag} />
                Is bag?
            </label>
            <button
                onClick={save}
                disabled={!name}
            >
                Save
            </button>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
          flexDirection: 'column',
      },
  })