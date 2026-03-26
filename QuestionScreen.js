// components/QuestionScreen.js
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ButtonGroup, Button } from '@rneui/themed';

export default function QuestionScreen({ route, navigation }) {
  const { data, index, answers } = route.params;
  const question = data[index];
  const isMultiAnswer = question.type === 'multiple-answer';

  const [selected, setSelected] = useState(isMultiAnswer ? [] : null);

  const handleSingleSelect = useCallback((idx) => {
    setSelected(idx);
  }, []);

  const handleMultiSelect = useCallback((idxOrArray) => {
    // On web, ButtonGroup passes the full updated selectedIndexes array.
    // On native, it passes a single index to toggle.
    if (Array.isArray(idxOrArray)) {
      setSelected(idxOrArray);
    } else {
      setSelected((prev) => {
        if (prev.includes(idxOrArray)) return prev.filter((i) => i !== idxOrArray);
        return [...prev, idxOrArray];
      });
    }
  }, []);

  const handleNext = useCallback(() => {
    const newAnswers = [...answers, selected];
    const isLast = index === data.length - 1;

    if (isLast) {
      navigation.navigate('Summary', { data, answers: newAnswers });
    } else {
      navigation.push('Question', {
        data,
        index: index + 1,
        answers: newAnswers,
      });
    }
  }, [answers, selected, index, data, navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.prompt}>{question.prompt}</Text>

        {/* Choices — ButtonGroup from RNEUI, vertical */}
        <ButtonGroup
          testID="choices"
          buttons={question.choices}
          selectedIndexes={
            isMultiAnswer
              ? (Array.isArray(selected) ? selected : [])
              : selected !== null
              ? [selected]
              : []
          }
          onPress={isMultiAnswer ? handleMultiSelect : (idx) => setSelected(idx)}
          selectMultiple={isMultiAnswer}
          vertical
          containerStyle={styles.bgContainer}
          buttonStyle={styles.bgButton}
          textStyle={styles.bgText}
          selectedButtonStyle={styles.bgSelected}
          selectedTextStyle={styles.bgSelectedText}
        />

        {/* Next button — always enabled, matching professor's example */}
        <Button
          testID="next-question"
          title={index === data.length - 1 ? 'See Results' : 'Next Question'}
          onPress={handleNext}
          buttonStyle={styles.nextBtn}
          titleStyle={styles.nextBtnText}
          containerStyle={styles.nextBtnContainer}
        />
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingBottom: 48,
  },
  prompt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  bgContainer: {
    borderRadius: 4,
    borderColor: '#ccc',
    marginBottom: 16,
    marginLeft: 0,
    marginRight: 0,
  },
  bgButton: {
    paddingVertical: 14,
    backgroundColor: '#fff',
  },
  bgText: {
    color: '#555',
    fontSize: 15,
  },
  bgSelected: {
    backgroundColor: '#2089dc',
  },
  bgSelectedText: {
    color: '#fff',
    fontWeight: '600',
  },
  nextBtnContainer: {
    marginTop: 4,
  },
  nextBtn: {
    backgroundColor: '#2089dc',
    borderRadius: 4,
    paddingVertical: 14,
  },
  nextBtnText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
