import React, { useRef } from "react";
import { Button, ButtonText, View, Text } from '@gluestack-ui/themed';
import { Modal } from "react-native";

export const ModalSubType = ({ showModal, setShowModal, listType}: 
    { showModal: boolean; setShowModal: (state:boolean) => void, listType:any}) => {
  return (
    <Modal visible={showModal} transparent={true}>
        <View style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}>
            <View 
            style={{width:'80%', height:'20%', justifyContent:'center', alignItems:'center', borderWidth:1, 
                    borderColor:'#005B41', backgroundColor:'#222222'}}
            >
                <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:32}}>{listType != null ? listType : ''}</Text>
                </View>
                
      
                <Button onPress={() => setShowModal(false)}>
                    <ButtonText>PRESS</ButtonText>
                </Button>
            </View>
        </View>
    </Modal>
  );
};
