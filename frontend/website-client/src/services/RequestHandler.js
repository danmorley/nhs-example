const APF_KEY = 'apf_contact';
const ACTION_PLAN_KEY = 'action_plan';

export function signUpForActionPlan() {
  const submission = JSON.parse(sessionStorage.getItem(APF_KEY));
  submission['ProductToken'] = "3D149395-F755-4586-BA8A-E4F915B023AD";
  submission['UserItems'] = JSON.parse(sessionStorage.getItem(ACTION_PLAN_KEY));

  return fetch('https://api-test-mentalhealth.cc-testing.co.uk/api/Actions/AddUserRecord', {
      method: 'POST',
      headers : {
        "Authorization": "paragon-cc:24EE3A12-03E8-4996-BB09-C33573E5E9EA",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(submission)
    })
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}
