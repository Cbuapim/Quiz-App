// components/SummaryScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

// Check if user's answer is fully correct
function isCorrect(question, userAnswer) {
  if (question.type === 'multiple-answer') {
    const correct = [...question.correct].sort((a, b) => a - b);
    const user = Array.isArray(userAnswer)
      ? [...userAnswer].sort((a, b) => a - b)
      : [];
    return (
      correct.length === user.length && correct.every((v, i) => v === user[i])
    );
  }
  return userAnswer === question.correct;
}

function correctSet(question) {
  return Array.isArray(question.correct) ? question.correct : [question.correct];
}

function userSet(userAnswer) {
  if (userAnswer === null || userAnswer === undefined) return [];
  return Array.isArray(userAnswer) ? userAnswer : [userAnswer];
}

export default function SummaryScreen({ route }) {
  const { data, answers } = route.params;

  const score = data.reduce(
    (acc, q, i) => acc + (isCorrect(q, answers[i]) ? 1 : 0),
    0
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.heading}>Summary</Text>

        {/* Total score — testID="total" */}
        <Text testID="total" style={styles.score}>
          Score: {score}/{data.length}
        </Text>

        {data.map((question, qi) => {
          const userAnswer = answers[qi];
          const correctIndices = correctSet(question);
          const userIndices = userSet(userAnswer);

          return (
            <View key={qi} style={styles.questionBlock}>
              <Text style={styles.qPrompt}>{question.prompt}</Text>

              {question.choices.map((choice, ci) => {
                const isCorrectChoice = correctIndices.includes(ci);
                const wasChosen = userIndices.includes(ci);

                // Rendering rules (matching professor's summary screen):
                // - Correct answer → green text (bold if chosen)
                // - Chosen but wrong → strikethrough (not green)
                // - Neither → default/dim
                let textStyle = [styles.choiceText];

                if (isCorrectChoice) {
                  textStyle.push(styles.choiceGreen);
                  if (wasChosen) {
                    textStyle.push(styles.choiceBold);
                  }
                } else if (wasChosen) {
                  textStyle.push(styles.choiceStrike);
                }

                return (
                  <Text key={ci} style={textStyle}>
                    {choice}
                  </Text>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 24,
    paddingBottom: 48,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
    textAlign: 'center',
  },
  score: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    marginBottom: 28,
    textAlign: 'center',
  },
  questionBlock: {
    width: '100%',
    marginBottom: 24,
  },
  qPrompt: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
  },
  choiceText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 2,
    paddingLeft: 4,
  },
  choiceGreen: {
    color: '#27ae60',
  },
  choiceBold: {
    fontWeight: '700',
  },
  choiceStrike: {
    textDecorationLine: 'line-through',
    color: '#444',
  },
});
