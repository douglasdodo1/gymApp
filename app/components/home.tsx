import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/home';
import { Trainning } from '@prisma/client';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


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
  const [subTypeSelected, setsubTypeSelected] = useState<string>('');
  const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);
  const [progressExercise, setProgressExercise] = useState<number[]>([]);
  const [progressExerciseIspressed, setProgressExerciseIspressed] = useState<boolean>(false);
  const [progressExerciseIndex, setProgressExerciseIndex] = useState<number>(-1);
  const [exercisesForDelete, setexercisesForDelete] = useState<Trainning[]>([]);
  const [filtredExercises, setFiltredExercises] = useState<Trainning[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (progressExerciseIspressed) {
      const interval = setInterval(() => {
        if (progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 120) {
          setProgressExercise(prevProgressExercise => {
            const updatedProgressExercise = [...prevProgressExercise];
            updatedProgressExercise[progressExerciseIndex] += 10;
            if (updatedProgressExercise[progressExerciseIndex] >= 100){
              setCurrentTrainning((prev)=>{
                let tempCurrentTraining = [...prev];
                const tempFiltredExercises = [...filtredExercises];
                const element = tempFiltredExercises[progressExerciseIndex];
                let index:number = -1;
                tempCurrentTraining.forEach((item) =>{
                  if (item.id === element.id) {
                    index = tempCurrentTraining.indexOf(item);
                  }
                })

                console.log(index);
                console.log(tempCurrentTraining);
                
                
                tempCurrentTraining[index].state = true;
                return tempCurrentTraining;
              });
              handleUpdateStateExercise(true);
            }
            return updatedProgressExercise;
          });
        }
      }, 200);

      return () => clearInterval(interval);
    }

    else{
      setProgressExercise(prevProgressExercise => {
        const updatedProgressExercise = [...prevProgressExercise];
        if (updatedProgressExercise[progressExerciseIndex] <= 90) {
          updatedProgressExercise[progressExerciseIndex] = 0;
        }
        return updatedProgressExercise;
      });
    }
  }, [progressExerciseIspressed]);

  
  useEffect(() => {
    const fetchData = async () => {
      if (subTypeSelected != '') {
        setIsLoading(true);
  
        const type: typeTrainning | undefined = allTypes.find(type => type.type === currentType.join(''));
  
        await getCurrentTrainning(type);
        
        const subType: string = subTypeSelected;
  
        setFiltredExercises((prev) => {
          let tempFiltredExercises = [...currentTrainning];
          
          tempFiltredExercises = tempFiltredExercises.filter(trainning => trainning.subType == subType);
  
          tempFiltredExercises.sort((a, b) => a.order - b.order);
  
          let updatedProgressExercise = [...progressExercise];
          if (tempFiltredExercises.length > 0) {
            updatedProgressExercise = new Array(tempFiltredExercises.length).fill(0);
          }
  
          setProgressExercise(prev => {
            for (let index = 0; index < tempFiltredExercises.length; index++) {
              if (tempFiltredExercises[index].state == true) {
                updatedProgressExercise[index] = 100;
              }
            }
            return updatedProgressExercise;
          });
  
          return tempFiltredExercises;
        });
      };
    }
  
    fetchData();
    setIsLoading(false);
  }, [subTypeSelected]);

  const handleUpdateStateExercise = async (newStatus:boolean) => {
    try {
      const exerciseId:number = currentTrainning[progressExerciseIndex].id;
      
      const type:typeTrainning | undefined = allTypes.find(element => element.type == currentType.join(''));

      const typeTrainningId:number | undefined = type?.id;
      console.log(typeTrainningId);
      

      const response = await fetch (`https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/updateStateExercises/${exerciseId}/${typeTrainningId}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })
    } catch (error) {
      throw error;
    }
  };
  

  const handleResetStates = async () => {
    try {
      const type:typeTrainning | undefined = allTypes.find(element => element.type == currentType.join(''));
      const typeTrainningId:number | undefined = type?.id;
      console.log(typeTrainningId);
      
      const response = await fetch ('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/resetStates',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ state: false, exercises: currentTrainning, typeTrainningId: typeTrainningId}),
      })
    } catch (error) {
      throw error;
    }
  };

  const resetStates = () => {
    setProgressExercise((prev) => {
      let updatedProgressExercise = [...prev];
      for (let index = 0; index < updatedProgressExercise.length; index++) {
        updatedProgressExercise[index] = 0;
      }
      return updatedProgressExercise;

    });
    
    handleResetStates();

  }


  const getType = async () => {
    try {
      const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/getTypeTrainning');
      const type = await response.json();
      setAllTypes(type);

      let tempType: typeTrainning[] = type;

      setDataType(tempType);
      setTypesOn(!typesOn);

    } catch (error) {
      throw error;
    }
  };

  const getCurrentTrainning = async (type:any) => {
    
    if (type != undefined) {
      setCurrentType(type.type.split(''));
    };
    
    try {
      const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/getTrainning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: type.id
        })
      });

      const trainning = await response.json();
      setTypesOn(false);

      const tempProgressExercise: number[] = [];
      for (let index = 0; index < trainning.length; index++) {
        tempProgressExercise[index]= 0;
      }
      setProgressExercise(tempProgressExercise);
      
      setCurrentTrainning(trainning);
      setexercisesForDelete([]); 

    } catch (error) {
      throw error;
    }
  };

  const handleUpdateTrainning = async (data:Trainning[]) => {
    try {
      const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/updateManyTrainning', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
        })
      })
    } catch (error) {
        throw error;
    }
  };

  const handleDeleteExercises = async () => {

    if (exercisesForDelete.length > 0) {
      try {

        const response = await fetch('https://gym-phzi4t6sz-douglas-projects-eccfdc52.vercel.app/deleteManyTrainings',{
          method: 'DELETE',
          headers:{'Content-Type': 'application/json'},
          body: JSON.stringify({
            exercisesForDelete,
          })
        });
      } catch (error) {
        throw error;
      }
    }
  };


  const setNewOrderExercises = (data: Trainning[]) =>{
      setCurrentTrainning((prev)=>{
        let tempCurrentTraining = [...prev];
        let tempData = [...data];
        tempCurrentTraining = tempCurrentTraining.map((trainning) =>{
          const replacement = tempData.find(el => el.subType === trainning.subType);
  
          if (replacement) {
            tempData = tempData.filter(item => item.id !== replacement.id);
            return replacement; 
           }
          return trainning;
        })
        handleUpdateTrainning(tempCurrentTraining);
        
        tempData = tempCurrentTraining.filter(item => item.subType === subTypeSelected);
        console.log(tempData);
        
        setProgressExercise((prev)=>{
          let tempProgressExercise = [...prev];

          for (let index = 0; index < tempProgressExercise.length; index++) {
            if (tempData[index].state === true) {
              tempProgressExercise[index] = 100;
            }
            else {
              tempProgressExercise[index] = 0;
            }
          }
          console.log(tempProgressExercise);
          
          return tempProgressExercise;
        })
        
        return tempCurrentTraining;
        
      });

  };
  

  const updateQuantity = async (item: any, updatedInformation: any) => {
    setCurrentTrainning(
        (prev) => prev.map(
            (currentTrainning) => currentTrainning.id === item.id ? 
            { ...currentTrainning, quantity: updatedInformation } : currentTrainning
        ));
  };

  const updateSeries = async (item: any, updatedInformation: any) => {
    setCurrentTrainning(
        (prev) => prev.map(
            (currentTrainning) => currentTrainning.id === item.id ? 
            { ...currentTrainning, series: updatedInformation } : currentTrainning
        ));
  };

  const setSelectedExercises = (exercise: Trainning) => {
    setexercisesForDelete(() => {
      const tempNewExercises: Trainning[] = [...exercisesForDelete];
      tempNewExercises.push(exercise);
      return tempNewExercises;
    });
  };

  const deleteSelectedExercises = (exercise: Trainning) => {
    setexercisesForDelete(() => {
      const tempNewExercises: Trainning[] = exercisesForDelete.filter(element => element.id !== exercise.id);
      
      return tempNewExercises;
    });
  };

  const deleteExercises = () =>{
    
    handleDeleteExercises();

    setCurrentTrainning((prev) => {
      let tempCurrentTraining = [...prev];
      exercisesForDelete.map(element => (
        tempCurrentTraining = tempCurrentTraining.filter(item => item.id !== element.id)
      ))

      setFiltredExercises((prev) => {
        let tempFiltredExercises = [...tempCurrentTraining];

        tempCurrentTraining.map(element => (
          tempFiltredExercises = tempCurrentTraining.filter(exercise => exercise.subType == subTypeSelected)
        ));

        console.log(tempFiltredExercises);
        
        return tempFiltredExercises;
      })

      return tempCurrentTraining;
    });
  };

  function renderItem({item, drag, isActive }: RenderItemParams<{  id: number; order: number; exercise: string; series: number; 
    quantity: number; typeTrainningId: number; subType: string; state: boolean; }>) {
    return (
      <TouchableOpacity
        style={[
          styles.exerciseRow,
          { backgroundColor: isActive ? '#e0e0e0' : 'transparent' } 
        ]}
        onLongPress={drag}
      >
        <View key={item.id} style={[styles.exerciseRow, exercisesForDelete.includes(item) && styles.exerciseRowSelected]}>
          <View style={[styles.exerciseColumn, styles.exerciseColumn40]}>
            <Button onPress={() => {!exercisesForDelete.includes(item) ? setSelectedExercises(item) : deleteSelectedExercises(item) }}>
              <ButtonText style={styles.exerciseHeaderText}>{item.exercise}</ButtonText>
            </Button>
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
            onPressIn={() => { setProgressExerciseIspressed(true); setProgressExerciseIndex(filtredExercises.indexOf(item))}}
            onPressOut={() => { setProgressExerciseIspressed(false); setProgressExerciseIndex(filtredExercises.indexOf(item))}}>
            {currentTrainning != null  && (
              <AnimatedCircularProgress
                size={item.state == false && progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === filtredExercises.indexOf(item) ? 100 : 30}
                width={item.state == false && progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === filtredExercises.indexOf(item) ? 15 : 5}
                fill={progressExercise[filtredExercises.indexOf(item)]}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
              />
            )} 
            </Button>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <View style={styles.headerElementsCenter}>
              <View style={styles.headerleftBox}/>
              <View  style={styles.headerCentralBox}>
                {currentType.map((type, index) =>(
                  <Button key={index} >
                    <ButtonText style={{fontSize:subTypeSelected == type ? 80 : 60, 
                                        color: subTypeSelected == type ? '#36c9bd' : '#F5F5F5'}} 
                    onPress={() => setsubTypeSelected(type)}>{type}</ButtonText>
                  </Button>
                ))}
              </View>
              <View style={styles.headerButton}>
                <Button disabled={isLoading == true} onPress={() => {getType(); setsubTypeSelected('')}}>
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
                  <DraggableFlatList
                    data={filtredExercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    onDragEnd={({ data }) => {setFiltredExercises(data); setNewOrderExercises(data)}}
                  />

                </>
              )}
          </View>

          <View style={styles.footer}>
            <View style={styles.footerButtonsContainer}>
              <View>
                <Button disabled={isLoading == true} onPress={() => navigation.navigate('NewTrainning')}>
                  <Icon name="plus-circle" size={45} color="#049662"/>
                </Button>
              </View>

              <View>
                <Button disabled={isLoading == true} onPress={() => handleUpdateTrainning(currentTrainning)}>
                  <Icon name="edit" size={45} color="#049662"/>
                </Button>
              </View>

              <View>
                <Button disabled={isLoading == true} onPress={deleteExercises}>
                  <Icon name="minus-circle" size={45} color="#049662"/>
                </Button>
              </View>

              <View>
                <Button disabled={isLoading == true} onPress={resetStates}>
                  <Icon name="rotate-right" size={45} color="#049662"/>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
