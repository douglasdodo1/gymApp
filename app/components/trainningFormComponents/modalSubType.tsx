import React, { useRef } from "react";
import { Button, ButtonText, View, Text } from '@gluestack-ui/themed';
import { Modal, TouchableWithoutFeedback } from "react-native";

export const ModalSubType = ({ showModal, setShowModal, listType, subType, setSubType}: 
    { showModal: boolean; setShowModal: (state:boolean) => void, listType:any, subType:string, setSubType:(value:string) => void}) => {
  return (
    <Modal visible={showModal} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
            <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center',backgroundColor: 'rgba(0, 0, 0, 0.9)'}}>
                <View 
                    style={{width:'80%', height:'20%', alignItems:'center',justifyContent:'center', borderWidth:1, 
                    borderColor:'#005B41', backgroundColor:'#222222'}}>
                    <View style={{width:'80%', height:'75%', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={{fontSize:32, color:'#F5F5F5'}}>Choose a subtype</Text>
                        <View style={{width:'100%', justifyContent:'center', alignItems:'center', flexDirection:"row", gap:18}}>
                            {
                                listType?.split('').map((item: string, index: number) => (
                                    <View key={index}>
                                        <Button onPress={() => {setSubType(item); setShowModal(false)}}>
                                            <ButtonText style={{fontSize:50, color:'#F5F5F5'}}>{item}</ButtonText>
                                        </Button>
                                    </View>
                                ))
                            }
                        </View>
                    </View>
                    
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
};
