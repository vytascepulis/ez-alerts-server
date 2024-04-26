import { IUser } from '../models/user';

const formatPutSettings = (settings: IUser['settings']) => {
  const newSettings = {
    text: {
      content: settings.text.content,
      specialColor: settings.text.specialColor,
    },
    display: {
      duration: settings.display.duration,
      animationIn: settings.display.animationIn,
      animationOut: settings.display.animationOut,
    },
    audio: {
      volume: settings.audio.volume,
      base64: settings.audio.base64,
    },
    image: {
      base64: settings.image.base64,
    },
    useProductImages: settings.useProductImages,
  };

  return newSettings;
};

const formatGetSettings = (settings: IUser['settings']) => ({
  text: {
    specialColor: settings.text.specialColor,
  },
  display: {
    duration: settings.display.duration,
    animationIn: settings.display.animationIn,
    animationOut: settings.display.animationOut,
  },
  audio: {
    volume: settings.audio.volume,
    base64: settings.audio.base64,
  },
});

const formatGetSettingsFull = (settings: IUser['settings']) => ({
  text: {
    content: settings.text.content,
    specialColor: settings.text.specialColor,
  },
  display: {
    duration: settings.display.duration,
    animationIn: settings.display.animationIn,
    animationOut: settings.display.animationOut,
  },
  audio: {
    volume: settings.audio.volume,
    base64: settings.audio.base64,
  },
  image: {
    base64: settings.image.base64,
  },
  useProductImages: settings.useProductImages,
});

export { formatPutSettings, formatGetSettings, formatGetSettingsFull };
