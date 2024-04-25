import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import _, { forEach } from 'lodash';
import { getTrainning } from '../../api/trainning/read';

export const HomePage = () =>{
    interface TypeData {
        id: number;
        type: string;
        trainning: {
        id: number;
        exercise: string;
        quantity: number;
        series: number;
        typeTrainningId: number;
        }[];
      };

    const [dataType, setDataType] = useState<any[]>([]);
    const [typesOn, setTypesOn] = useState<boolean>(false);
    const [currentType, setCurrentType] = useState<string>('ABC');
    const [currentTrainning, setCurrentTrainning] = useState<any[]>([]);
    const [allTypes, setAllTypes] = useState<TypeData[]>([]);

    const getType = async () => {
        try {
            const response = await fetch('http://150.161.11.14:3000/getTypeTrainning');
            const type = await response.json();
            setAllTypes(type);
            
            let tempType = [];
            for (let index = 0; index < type.length; index++) {
                tempType.push( _.pick(type[index],["id","type"]));
            }
            
            setDataType(tempType);
            setTypesOn(!typesOn);
            
        } catch (error) {
            throw error;
        }
    }
    
    const getCurrentTrainning = async (trainningType:any) =>{
        setCurrentType(trainningType.type);
         try {
            const response = await fetch('http://150.161.11.14:3000/getTrainning',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: trainningType.id
                })
            });
            const trainning = await response.json();
            console.log(trainning);
            setCurrentTrainning(trainning);
            setTypesOn(false);

         } catch (error) {
            throw error;
         }
    }
    
    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:'80%', height:'80%', borderWidth:1, borderColor:'#005B41', borderRadius:20}}>
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
                        )) : (currentTrainning.map((item,index)=>(
                            <View key={index} style={{width:'100%',height:40 ,justifyContent:'center', alignItems:'center', borderBottomWidth:1, borderColor:'#008170', flexDirection:'row'}}>                                
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'50%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:18, color: '#F5F5F5'}}>{item.exercise}</Text></View>
                                    <View style={{borderRightWidth:1, borderColor:'#008170', width:'25%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:18, color: '#F5F5F5'}}>{item.quantity}</Text></View>
                                    <View style={{width:'25%', height:'100%', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:18, color: '#F5F5F5'}}>{item.series}</Text></View>
                            </View>
                        )))}
                </View>

                <View style={{width:'100%', height:'10%', borderTopWidth:1, alignItems:'center', borderColor:'#005B41'}}>
                    <View style={{height:'100%', width:'50%', flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <View>
                            <Button>
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