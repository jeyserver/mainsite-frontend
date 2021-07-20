import {
  TOGGLE_THEME,
  GET_THEME_FROM_LOCALSTORAGE,
} from '../constants/actionsConstants';

let initialState = {
  theme: 'light',
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_THEME_FROM_LOCALSTORAGE:
      const localTheme = localStorage.getItem('theme');
      if (localTheme === 'dark') {
        const blogPostDiv = document.querySelector('#blog-post');
        const blogCategory = document.querySelector('#blog-category');

        if (blogPostDiv) {
          blogPostDiv.classList.add('dark');
        }
        if (blogCategory) {
          blogCategory.classList.add('dark');
        }

        return {
          theme: localTheme,
        };
      } else {
        return {
          theme: 'light',
        };
      }
    case TOGGLE_THEME:
      const blogPostDiv = document.querySelector('#blog-post');
      const blogCategory = document.querySelector('#blog-category');

      if (state.theme === 'light') {
        if (blogPostDiv) {
          blogPostDiv.classList.add('dark');
        }
        if (blogCategory) {
          blogCategory.classList.add('dark');
        }

        localStorage.setItem('theme', 'dark');

        return { ...state, theme: 'dark' };
      } else {
        if (blogPostDiv) {
          blogPostDiv.classList.toggle('dark');
        }
        if (blogCategory) {
          blogCategory.classList.toggle('dark');
        }

        localStorage.setItem('theme', 'light');

        return { ...state, theme: 'light' };
      }
    default:
      return state;
  }
};

export default themeReducer;
