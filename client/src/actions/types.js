export const FETCH_USER = 'fetch_user';
export const FETCH_SURVEYS = 'fetch_surveys'; // making a new type "fETCH_SURVEY";

// after this make an action creater that will make network request to the backend, will get the list of surveys,
//it will return or say dispatch an action of type "FETCH_USER"
//it will be up to us to create a new reducer to catch the data that is being captured by that request
// hello this is the change