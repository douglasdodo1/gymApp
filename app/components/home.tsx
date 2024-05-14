import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { NavigationProp, ParamListBase } from '@react-navigation/native';

interface HomeProps {
  navigation: NavigationProp<ParamListBase>;
}

export const Home: React.FC<HomeProps> = ({ navigation }) => {

    interface typeTrainning {
        id: number;
        type: string;
    };

    interface trainning {
        exercise: string;
        id: number;
        quantity: number;
        series: number;
        typeTrainningId: number;
    };

    const [dataType, setDataType] = useState<typeTrainning[]>([]);
    const [typesOn, setTypesOn] = useState<boolean>(false);
    const [currentType, setCurrentType] = useState<string>('ABC');
    const [currentTrainning, setCurrentTrainning] = useState<trainning[]>([]);
    const [allTypes, setAllTypes] = useState<typeTrainning[]>([]);
    const [progressExercise, setProgressExercise] = useState<number[]>(Array(1).fill(0));
    const [progressExerciseIspressed, setProgressExerciseIspressed] = useState<boolean>(false);
    const [progressExerciseIndex, setProgressExerciseIndex] = useState<number>(-1);

    useEffect(() => {
        if (progressExerciseIspressed) {
            const interval = setInterval(() => {
                if (progressExerciseIspressed) {
                    setProgressExercise(prevProgressExercise => {
                        const updatedProgressExercise = [...prevProgressExercise];
                        updatedProgressExercise[progressExerciseIndex] += 10;
                        return updatedProgressExercise;
                    });
                    console.log(progressExercise);
                }
                
                
            }, 200);
    
            return () => clearInterval(interval); 
        }

        

    },[progressExerciseIspressed]);


    const getType = async () => {
        try {
            
            const response = await fetch('http://192.168.18.32:3000/getTypeTrainning');
            const type = await response.json();
            setAllTypes(type);
            
            let tempType: typeTrainning[] = type;
            
            
            setDataType(tempType);
            setTypesOn(!typesOn);
        } catch (error) {
            throw error;
        }
    }
    
    const getCurrentTrainning = async (trainningType:any) =>{
        setCurrentType(trainningType.type);
         try {
            const response = await fetch('http://192.168.18.32:3000/getTrainning',{
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

            const tempProgressExercise:number[] = [];
            for (let index = 0; index < trainning.length; index++) {
                tempProgressExercise[index] = 0;                
            }
            console.log(tempProgressExercise);
            
            setProgressExercise(tempProgressExercise);
            setCurrentTrainning(trainning);
            
         } catch (error) {
            throw error;
         }
    }

    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:'95%', height:'95%', borderWidth:1, borderColor:'#005B41', borderRadius:20}}>
                <View style={{width:'100%', height:'20%', borderBottomWidth:1, justifyContent:'center', alignItems:'center', flex:1, flexDirection:'row', borderColor:'#005B41'}}>
                    <View style={{width:'91.5%', justifyContent:'flex-end', alignItems:'center'}}>
                        <Text style={{fontSize:60, color: '#F5F5F5', marginLeft:20}}>{currentType}</Text>
                    </View>
                    <View style={{flex:1,height:'100%'}}>
                        <Button onPress={getType}>
                            <Icon name="pencil" size={25} color="#049662" />
                        </Button>
                    </View>
                </View>

                <View style={{width:'100%', height:'70%'}}>
                    {typesOn ?
                        dataType.map((item,index)=>(
                            <View key={index} style={{width:'100%', justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170'}}>
                                <Button onPress={() => getCurrentTrainning(item)}>
                                    <ButtonText style={{fontSize:40, color: '#F5F5F5'}}>{item.type}</ButtonText>
                                </Button>
                            </View>
                        )) :(
                            <>
                                <View style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row', backgroundColor:'#049662'}}>                                
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>exercicio</Text></View>
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>Reps</Text></View>
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>Series</Text></View>
                                    <View style={{width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>estado</Text></View>
                                </View>
                                
                                {currentTrainning.map((item,index)=>(
                                    <View key={index} style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                        <View style={{borderRightWidth:1, borderColor:'#008170', width:'40%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>{item.exercise}</Text></View>
                                        <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>{item.quantity}</Text></View>
                                        <View style={{borderRightWidth:1, borderColor:'#008170', width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:16, color: '#F5F5F5'}}>{item.series}</Text></View>
                                        <View style={{width:'20%', height:'100%', alignItems:'center', justifyContent:'center'}}>
                                            <Button 
                                            onPressIn={()=>{setProgressExerciseIspressed(true);setProgressExerciseIndex(index)}}
                                            onPressOut={() => {setProgressExerciseIspressed(false);setProgressExerciseIndex(index)}}>
                                                <AnimatedCircularProgress
                                                size={progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === index ? 100 : 30}
                                                width={progressExerciseIspressed && progressExercise[progressExerciseIndex] <= 110 && progressExerciseIndex === index ? 15:5}
                                                fill={progressExercise[index]}
                                                tintColor="#00e0ff"
                                                backgroundColor="#3d5875"
                                                />
                                            </Button>
                                            
                                        </View>
                                    </View>
                                ))}
                            </>
                        )}
                </View>

                <View style={{width:'100%', height:'10%', borderTopWidth:1, alignItems:'center', borderColor:'#005B41'}}>
                    <View style={{height:'100%', width:'50%', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Button onPress={() => navigation.navigate('NewTrainning')}>
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