import { Button, ButtonText, FormControl, FormControlLabel, FormControlLabelText, Text, View } from "@gluestack-ui/themed";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

export const TrainningForm = () =>{

    interface Exercises {
        name:string;
    };

    interface typeTrainning {
        id: number;
        type: string;
    };

    const [exercises,setExercises] = useState<Exercises[]>([]);
    const [trainningSelectIsPressed, setTrainningSelectIsPressed] = useState<Boolean>(false);
    const [currentType, setCurrentType] = useState<string>('');
    const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);

    const getType = async () => {
        try {
            
            const response = await fetch('http://192.168.18.32:3000/getTypeTrainning');
            const type = await response.json();
            setAllTypes(type);
            console.log(type);
            
            let tempType: typeTrainning[] = type;
            setTrainningSelectIsPressed(!trainningSelectIsPressed)
            
        } catch (error) {
            throw error;
        }
    }

    const getExercises = async () => {
        try {
            
            const response = await fetch('http://192.168.172.254:3000/getExercises');
            const exercises = await response.json();
            
            setExercises(exercises);
            
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {
        getExercises();
    },[]);

    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:'95%', height:'95%', borderWidth:1, borderColor:'#005B41', borderRadius:20}}>
                <View style={{width:'100%', height:'20%', borderBottomWidth:1, justifyContent:'center', alignItems:'center', flex:1, flexDirection:'row', borderColor:'#005B41'}}>
                    <View style={{width:'91.5%', justifyContent:'flex-end', alignItems:'center'}}>
                        <Button onPress={getType} style={{marginLeft:20}}>
                            <ButtonText 
                            style={{
                                    fontSize:trainningSelectIsPressed ? 90 : 60, color: '#F5F5F5'
                                    }}>
                                    {currentType == ''? 'New' : currentType}
                                 </ButtonText>
                        </Button>
                    </View>
                </View>

                <View style={{width:'100%', height:'70%'}}>
                    {
                    trainningSelectIsPressed?
                            allTypes.map((item,index) => (
                                <View key={index} style={{width:'100%',height:60 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                    <Button onPress={() => {setCurrentType(item.type); setTrainningSelectIsPressed(!trainningSelectIsPressed)}}
                                    style={{ borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                        <ButtonText style={{fontSize:40, color: '#F5F5F5'}}>{item.type}</ButtonText>
                                    </Button>
                                </View>
                            ))
                        :

                        <>
                            <View style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row', backgroundColor:'#049662'}}>                                
                                <View style={{borderRightWidth:1, borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>exercicio</Text></View>
                                <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>Reps</Text></View>
                                <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>Series</Text></View>
                                <View style={{width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>estado</Text></View>
                            </View>
                            {
                            exercises.map((item,index)=>(
                                <View key={index} style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>{item.name}</Text></View>
                                </View>
                            ))
                            }
                        </>
                    }
                </View>

                <View style={{width:'100%', height:'10%', borderTopWidth:1, alignItems:'center', borderColor:'#005B41'}}>
                    <View style={{height:'100%', width:'50%', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Button >
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