export default class Api {
  static url = 'https://conduit.productionready.io/api';

  static getToken(token) {
    const headers = token
      ? {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        }
      : {
          'Content-Type': 'application/json;charset=utf-8',
        };
    return headers;
  }

  static GET_TOKEN(token) {
    return { method: 'GET', headers: Api.getToken(token) };
  }

  static POST(body) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    };
  }

  static POST_TOKEN(token) {
    return {
      method: 'POST',
      headers: Api.getToken(token),
    };
  }

  static POST_TOKEN_BODY(body, token, method) {
    return {
      method,
      headers: Api.getToken(token),
      body: JSON.stringify(body),
    };
  }

  static DELETE(token) {
    return {
      method: 'DELETE',
      headers: Api.getToken(token),
    };
  }

  static async getResource(url, obj) {
    const res = await fetch(url, obj);
    const result = await res.json();
    return result;
  }

  static async userRegistration(url, obj) {
    return Api.getResource(Api.url + url, Api.POST(obj));
  }

  static async userAuthentication(url, obj) {
    return Api.getResource(Api.url + url, Api.POST(obj));
  }

  static async updateUser(url, obj, token) {
    return Api.getResource(Api.url + url, Api.POST_TOKEN_BODY(obj, token, 'PUT'));
  }

  static async likeArticle(url, token, slug) {
    return Api.getResource(`${Api.url + url}/${slug}/favorite`, Api.POST_TOKEN(token));
  }

  static async dislikeArticle(url, token, slug) {
    return Api.getResource(`${Api.url + url}/${slug}/favorite`, Api.DELETE(token));
  }

  static async getArticles(page, token, author) {
    const countPage = (page - 1) * 5;
    if (author) {
      return Api.getResource(`${Api.url}/articles?limit=5&offset=${countPage}&author=${author}`, Api.GET_TOKEN(token));
    }
    return Api.getResource(`${Api.url}/articles?limit=5&offset=${countPage}`, Api.GET_TOKEN(token));
  }

  static async getArticle(slug, token) {
    return Api.getResource(`${Api.url}/articles/${slug}`, Api.GET_TOKEN(token));
  }

  static async createArticle(url, obj, token) {
    return Api.getResource(Api.url + url, Api.POST_TOKEN_BODY(obj, token, 'POST'));
  }

  static async updateArticle(url, obj, token, slug) {
    return Api.getResource(`${Api.url + url}/${slug}`, Api.POST_TOKEN_BODY(obj, token, 'PUT'));
  }

  static async deleteArticle(url, slug, token) {
    return Api.getResource(`${Api.url + url}/${slug}`, Api.DELETE(token));
  }
}
