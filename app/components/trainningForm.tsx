import { Button, ButtonText, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ScrollView, Text, View } from "@gluestack-ui/themed";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../styles/trainningForm";
import { ModalSubType } from "./modalSubType";

export const TrainningForm = () => {
  interface Exercises {
    id: number;
    name: string;
  }

  interface typeTrainning {
    id: number;
    type: string;
  }

  const [exercises, setExercises] = useState<Exercises[]>([]);
  const [trainningSelectIsPressed, setTrainningSelectIsPressed] = useState<Boolean>(false);
  const [currentType, setCurrentType] = useState<typeTrainning>();
  const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);
  const [newExercises, setNewExercises] = useState<Exercises[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getType = async () => {
    try {
      const response = await fetch('http://192.168.61.104:3000/getTypeTrainning');
      const type = await response.json();
      setAllTypes(type);
      setTrainningSelectIsPressed(!trainningSelectIsPressed);
    } catch (error) {
      console.error(error);
    }
  };

  const getExercises = async () => {
    try {
      const response = await fetch('http://192.168.61.104:3000/getExercises');
      const exercises = await response.json();
      setExercises(exercises);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTypeTrainning = async () => {
    try {
      await fetch('http://192.168.61.104:3000/updateTypeTrainning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newExercises,
          currentType,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setSelectedExercises = (exercise: Exercises) => {
    setNewExercises((prev) => [...prev, exercise]);
  };

  const deleteSelectedExercises = (exercise: Exercises) => {
    setNewExercises((prev) => prev.filter((element) => element.id !== exercise.id));
  };

  return (
    <View style={[styles.centerPage]}>
      <ModalSubType showModal={showModal} setShowModal={setShowModal} listType={currentType?.type}></ModalSubType>
      <View style={styles.container}>
        <View style={[styles.header]}>
          <View style={[styles.headerText]}>
            <Button onPress={getType} style={{ marginLeft: 20 }}>
              <ButtonText style={{ fontSize: trainningSelectIsPressed ? 90 : 60, color: '#F5F5F5' }}>
                {currentType == undefined ? 'New' : currentType?.type}
              </ButtonText>
            </Button>
          </View>
        </View>

        <View style={[styles.bodyPositionTextTheme]}>
          <View style={[styles.bodyText]}>
            <Text style={{ fontSize: 30, color: '#F5F5F5' }}>Exercises</Text>
          </View>
        </View>

        <ScrollView style={{ width: '100%', height: '50%' }}>
          {trainningSelectIsPressed ? (
            allTypes.map((item, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  height: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#008170',
                  flexDirection: 'row',
                }}
              >
                <Button
                  onPress={() => {
                    setCurrentType(item);
                    setTrainningSelectIsPressed(!trainningSelectIsPressed);
                    getExercises();
                  }}
                  style={{ borderColor: '#008170', width: '40%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
                >
                  <ButtonText style={{ fontSize: 40, color: '#F5F5F5' }}>{item.type}</ButtonText>
                </Button>
              </View>
            ))
          ) : (
            exercises.map((item, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  height: 55,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#008170',
                  flexDirection: 'row',
                }}
              >
                <Button
                  onPress={() => (!newExercises.includes(item) ? setSelectedExercises(item) : deleteSelectedExercises(item))}
                  style={{
                    backgroundColor: newExercises.includes(item) ? '#0d750c' : '#1a1a1a',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ButtonText style={{ fontSize: 18, color: '#F5F5F5' }}>{item.name}</ButtonText>
                </Button>
              </View>
            ))
          )}
        </ScrollView>

        <View style={{ width: '100%', height: '10%', borderTopWidth: 1, alignItems: 'center', borderColor: '#005B41' }}>
          <View style={{ height: '100%', width: '50%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Button onPress={() => setShowModal(true)}>
                <Icon name="plus-circle" size={45} color="#049662" />
              </Button>
            </View>

            <View>
              <Button>
                <Icon name="edit" size={45} color="#049662" />
              </Button>
            </View>

            <View>
              <Button>
                <Icon name="minus-circle" size={45} color="#049662" />
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
