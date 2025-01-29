import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
    height: '100%',
  },
  divider: {
    borderBottomColor: '#1e90ff',
    borderBottomWidth: 1,
    width: '100%',
    opacity: 0.1,
    padding: 5,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    color: '#fff',
    fontSize: 20,
  },
  headerText: {
    fontSize: 20,
    paddingHorizontal: 8,
  },
});

export default styles;
