import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        marginTop: 30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
    tipoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        borderRadius: 4,
        marginHorizontal: 5,
        borderWidth: 1
    },
    selectedButton: {
        backgroundColor: '#ffffffff',
        borderColor: '#3B3DBF', borderWidth: 2
    },
    unselectedButton: {
        backgroundColor: '#bebebeff',
        borderColor: '#a8a8a8ff'
    },
    selectedText: {
        color: '#000000ff',
        fontWeight: 'bold',
        marginLeft: 5
    },
    unselectedText: {
        color: '#000',
        marginLeft: 5
    },
    icon: {
        width: 20,
        height: 20
    },
    registerButton: {
        backgroundColor: '#00B94A',
        padding: 15, borderRadius: 4,
        alignItems: 'center',
        marginTop: 10
    },
    registerText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});
