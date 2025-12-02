import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f5',
  },
  scrollViewHorizontal: {
    height: 140,
    marginTop: 10,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  square1: {
    width: 305,
    height: 136,
    backgroundColor: '#3B3DBF',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  square2: {
    width: 305,
    height: 136,
    backgroundColor: '#00B94A',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  square3: {
    width: 305,
    height: 136,
    backgroundColor: '#EF463A',
    borderRadius: 8,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  squareText1: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareText2: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareText3: {
    paddingTop: 30,
    paddingLeft: 20,
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0
  },
  squareTextDetails1: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },
  squareTextDetails2: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },
  squareTextDetails3: {
    paddingTop: 5,
    paddingLeft: 20,
    fontSize: 33,
    color: '#FFFFFF'
  },
  fixedButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    marginTop: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  buttonText: {
    color: '#000000ff',
    fontSize: 16,
  },


  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },

  calendarContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  calendar: {
    borderRadius: 8,
  },
  calendarButton: {
    marginTop: 16,
    backgroundColor: '#3B3DBF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  calendarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeReceita: {
    backgroundColor: '#4CAF50',
  },
  badgeDespesa: {
    backgroundColor: '#f44336',
  },
  badgeIcon: {
    width: 16,
    height: 16,
    marginRight: 6,
    color: 'white',
  },
  badgeText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  value: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
});