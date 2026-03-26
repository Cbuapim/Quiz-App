// Quiz App - React Native
// Correct answers for sample questions:
// Q1 (multiple-choice): "Both Web Design and Game Design" → index 2
// Q2 (multiple-answer): "Black" and "Gold" → [1, 2]
// Q3 (true-false): "True" → index 0
// Q4 (multiple-choice): "Knightro" → index 2
// Q5 (multiple-answer): "UCF Knights" and "Orlando Magic" → [0, 2]

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from '@rneui/themed';
import QuestionScreen from './QuestionScreen';
import SummaryScreen from './SummaryScreen';

export { QuestionScreen as Question, SummaryScreen as Summary };

const Stack = createNativeStackNavigator();

// Sample quiz data — UCF Digital Media themed
const quizData = [
  // Q1 - multiple-choice (correct: 2 → "Both Web Design and Game Design")
  {
    prompt: 'Which of the following is a track in the UCF Digital Media BA?',
    type: 'multiple-choice',
    choices: [
      'Web Design',
      'Game Design',
      'Both Web Design and Game Design',
      'None of the above',
    ],
    correct: 2,
  },
  // Q2 - multiple-answer (correct: [1, 2] → "Black" and "Gold")
  {
    prompt: "Which of the following are UCF's school colors? Select all that apply.",
    type: 'multiple-answer',
    choices: ['Green', 'Black', 'Gold', 'Blue'],
    correct: [1, 2],
  },
  // Q3 - true-false (correct: 0 → "True")
  {
    prompt: 'True or false: The sky is blue.',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 0,
  },
  // Q4 - multiple-choice (correct: 2 → "Knightro")
  {
    prompt: "What is the name of UCF's mascot?",
    type: 'multiple-choice',
    choices: ['Knight Rider', 'Pegasus', 'Knightro', 'Charge'],
    correct: 2,
  },
  // Q5 - multiple-answer (correct: [0, 2] → "UCF Knights" and "Orlando Magic")
  {
    prompt: 'Which of the following are Orlando-based sports teams? Select all that apply.',
    type: 'multiple-answer',
    choices: ['UCF Knights', 'Tampa Bay Buccaneers', 'Orlando Magic', 'Miami Heat'],
    correct: [0, 2],
  },
];

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Question"
          screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#222',
            headerTitleStyle: { fontWeight: '600' },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="Question"
            component={QuestionScreen}
            initialParams={{ data: quizData, index: 0, answers: [] }}
            options={{ title: 'Question' }}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
            options={{ title: 'Summary' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
