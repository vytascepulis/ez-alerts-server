import { model, Schema } from 'mongoose';

const defaultSettings = {
  text: {
    content: 'Your alert text',
    specialColor: '#5746f0',
  },
  display: {
    duration: 5000,
    animationIn: 'fade-in',
    animationOut: 'fade-out',
  },
  audio: {
    volume: 80,
    base64: 'audioBase64',
  },
  image: {
    base64: 'imageBase64',
  },
  useProductImages: false,
};

interface IUser {
  uuid: string;
  registeredAt: Date;
  shopDomain: string;
  isBlocked: boolean;
  settings: {
    text: {
      content: string;
      specialColor: string;
    };
    display: {
      duration: number;
      animationIn: string;
      animationOut: string;
    };
    audio: {
      volume: number;
      base64: string;
    };
    image: {
      base64: string;
    };
    useProductImages: boolean;
  };
}

interface CreateUserProps {
  uuid: string;
  shopDomain: string;
}

const userSchema = new Schema<IUser>({
  uuid: String,
  registeredAt: Date,
  shopDomain: String,
  isBlocked: Boolean,
  settings: {
    text: {
      content: String,
      specialColor: String,
    },
    display: {
      duration: Number,
      animationIn: String,
      animationOut: String,
    },
    audio: {
      volume: Number,
      base64: String,
    },
    image: {
      base64: String,
    },
    useProductImages: Boolean,
  },
});

const UserModel = model<IUser>(
  'User',
  userSchema,
  process.env.MONGODB_USERS_COLLECTION,
);

const createNewUser = ({ uuid, shopDomain }: CreateUserProps) => {
  return new UserModel({
    uuid,
    shopDomain,
    isBlocked: false,
    registeredAt: Date.now(),
    settings: {
      ...defaultSettings,
    },
  });
};

export { UserModel, createNewUser, IUser };
