const APF_KEY = 'apf_contact';
const ACTION_PLAN_KEY = 'action_plan';
const BASKET_KEY = 'basket';

export function signUpForActionPlan() {
  const submission = JSON.parse(sessionStorage.getItem(APF_KEY));
  submission['ProductToken'] = "3D149395-F755-4586-BA8A-E4F915B023AD";
  const selectedItems = JSON.parse(sessionStorage.getItem(ACTION_PLAN_KEY));
  const itemKeys = JSON.parse(sessionStorage.getItem(BASKET_KEY));
  let userItems = [];
  itemKeys.map((key) =>
    userItems.push({'ActionId': '' + selectedItems[key].paragon_id, 'Selected': true})
  )
  submission['UserItems'] = userItems;

  return fetch('https://api-live-mentalhealth.paragon-cc.co.uk/api/Actions/AddUserRecord', {
      method: 'POST',
      headers : {
        "Authorization": "cGFyYWdvbi1jYzoyNEVFM0ExMi0wM0U4LTQ5OTYtQkIwOS1DMzM1NzNFNUU5RUE=",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submission)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
