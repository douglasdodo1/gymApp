import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { styles } from '../styles/home';
import { Trainning } from '@prisma/client';

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  interface typeTrainning {
    id: number;
    type: string;
  };



  const [dataType, setDataType] = useState<typeTrainning[]>([]);
  const [typesOn, setTypesOn] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<string[]>(['select']);
  const [currentTrainning, setCurrentTrainning] = useState<Trainning[]>([]);
  const [subTypeSelected, setsubTypeSelected] = useState<boolean[]>([]);
  const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);
  const [progressExercise, setProgressExercise] = useState<number[]>(Array(1).fill(0));
  const [progressExerciseIspressed, setProgressExerciseIspressed] = useState<boolean>(false);
  const [progressExerciseIndex, setProgressExerciseIndex] = useState<number>(-1);
  const [deletedExercises, setDeletedExercises] = useState<Trainning[]>([]);

  useEffect(() => {
    if (progressExerciseIspressed) {
      const interval = setInterval(() => {
        if (progressExerciseIspressed) {
          setProgressExercise(prevProgressExercise => {
            const updatedProgressExercise = [...prevProgressExercise];
            updatedProgressExercise[progressExerciseIndex] += 10;
            return updatedProgressExercise;
          });
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [progressExerciseIspressed]);

  const getType = async () => {
    try {
      const response = await fetch('http://150.161.11.14:3000/getTypeTrainning');
      const type = await response.json();
      setAllTypes(type);

      let tempType: typeTrainning[] = type;

      setDataType(tempType);
      setTypesOn(!typesOn);
      setsubTypeSelected((prev) => {
        let newSubTypeSelected = [...prev];
        newSubTypeSelected = newSubTypeSelected.fill(false);
        return newSubTypeSelected;
      });
    } catch (error) {
      throw error;
    }
  }

  const getCurrentTrainning = async (trainningType: any) => {
    setCurrentType(trainningType.type.split(''));
    console.log(currentType);
    
    try {
      const response = await fetch('http://150.161.11.14:3000/getTrainning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: trainningType.id
        })
      });
      const trainning = await response.json();
      setTypesOn(false);

      const tempProgressExercise: number[] = [];
      for (let index = 0; index < trainning.length; index++) {
        tempProgressExercise[index] = 0;
      }
      setProgressExercise(tempProgressExercise);
      setCurrentTrainning(trainning);

    } catch (error) {
      throw error;
    }
  }

  const handleUpdateTrainning = async () => {
    try {
      const response = await fetch('http://150.161.11.14:3000/updateManyTrainning', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentTrainning,
        })
      })
    } catch (error) {
        throw error;
    }
  }
  const updateQuantity = async (item: any, updatedInformation: any) => {
    setCurrentTrainning(
        (prev) => prev.map(
            (currentTrainning) => currentTrainning.id === item.id ? 
            { ...currentTrainning, quantity: updatedInformation } : currentTrainning
        ));
  }

  const updateSeries = async (item: any, updatedInformation: any) => {
    setCurrentTrainning(
        (prev) => prev.map(
            (currentTrainning) => currentTrainning.id === item.id ? 
            { ...currentTrainning, series: updatedInformation } : currentTrainning
        ));
  }

  const setSelectedExercises = (exercise: Trainning) => {
    setDeletedExercises(() => {
      const tempNewExercises: Trainning[] = [...deletedExercises];
      tempNewExercises.push(exercise);
      return tempNewExercises;
    });
  }

  const deleteSelectedExercises = (exercise: Trainning) => {
    setDeletedExercises(() => {
      const tempNewExercises: Trainning[] = deletedExercises.filter(element => element.id !== exercise.id);
      
      return tempNewExercises;
    });
  }


  const updateSubTypeSelection = (index:number) =>{
    
    setsubTypeSelected((prev) => {
      let newSubTypeSelected = [...prev];
      newSubTypeSelected = newSubTypeSelected.fill(false);
      newSubTypeSelected[index] =!newSubTypeSelected[index];
      console.log(newSubTypeSelected.findIndex((element) => element === true));
      return newSubTypeSelected;
    });

   
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.header}>
          <View style={styles.headerElementsCenter}>
            <View style={styles.headerleftBox}/>
            <View  style={styles.headerCentralBox}>
              {currentType.map((type, index) =>(
                <Button key={index} >
                  <ButtonText style={{fontSize:subTypeSelected[index] == true ? 80 : 60, 
                                      color: subTypeSelected[index] == true ? '#36c9bd' : '#F5F5F5'}} 
                  onPress={() => updateSubTypeSelection(index)}>{type}</ButtonText>
                </Button>
              ))}
            </View>
            <View style={styles.headerButton}>
              <Button onPress={getType}>
                <Icon name="pencil" size={25} color="#049662" />
              </Button>
            </View>
            
          </View>
          
        </View>

        <View style={styles.content}>
          {typesOn ?
            dataType.map((item, index) => (
              <View key={index} style={styles.typeButtonContainer}>
                <Button onPress={() => getCurrentTrainning(item)}>
                  <ButtonText style={styles.typeButtonText}>{item.type}</ButtonText>
                </Button>
              </View>
            )) : (
              <>
                <View style={styles.exerciseHeader}>
                  <View style={[styles.exerciseColumn, styles.exerciseColumn40]}><Text style={styles.exerciseHeaderText}>exercicio</Text></View>
                  <View style={[styles.exerciseColumn, styles.exerciseColumn20]}><Text style={styles.exerciseHeaderText}>Reps</Text></View>
                  <View style={[styles.exerciseColumn, styles.exerciseColumn20]}><Text style={styles.exerciseHeaderText}>Series</Text></View>
                  <View style={[styles.exerciseColumn, styles.exerciseColumn20]}><Text style={styles.exerciseHeaderText}>estado</Text></View>
                </View>
                {
                currentTrainning.filter(element => currentType.length > 1 && element.subType == currentType[1]).map((item, index) => (
                  <View key={index} >
                    <Button
                      onPress={() => {!deletedExercises.includes(item) ? setSelectedExercises(item) : deleteSelectedExercises(item) }}
                      style={[styles.exerciseRow, deletedExercises.includes(item) && styles.exerciseRowSelected]}>
                        <View style={[styles.exerciseColumn, styles.exerciseColumn40]}>
                            <Text style={styles.exerciseHeaderText}>{item.exercise}</Text>
                        </View>

                        <View style={[styles.exerciseColumn, styles.exerciseColumn20]}>
                            <TextInput onChangeText={(text) => { updateQuantity(item, parseInt(text)) }}>
                                <Text style={styles.exerciseHeaderText}>{item.quantity}</Text>
                            </TextInput>
                        </View>

                        <View style={[styles.exerciseColumn, styles.exerciseColumn20]}>
                            <TextInput onChangeText={(text) => { updateSeries(item, parseInt(text)) }}>
                                <Text style={styles.exerciseHeaderText}>{item.series}</Text>
                            </TextInput>
                        </View>

                        <View style={[styles.exerciseColumn, styles.exerciseColumn20]}>
                            <Button
                            onPressIn={() => { setProgressExerciseIspressed(true); setProgressExerciseIndex(index) }}
                            onPressOut={() => { setProgressExerciseIspressed(false); setProgressExerciseIndex(index) }}>
                            {
                              currentTrainning != null ? 
                              <AnimatedCircularProgress
                              size={progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === index ? 100 : 30}
                              width={progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === index ? 15 : 5}
                              fill={progressExercise[index]}
                              tintColor="#00e0ff"
                              backgroundColor="#3d5875"
                              />
                              :
                              <></>
                            }
                            
                            </Button>
                        </View>
                    </Button>
                  </View>
                ))}
              </>
            )}
        </View>

        <View style={styles.footer}>
          <View style={styles.footerButtonsContainer}>
            <View>
              <Button onPress={() => navigation.navigate('NewTrainning')}>
                <Icon name="plus-circle" size={45} color="#049662" />
              </Button>
            </View>

            <View>
              <Button onPress={handleUpdateTrainning}>
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
}
