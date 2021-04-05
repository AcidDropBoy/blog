export const getArticles = (articles) => ({ type: 'GET_ARTICLES', articles });
export const getArticle = (article) => ({ type: 'GET_ARTICLE', article });
export const getUser = (user) => ({ type: 'GET_USER', user });
export const loadArticle = () => ({ type: 'LOAD_ARTICLE' });
export const loadArticles = () => ({ type: 'LOAD_ARTICLES' });
export const setPagination = (page) => ({ type: 'SET_PAGINATION', page });
export const Login = () => ({ type: 'LOGIN' });
export const Logout = () => ({ type: 'LOGOUT' });