import { Button, ButtonText,  ScrollView, Text, View} from "@gluestack-ui/themed";
import React, { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { styles } from "../styles/trainningForm";
import { TouchableOpacity } from "react-native";
import {ModalSubType} from '../components/trainningFormComponents/modalSubType';
import { ModalAddExercise } from "./trainningFormComponents/modalAddExercise";

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
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [subTypeSelected, setSubTypeSelected] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (showModalAdd === false) {
      getExercises();
    }
  },[showModalAdd]);

  const getType = async () => {
    try {
      const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/getTypeTrainning');
      const type = await response.json();
      setAllTypes(type);
      setTrainningSelectIsPressed(!trainningSelectIsPressed);
    } catch (error) {
      console.error(error);
    }
  };

  const getExercises = async () => {
    try {
      const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/getExercises');
      const exercises = await response.json();
      setExercises(exercises);
    } catch (error){
      console.error(error);
    }
  };

  const handleUpdateTypeTrainning = async () => {
    if (subTypeSelected != '') {
      try {
        await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/updateTypeTrainning', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            newExercises,
            currentType,
            subTypeSelected,
          }),
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const setSelectedExercises = (exercise: Exercises) => {
    setNewExercises((prev) => [...prev, exercise]);
  };

  const deleteSelectedExercises = (exercise: Exercises) => {
    setNewExercises((prev) => prev.filter((element) => element.id !== exercise.id));
  };

  const showModalOnScreen = () =>{
    if (currentType != undefined) {
      setShowModal(true);
    }
  };

  const showModalAddOnScreen = () =>{
    if (currentType != undefined) {
      setShowModalAdd(true);
    }
  };

  const deleteExercise = async(id:number) =>{
    try {
      
      await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/deleteExercises', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id:id,
        }),
      });

      getExercises();
    } catch (error) {
      throw error;
    }
  }

  return (
    <View style={[styles.centerPage]}>
      <ModalSubType showModal={showModal} setShowModal={setShowModal}
        listType={currentType?.type} subType={subTypeSelected} setSubType={setSubTypeSelected}>
      </ModalSubType>

      <ModalAddExercise 
          showModalAdd={showModalAdd} 
          setShowModalAdd={setShowModalAdd}/>
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
                    width: '95%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ButtonText style={{ fontSize: 18, color: '#F5F5F5' }}>{item.name}</ButtonText>
                </Button>

                <Button onPress={()=>{deleteExercise(item.id);}} style={{marginRight:8}}>
                  <ButtonText>
                    <Icon name="trash" size={30} color="#049662"/>
                  </ButtonText>
                </Button>
              </View>
            ))
          )}
        </ScrollView>

        <View style={{ width: '100%', height: '10%', borderTopWidth: 1, alignItems: 'center', borderColor: '#005B41' }}>
          <View style={{ height: '100%', width: '50%', flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Button onPress={showModalOnScreen}>
                <Icon name="gears" size={45} color="#049662"/>
              </Button>
            </View>
            <View>
              <Button onPress={handleUpdateTypeTrainning}>
                <Icon name="thumbs-o-up" size={45} color="#049662"/>
              </Button>
            </View>
            <Button onPress={showModalAddOnScreen}>
                <Icon name="plus-circle" size={45} color="#049662"/>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};
