import { useDispatch } from 'react-redux';
import i18n from '../../../../i18n/i18n';
import { changeLang } from '../../../../store/reducers/localeSlice';
import { debugLog } from '../../../../utils/debug';
import { store } from '../../../../store';

export const useLanguageSwitch = () => {
  const dispatch = useDispatch();

  const switchToArabic = () => {
    i18n.changeLanguage("ar");
    document.documentElement.setAttribute("lang", "ar");
    document.documentElement.setAttribute("dir", "rtl");
    dispatch(changeLang({ dir: "rtl", lang: "ar" }));
    debugLog(store.getState().locale);
  };

  const switchToEnglish = () => {
    i18n.changeLanguage("en");
    document.documentElement.setAttribute("lang", "en");
    document.documentElement.setAttribute("dir", "ltr");
    dispatch(changeLang({ dir: "ltr", lang: "en" }));
  };

  return {
    switchToArabic,
    switchToEnglish,
  };
};
