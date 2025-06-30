
const PROFILE_KEY = "user_profile";

/**
 * کل آبجکت پروفایل را به صورت یک رشته JSON در localStorage ذخیره می‌کند.
 * @param {object} profileData - آبجکتی شامل تمام اطلاعات پروفایل.
 */
export const setProfile = (profileData) => {
  if (typeof window !== "undefined") {
    // فقط آبجکت‌های غیر نال را ذخیره می‌کنیم تا از خطا جلوگیری شود
    if (profileData && typeof profileData === 'object') {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profileData));
    }
  }
};

/**
 * آبجکت پروفایل را از localStorage بازیابی و به صورت آبجکت جاوااسکریپت برمی‌گرداند.
 * @returns {object | null} - آبجکت پروفایل یا در صورت عدم وجود، null.
 */
export const getProfile = () => {
  if (typeof window !== "undefined") {
    const profileString = localStorage.getItem(PROFILE_KEY);
    try {
      return profileString ? JSON.parse(profileString) : null;
    } catch (e) {
      console.error("Failed to parse profile data from localStorage", e);
      return null;
    }
  }
  return null;
};

/**
 * اطلاعات پروفایل را از localStorage حذف می‌کند.
 */
export const removeProfile = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(PROFILE_KEY);
  }
};