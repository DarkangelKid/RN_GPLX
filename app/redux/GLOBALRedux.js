export const types = {
  MAIN_INIT_APP: 'MAIN_INIT_APP',
  MAIN_LOAD_DATA: 'MAIN_LOAD_DATA',
  MAIN_LOAD_EXAM: 'MAIN_LOAD_EXAM',
  MAIN_SET_LICENSE: 'MAIN_SET_LICENSE',
};

export const actions = {
  isInitApp: (payload) => {
    return {
      type: types.MAIN_INIT_APP,
      payload,
    };
  },
  isLoadData: (payload) => {
    return {
      type: types.MAIN_LOAD_DATA,
      payload,
    };
  },
  isLoadExam: (payload) => {
    return {
      type: types.MAIN_LOAD_EXAM,
      payload,
    };
  },
  setLicense: (payload) => {
    return {
      type: types.MAIN_SET_LICENSE,
      payload,
    };
  },
};

const initialState = {
  initapp: false,
  loaddata: false,
  loadexam: false,
  check_license: -1,
};

export const reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case types.MAIN_INIT_APP:
      return {...state, initapp: payload};
    case types.MAIN_LOAD_DATA:
      return {...state, loaddata: payload};
    case types.MAIN_LOAD_EXAM:
      return {...state, loadexam: payload};
    case types.MAIN_SET_LICENSE:
      return {...state, check_license: payload};
    default:
      return state;
  }
};
