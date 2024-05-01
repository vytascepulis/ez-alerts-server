import { IUser } from '../models/user';

const formatSettings = (settings: IUser['settings']) => ({
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
    fileName: settings.audio.fileName,
    volume: settings.audio.volume,
    base64: settings.audio.base64,
  },
  image: {
    fileName: settings.image.fileName,
    base64: settings.image.base64,
  },
  useProductImages: settings.useProductImages,
});

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

const formatSettingsFull = (data: IUser) => ({
  isBlocked: data.isBlocked,
  settings: data.settings,
  uuid: data.uuid,
});

export { formatSettings, formatGetSettings, formatSettingsFull };
