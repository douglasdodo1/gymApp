import { Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, ScrollView, Text, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export const TrainningForm = () =>{

    interface Exercises {
        id: number;
        name:string;
    };

    interface typeTrainning {
        id: number;
        type: string;
    };

    const [exercises,setExercises] = useState<Exercises[]>([]);
    const [trainningSelectIsPressed, setTrainningSelectIsPressed] = useState<Boolean>(false);
    const [currentType, setCurrentType] = useState<typeTrainning>();
    const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);
    const [newExercises, setNewExercises] = useState<Exercises[]>([]);

    const getType = async () => {
        try {
            
            const response = await fetch('http://150.161.197.115:3000/getTypeTrainning');
            const type = await response.json();
            setAllTypes(type);
            
            console.log(type);
            
            setTrainningSelectIsPressed(!trainningSelectIsPressed);
            
        } catch (error) {
            throw error;
        }
    }

    const getExercises = async () => {
        try {
            
            const response = await fetch('http://150.161.197.115:3000/getExercises');
            const exercises = await response.json();
            
            console.log(exercises);
            
            setExercises(exercises);
            
        } catch (error) {
            throw error;
        }
    }

    const handleUpdateTypeTrainning = async () => {
        try {
            const response = await fetch('http://150.161.197.115:3000/updateTypeTrainning',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newExercises,
                    currentType,
                })
            });

            const updatedTypeTrainning = await response.json();
            
        } catch (error) {
            throw error;
        }
    }

    const setSelectedExercises = (exercise:Exercises) =>{
        
        setNewExercises(() =>{
            const tempNewExercises: Exercises[] = [...newExercises];
            tempNewExercises.push(exercise);
            
            return tempNewExercises;
        });
    }
    
    const deleteSelectedExercises = (exercise:Exercises) =>{
        
        setNewExercises(() =>{
            const tempNewExercises: Exercises[] = newExercises.filter(element => element.id !== exercise.id);
            return tempNewExercises;
        });
    }
    
    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:'95%', height:'95%', borderWidth:1, borderColor:'#005B41', borderRadius:20}}>
                <View style={{width:'100%', height:'40%', borderBottomWidth:1, justifyContent:'center', alignItems:'center', flex:1, flexDirection:'row', borderColor:'#005B41'}}>
                    <View style={{width:'91.5%', justifyContent:'flex-end', alignItems:'center'}}>
                        <Button onPress={getType} style={{marginLeft:20}}>
                            <ButtonText 
                            style={{
                                    fontSize:trainningSelectIsPressed ? 90 : 60, color: '#F5F5F5'
                                    }}>
                                    {currentType == undefined ?  'New' : currentType?.type}
                                 </ButtonText>
                        </Button>
                    </View>
                    
                </View>
                
                <View style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row', backgroundColor:'#049662'}}>                                
                    <View style={{borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:30, color: '#F5F5F5'}}>exercicios</Text></View>
                </View>
                
                <ScrollView style={{width:'100%', height:'50%', }}>
                    
                    {
                    trainningSelectIsPressed?
                            allTypes.map((item,index) => (
                                <View key={index} style={{width:'100%',height:60 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                    <Button onPress={() => {setCurrentType(item); setTrainningSelectIsPressed(!trainningSelectIsPressed); getExercises()}}
                                    style={{ borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <ButtonText style={{fontSize:40, color: '#F5F5F5'}}>{item.type}</ButtonText>
                                    </Button>
                                </View>
                            ))
                        :

                        <>
                            {
                            exercises.map((item,index)=>(
                                <View key={index} style={{width:'100%',height:55 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                    <Button  onPress={() => {!newExercises.includes(item) ? setSelectedExercises(item) : deleteSelectedExercises(item) }} 
                                    style={{backgroundColor: newExercises.includes(item) ? '#0d750c' : '#1a1a1a' , 
                                    width:'100%', height:'100%', alignItems:'center', 
                                    justifyContent:'center'}}>

                                        <ButtonText style={{fontSize:18, color: '#F5F5F5'}}>{item.name}</ButtonText>
                                    </Button>
                                </View>
                            ))
                            }
                        </>
                    }
                </ScrollView>

                <View style={{width:'100%', height:'10%', borderTopWidth:1, alignItems:'center', borderColor:'#005B41'}}>
                    <View style={{height:'100%', width:'50%', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Button onPress={handleUpdateTypeTrainning}>
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
}