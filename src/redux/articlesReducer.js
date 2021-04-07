const defaultState = {
  articles: [],
  article: {},
  articleLoad: false,
  loadingArticles: false,
  pageNumber: 1,
};

const articlesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'GET_ARTICLES':
      return { ...state, articles: action.articles, loadingArticles: true };
    case 'GET_ARTICLE':
      return { ...state, article: action.article, articleLoad: true };
    case 'LOAD_ARTICLE':
      return { ...state, articleLoad: false };
    case 'LOAD_ARTICLES':
      return { ...state, loadingArticles: false };
    case 'SET_PAGINATION':
      return { ...state, pageNumber: action.page, loadingArticles: false };
    default:
      return state;
  }
};

export default articlesReducer;
