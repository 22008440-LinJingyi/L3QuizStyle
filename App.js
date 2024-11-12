import React, { useState } from 'react';
import { View, Text, Image, Button, Alert, StyleSheet, ScrollView, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from "react-native-vector-icons/FontAwesome6";
// Styles
const styles = StyleSheet.create({
  container:{
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  textInput: {
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'whitesmoke',
    fontSize: 16,
    textAlign: 'center',
  },
  questionContainer: {
    width: '100%',
    backgroundColor: 'grey',
    padding: 15,
    marginVertical: 10,
    borderWidth:1

  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    textAlign: 'center'
  },
  image: {
    width: '100%',
    height: 200,

  },
  Button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

// Picker styles
const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#ffffff',
  },
});

const questions = [
  {
    pic: 1,
    question: "What animal is this?",
    image: require('./img/elephant.jpg'),
    options: [
      { label: 'Dog', value: 'Dog' },
      { label: 'Rhino', value: 'Rhino' },
      { label: 'Elephant', value: 'Elephant' }
    ],
    correctAnswer: 'Elephant',
  },
  {
    pic: 2,
    question: "What animal is this?",
    image: require('./img/leopard.jpg'),
    options: [
      { label: 'Lion', value: 'Lion' },
      { label: 'Tiger', value: 'Tiger' },
      { label: 'Leopard', value: 'Leopard' }
    ],
    correctAnswer: 'Leopard',
  },
  {
    pic: 3,
    question: "What animal is this?",
    image: require('./img/hummingbird.jpg'),
    options: [
      { label: 'Humming Bird', value: 'Humming Bird' },
      { label: 'Peacock', value: 'Peacock' },
      { label: 'Duck', value: 'Duck' }
    ],
    correctAnswer: 'Humming Bird',
  },
  {
    pic: 4,
    question: "This animal has a long neck, What is this animal?",
    image: require('./img/giraffe.jpg'),
    options: [
      { label: 'Penguin', value: 'Penguin' },
      { label: 'Turtle', value: 'Turtle' },
      { label: 'Zebra', value: 'Zebra' },
      { label: 'Giraffe', value: 'Giraffe' }
    ],
    correctAnswer: 'Giraffe',
  }
];

const Question = ({ question, image, options, selectedAnswer, onSelectAnswer }) => (
    <View style={styles.questionContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.questionText}>{question}</Text>
      <RNPickerSelect
          onValueChange={onSelectAnswer}
          items={options}
          placeholder={{ label: "Select an answer...", value: null }}
          value={selectedAnswer}
          style={pickerSelectStyles}
      />
    </View>
);

const QuizApp = () => {
  const [answers, setAnswers] = useState({});
  const [username, setUsername] = useState('');

  const Select = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const Submit = () => {
    let correctCount = 0;
    questions.forEach(question => {
      if (answers[question.pic] === question.correctAnswer) correctCount++;
    });

    // ADVANCED FEEDBACK
    let feedback;
    if (correctCount === questions.length) {
      feedback = "Well done! You got a full score!";
    } else if (correctCount >= questions.length / 2) {
      feedback = "Great effort! Keep going!";
    } else {
      feedback = "You can do better next time.";
    }

    Alert.alert(
        `You have ${correctCount} correct answers!\n${feedback}`
    );
  };

  const handleLogin = () => {
    ToastAndroid.show("Welcome " + username, ToastAndroid.SHORT);
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="fish" size={30} color="#B23B23" />
        <Text style={styles.title}>Animal Quiz</Text>

        {/* Username input */}
        <Text style={styles.label}>User Name:</Text>
        <TextInput
            style={styles.textInput}
            onChangeText={setUsername}
            value={username}
            placeholder="Enter your name"
        />
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        {/* Quiz Questions */}
        {questions.map(q => (
            <Question
                key={q.pic}
                question={q.question}
                image={q.image}
                options={q.options}
                selectedAnswer={answers[q.pic]}
                onSelectAnswer={answer => Select(q.pic, answer)}
            />
        ))}

        {/* Submit Button */}
        <TouchableOpacity onPress={Submit} style={styles.Button}>
          <Text style={styles.submitButtonText}>Submit Answers</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};


export default QuizApp;
