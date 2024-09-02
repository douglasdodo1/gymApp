// styles.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    centerPage: {
        backgroundColor:'#1a1a1a',
        width:'100%', height:'100%',
        borderTopWidth:1,
        borderTopColor:'black',
        flex:1, alignItems:'center',
        justifyContent:'center'
    },
    container:{
        width:'95%', 
        height:'95%', 
        borderWidth:1, 
        borderColor:'#005B41', 
        borderRadius:20
    },
    header:{
        width:'100%', 
        height:'40%', 
        borderBottomWidth:1, 
        justifyContent:'center', 
        alignItems:'center', 
        flex:1, 
        flexDirection:'row',
        borderColor:'#005B41'
    },
    headerText:{
        width:'91.5%',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    bodyPositionTextTheme:{
        width:'100%',
        height:40 ,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderColor:'#008170',
        flexDirection:'column', backgroundColor:'#049662'
    },
    bodyText:{
        borderColor:'#008170',
        width:'40%',
        height:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
      },
      checked: {
        backgroundColor: '#000',
      },
      checkmark: {
        width: 12,
        height: 12,
        backgroundColor: '#fff',
      },
      label: {
        fontSize: 18,
        marginTop: 10,
      },
});
