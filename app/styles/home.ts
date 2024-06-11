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
  headerTextContainer: {
    width: '91.5%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 60,
    color: '#F5F5F5',
    marginLeft: 20,
  },
  headerButton: {
    flex: 1,
    height: '100%',
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
