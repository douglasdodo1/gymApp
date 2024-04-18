import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';

export const HomePage = () =>{
    return(
        <View style={{backgroundColor:'#1a1a1a', width:'100%', height:'100%', borderTopWidth:1, borderTopColor:'black', flex:1, alignItems:'center', }}>
            <View style={{width:'70%', height:'60%', borderWidth:1, borderColor:'red'}}>
                <View style={{width:'100%', height:'20%', borderWidth:1, borderColor:'blue', justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:60}}>A B C D</Text>
                </View>
                <View style={{width:'100%', height:'70%', borderWidth:1, borderColor:'green'}}>
                </View>
                <View style={{width:'100%', height:'10%', borderWidth:1, borderColor:'pink', flexDirection:'row'}}>
                    <Button>
                        <ButtonText>New training</ButtonText>
                    </Button>
                    <Button>
                        <ButtonText>Edit training</ButtonText>
                    </Button>

                </View>
            </View>
        </View>
    );
}