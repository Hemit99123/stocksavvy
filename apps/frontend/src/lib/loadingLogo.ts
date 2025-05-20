export const setLoadingState = (value: string) => {
  document.cookie = `loading_state=${encodeURIComponent(value)}; path=/; max-age=600; ${
    import.meta.env.MODE === 'production' ? 'Secure;' : ''
  }`;
};

export const getLoadingState = () => {
  const match = document.cookie.match(/(?:^|;\s*)loading_state=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};
