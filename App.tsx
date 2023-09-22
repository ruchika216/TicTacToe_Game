import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Button, Pressable } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Custom/Icons';

const App = () => {
  const [itemArray, setItemArray] = useState(new Array(9).fill('empty'));
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return Snackbar.show({
        text: winMessage,
        backgroundColor: '#000',
        textColor: '#fff',
      });
    }
    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
      setItemArray([...itemArray]);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: '#fc2c03',
        textColor: '#fff',
      });
    }
    checkIsWinner();
  };

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    setItemArray(new Array(9).fill('empty'));
  };

  const checkIsWinner = () => {
    // Check Rows, Columns, and Diagonals
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (itemArray[a] !== 'empty' && itemArray[a] === itemArray[b] && itemArray[b] === itemArray[c]) {
        setWinMessage(`${itemArray[a]} won`);
        return;
      }
    }
    //  Draw
    if (!itemArray.includes('empty')) {
      setWinMessage("It's a draw!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.text}>TicTacToe</Text>
      </View>
      <View style={styles.grid}>
        {itemArray.map((item, index) => (
          <TouchableOpacity style={styles.box} key={index} onPress={() => changeItem(index)}>
            <View style={styles.card}>
              <Icons name={item} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        {winMessage ? (
          <View>
            <Text style={styles.winMessage}>{winMessage}</Text>
            <Button onPress={reloadGame} title="Reload Game" color="#3638D3" />
          </View>
        ) : (
          <View style={styles.turn}>
  <Pressable 
    style={({ pressed }) => [
      styles.turnBtn,
      {
        backgroundColor: isCross ? '#0fa320' : '#fcba03',
      },
    ]}
  >
    {({ pressed }) => <Text style={styles.turnColor}>{isCross ? 'Cross' : 'Circle'}Turn</Text>}
  </Pressable>
</View>

        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EEFF',
  },
  heading: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#172ccf',
    marginBottom: 50,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"#172ccf"
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  box: {
    width: '30%',
    aspectRatio: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%', 
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, 
    borderRadius: 5, 
  },
  winMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform:'uppercase',
    marginVertical: 10,
    color:'#000000'
  },
  turn: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  turnBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:5,
    borderRadius: 8,
    width: '60%',
    height: 40,
  },
  turnColor: {
    color: "#ffff",
    fontSize:16,
    fontWeight:'bold'
  }
});

export default App;
