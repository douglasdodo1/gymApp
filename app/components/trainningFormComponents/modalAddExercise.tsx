import React, { useState } from "react";
import { View, Text, Button } from '@gluestack-ui/themed';
import { Modal, TouchableWithoutFeedback, TextInput, TouchableOpacity } from "react-native";

interface ModalAddExerciseProps {
    showModalAdd: boolean;
    setShowModalAdd: (state: boolean) => void;
}

export const ModalAddExercise: React.FC<ModalAddExerciseProps> = ({
  showModalAdd,
  setShowModalAdd,
}) => {
    const handleCreateExercise = async (data: string) => {
        try {
            await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/createExercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exercise:data
                }),
            });
        } catch (error) {
            console.error(error);
        }
    };

    const [text, setText] = useState('');
    
    return (
        <Modal visible={showModalAdd} transparent={true} animationType="fade">
            <TouchableWithoutFeedback onPress={() => setShowModalAdd(false)}>
                <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.9)' }}>
                    <View 
                        style={{ width: '80%', height: '30%', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#005B41', backgroundColor: '#222222' }}>
                        <View style={{ width: '80%', height: '80%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <View style={{ width: '95%', height: '20%', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#F5F5F5' }}>
                                    <TextInput 
                                        value={text}
                                        placeholder="Exercise name"
                                        placeholderTextColor={'#F5F5F5'}
                                        onChangeText={(newText) => setText(newText)} 
                                        style={{ color: '#F5F5F5', width: '100%', height: '100%'}}
                                    />
                                </View>
                                <TouchableOpacity 
                                    style={{ width: '95%', height: 50, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}
                                    onPress={() => {
                                        handleCreateExercise(text);
                                        setText('');
                                        console.log('Exercise created');
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 18 }}>Create Exercise</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
