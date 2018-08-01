const questions = [
  {
    "id": "q1",
    "text": "After waking, how long before you first smoke a cigarette?",
    "inputType": "radio",
    "options": [
      {
        "id": "1",
        "text": "Within 5 minutes",
        "dependence": 3
      },
      {
        "id": "2",
        "text": "6-30 minutes",
        "dependence": 2
      },
      {
        "id": "3",
        "text": "More than 30 mins",
        "dependence": 1
      }
    ]
  },
  {
    "id": "q2",
    "text": "How many cigarettes do you smoke per day?",
    "inputType": "radio",
    "options": [
      {
        "id": "4",
        "text": "0-10",
        "dependence": 0
      },
      {
        "id": "5",
        "text": "11-20",
        "dependence": 1
      },
      {
        "id": "6",
        "text": "21-30",
        "dependence": 2
      },
      {
        "id": "7",
        "text": "30+",
        "dependence": 3
      }
    ]
  },
  {
    "id": "q3",
    "text": "What have you used when you've tried to quit before?",
    "inputType": "checkbox",
    "options": [
      {
        "id": "8",
        "text": "Face to face support"
      },
      {
        "id": "9",
        "text": "E-cigarettes / vapes"
      },
      {
        "id": "10",
        "text": "Nicotine replacement therapies (NRT) e.g. patches, gum, lozenges, spray"
      },
      {
        "id": "11",
        "text": "Stop smoking medicines e.g. Champix, Zyban"
      },
      {
        "id": "12",
        "text": "Quit with friends and family"
      },
      {
        "id": "13",
        "text": "Willpower"
      },
      {
        "id": "14",
        "text": "Never tried to quit before"
      }
    ]
  }
]

// functions that take a copy of the mobx-state-tree store and return a string
const planTemplates = {
  planIntro: store =>
    `You’re more likely to quit successfully with the right support. ${ store.usedWillpowerAlone ? "Using your willpower is important but you'll increase you're chances of success if you get some additional support. " : ""} Find out the best quit way for you to quit below.`,
}

export { questions, planTemplates }
