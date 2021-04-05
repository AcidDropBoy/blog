const defaultState = {
  articles: [],
  article: {},
  user: {},
  articleLoad: false,
  loadingArticles: false,
  pageNumber: 1,
  loginUser: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return { ...state, articles: action.articles, loadingArticles: true };
    case 'GET_ARTICLE':
      return { ...state, article: action.article, articleLoad: true };
    case 'GET_USER':
      return { ...state, user: action.user };
    case 'LOAD_ARTICLE':
      return { ...state, articleLoad: false };
    case 'LOAD_ARTICLES':
      return { ...state, loadingArticles: false };
    case 'SET_PAGINATION':
      return { ...state, pageNumber: action.page, loadingArticles: false };
    case 'LOGIN':
      return { ...state, loginUser: true };
    case 'LOGOUT':
      return { ...state, loginUser: false };
    default:
      return state;
  }
};

export default reducer;
