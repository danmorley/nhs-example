const questions = [
  {
    "id": "q1",
    "text": "How soon after you wake up do you smoke your first cigarette?",
    "inputType": "radio",
    "options": [
      {
        "id": "within5mins",
        "text": "Within 5 minutes",
        "dependence": 3
      },
      {
        "id": "6to30mins",
        "text": "6-30 minutes",
        "dependence": 2
      },
      {
        "id": "30plusmins",
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
        "id": "0to10cigs",
        "text": "0-10",
        "dependence": 0
      },
      {
        "id": "11to20cigs",
        "text": "11-20",
        "dependence": 1
      },
      {
        "id": "21to30cigs",
        "text": "21-30",
        "dependence": 2
      },
      {
        "id": "30pluscigs",
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
        "id": "facetoface",
        "text": "Face to face support e.g GP, pharmacist or your local stop smoking service"
      },
      {
        "id": "ecigs",
        "text": "E-cigarettes or vapes"
      },
      {
        "id": "patches",
        "text": "Patches, gum, lozenges, spray or any other form of nicotine replacement therapy"
      },
      {
        "id": "champix",
        "text": "Champix or Zyban"
      },
      {
        "id": "willpower",
        "text": "Willpower alone"
      },
      {
        "id": "nevertried",
        "text": "Never tried to quit before"
      }
    ]
  }
]

const planSteps = [
  {
    intro: "You’re more likely to quit successfully with the right support. Using your willpower is important but you'll increase you're chances of success if you get some additional support. Find out the best quit way for you to quit below.",
    recommendations: []
  },
  {
    title: "Find face-to-face support",
    intro: "Getting expert support will boost your chances of quitting.",
    recommendations: [
      {
        id: "lsss",
        title: "Local stop smoking service",
        body: "<p>The trained advisers at your local stop smoking service will give you expert support and advice, including what prescription medicines might be right for you.<p><p>Your local pharmacist and your GP can also give you loads of advice and support to help you quit.</p>",
        iconURL: ""
      },
      {
        id: "pharmacist",
        title: "Chat to your pharmacist",
        body: "<p>Your local pharmacist can give you loads of advice and tips to help you quit for good, including what prescription medicines might be right for you. Your GP can also provide lots of support. Or, you could get expert help from a trained adviser at your local stop smoking service.</p>",
        iconURL: ""
      },
      {
        id: "medicalexpert",
        title: "Talk to a health professional",
        body: "<p>Your pharmacist and GP can give you loads of advice and tips to help you quit, including what prescription medicines might be right for you. Or, you could get expert help from a trained adviser at your local stop smoking service.</p>",
        iconURL: ""
      }
    ]
  },
  {
    title: "Curb cravings with a combination",
    intro: "Combine long-lasting and fast-acting products for the most effective way to control your nicotine cravings.",
    recommendations: [
      {
        id: "ecigsused",
        title: "E-cigarettes or vapes",
        body: "<p>These are fast-acting and can really help you manage your nicotine cravings and they are at least 95% less harmful than cigarettes. As you've used these before, it might be worth adjusting your nicotine levels or trying a different model. Find out more about vapes or e-cigarettes [LINK TO NEW ARTICLE]. Your local specialist vape shop can find the right one for you. [Link to IBVA finder].</p>",
        iconURL: ""
      },
      {
        id: "ecigsnotused",
        title: "E-cigarettes or vapes",
        body: "<p>These are fast-acting and can really help you manage your nicotine cravings and they are at least 95% less harmful than cigarettes. Find out more about vapes or e-cigarettes [LINK TO NEW ARTICLE]. Your local specialist vape shop can find the right one for you. [Link to IBVA finder].</p>",
        iconURL: ""
      },
      {
        id: "patchesusedhigh",
        title: "Patches + Inhaler or Spray",
        body: "<p>You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine them. It's important to use 2 different types of product as it will make it easier. Patches will deliver nicotine to your body throughout the day and an inhaler or spray will provide immediate relief from cravings.</p>",
        iconURL: ""
      },
      {
        id: "patchesnotusedhigh",
        title: "Patches + Inhaler or Spray",
        body: "<p>Nicotine Replacement Therapies [LINK TO NEW ARTICLE] will help you manage your nicotine cravings. They are most effective when you combine 2 different types of product. Patches will deliver nicotine to your body throughout the day and an inhaler or spray will provide immediate relief from cravings.</p>",
        iconURL: ""
      },
      {
        id: "patchesusedmedium",
        title: "Patches + Lozenge or Strips",
        body: "<p>You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine them. It's important to use 2 different types of product as it will make it easier. Patches will deliver nicotine to your body throughout the day and lozenges or strips will provide immediate relief from cravings.</p>",
        iconURL: ""
      },
      {
        id: "patchesnotusedmedium",
        title: "Patches + Lozenge or Strips",
        body: "<p>Nicotine Replacement Therapies [LINK TO NEW ARTICLE] will help you manage your nicotine cravings. They are most effective when you combine 2 different types of product. Patches will deliver nicotine to your body throughout the day and lozenges or strips will provide immediate relief from cravings.</p>",
        iconURL: ""
      },
      {
        id: "patchesusedlow",
        title: "Patches + gum",
        body: "<p>You may have tried Nicotine Replacement Therapies [LINK TO NEW ARTICLE] before, they help you manage your nicotine cravings, but they are most effective when you combine 2 different types of product.  Patches will deliver nicotine to your body throughout the day and gum will provide immediate relief from cravings.</p>",
        iconURL: ""
      },
      {
        id: "patchesnotusedlow",
        title: "Patches + gum",
        body: "<p>Nicotine Replacement Therapies [LINK TO NEW ARTICLE] can help you quit. They help you manage your nicotine cravings, but they are most effective when you combine 2 different types of product. Patches will deliver nicotine to your body throughout the day and gum will provide immediate relief from cravings.</p>",
        iconURL: ""
      }
    ]
  },
  {
    title: "Get free support tools",
    intro: "Try our range of free support tools to help keep you on track for the first 28 days - stay smokefree this long and you're 5 times as likely to quit smoking for good.",
    recommendations: [
      {
        id: "app",
        title: "Download the app",
        body: "<p>Track your progress, see how much you're saving and get daily support wherever you are. Download the app [Link to apps page]</p>",
        iconURL: ""
      },
      {
        id: "emailsupport",
        title: "Get daily email support",
        body: "<p>Stay focused with quitting advice and tips straight to your inbox throughout your 28-day journey! Get the email</p>",
        iconURL: ""
      },
      {
        id: "facebook",
        title: "Chat to us on Facebook",
        body: "<p>Chat to us on Facebook Messenger for instant support when you've got a craving. You can also join in the conversation on the Stoptober Facebook page [Link to Facebook page]. We're here to help you quit! Chat now [if user already has messenger] Download Messenger [if user needs to download messenger]</p>",
        iconURL: ""
      }
    ]
  }
]

// functions that take a copy of the mobx-state-tree store and return a string
const planTemplates = {
  planIntro: store =>
    `You’re more likely to quit successfully with the right support. ${ store.usedWillpowerAlone ? "Using your willpower is important but you'll increase you're chances of success if you get some additional support. " : ""} Find out the best quit way for you to quit below.`,
}

export { questions, planSteps, planTemplates }
