export const setTokenAction = (token_from_login) => ({
  type: "SET_TOKEN",
  payload: token_from_login,
});

export const loadingAction = (true_or_false_loading) => ({
  type: "LOADING",
  payload: true_or_false_loading,
});

export const authorizeAction = (true_or_false_authorized) => ({
  type: "AUTHORIZE",
  payload: true_or_false_authorized,
});
