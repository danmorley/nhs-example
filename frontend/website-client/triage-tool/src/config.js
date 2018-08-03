const questions = [
  {
    "id": "q1",
    "text": "How soon after you wake up do you smoke your first cigarette?",
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
    "text": "How many cigarettes do you smoke in a day?",
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
        "text": "Face to face support e.g GP, Pharmacist or your local stop smoking service"
      },
      {
        "id": "9",
        "text": "E-cigarettes / vapes"
      },
      {
        "id": "10",
        "text": "Patches, gum, lozenges, spray or any other form of nicotine replacement therapy"
      },
      {
        "id": "11",
        "text": "Champix, Zyban or any other prescription stop smoking medicines"
      },
      {
        "id": "12",
        "text": "Willpower alone"
      },
      {
        "id": "13",
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
