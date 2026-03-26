# Quiz App — React Native

A React Native quiz app built with Expo, React Navigation, and React Native Elements (RNEUI).

## Features
- Three question types: **Multiple Choice**, **Multiple Answer**, **True/False**
- React Native Navigation (native stack, no back gesture)
- `ButtonGroup` from `@rneui/themed` for answer choices (testID: `"choices"`)
- "Next Question" button (testID: `"next-question"`)
- Summary screen with total score (testID: `"total"`)
- Summary shows all questions with:
  - ✓ Correct chosen answers — **bolded green**
  - ✗ Incorrect chosen answers — ~~strikethrough red~~
  - Correct unchosen answers — shown in green

## Correct Answers (Sample Data)
| # | Type | Correct |
|---|------|---------|
| Q1 | multiple-choice | index 1 → "JavaScript" |
| Q2 | multiple-answer | [0, 2] → "React", "Vue" |
| Q3 | true-false | index 0 → "True" |
| Q4 | multiple-choice | index 2 → "npm install" |
| Q5 | multiple-answer | [0, 1, 2] → "HTML", "CSS", "JavaScript" |

## Setup

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go (iOS/Android) or press `i` for iOS simulator / `a` for Android.

## Structure

```
quiz-app/
├── App.js                        # Navigator + quiz data; exports Question & Summary
├── components/
│   ├── QuestionScreen.js         # Question component
│   └── SummaryScreen.js          # Summary component
├── package.json
├── app.json
└── babel.config.js
```

## Exported Components
```js
import { Question, Summary } from './App';
```

## Dependencies
- `@react-navigation/native` + `@react-navigation/native-stack`
- `react-native-screens` + `react-native-safe-area-context`
- `@rneui/themed` + `@rneui/base`
# Quiz-App
# Quiz-App
