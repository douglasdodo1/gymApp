import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

export const HomePage = () =>{
    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', }}>
            <View style={{width:'70%', height:'80%', borderWidth:1, borderColor:'red'}}>
                <View style={{width:'100%', height:'20%', borderWidth:1, borderColor:'blue', justifyContent:'center', alignItems:'center', flex:1, flexDirection:'row'}}>
                    <View style={{width:'91.5%', justifyContent:'flex-end', alignItems:'center'}}>
                        <Text style={{fontSize:60}}>A B C D</Text>
                    </View>
                    <View style={{flex:1,height:'100%'}}>
                        <Icon name="pencil" size={25} color="black" />
                    </View>
                </View>

                <View style={{width:'100%', height:'70%', borderWidth:1, borderColor:'green'}}>
                </View>

                <View style={{width:'100%', height:'10%', borderWidth:1, borderColor:'pink', flexDirection:'row', flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={{paddingHorizontal:12}}>
                        <Button>
                            <Icon name="plus-circle" size={40} color="black" />
                        </Button>
                    </View>
                    <View>
                        <Button>
                            <Icon name="edit" size={40} color="black" />
                        </Button>
                    </View>
                    
                    
                    
                </View>
            </View>
        </View>
    );
}