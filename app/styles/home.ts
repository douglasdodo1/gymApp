// styles.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    width: '100%',
    height: '100%',
    borderTopWidth: 1,
    borderTopColor: 'black',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '95%',
    height: '95%',
    borderWidth: 1,
    borderColor: '#005B41',
    borderRadius: 20,
  },
  header: {
    width: '100%',
    height: '20%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    borderColor: '#005B41',
  },
  headerElementsCenter: {
    width: '100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTextCenter: {
    flexDirection: 'row',
  },
  headerleftBox:{
    height:'100%', 
    width:'10%',
  },
  headerCentralBox: {
    height:'100%', 
    width:'80%', 
    flex:1, 
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'center', 
    gap:10
  },

  headerButton: {
    height:'100%', 
    width:'10%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  content: {
    width: '100%',
    height: '70%',
  },
  typeButtonContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#008170',
  },
  typeButtonText: {
    fontSize: 40,
    color: '#F5F5F5',
  },
  exerciseHeader: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#008170',
    flexDirection: 'row',
    backgroundColor: '#049662',
  },
  exerciseHeaderText: {
    fontSize: 16,
    color: '#F5F5F5',
  },
  exerciseRow: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#008170',
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
  },
  exerciseRowSelected: {
    backgroundColor: 'red',
  },
  exerciseColumn: {
    borderRightWidth: 1,
    height:'100%',
    borderColor: '#008170',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseColumn40: {
    width: '40%',
  },
  exerciseColumn20: {
    width: '20%',
  },
  footer: {
    width: '100%',
    height: '10%',
    borderTopWidth: 1,
    alignItems: 'center',
    borderColor: '#005B41',
  },
  footerButtonsContainer: {
    height: '100%',
    width: '50%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
