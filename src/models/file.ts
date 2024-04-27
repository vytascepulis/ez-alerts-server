import { model, Schema } from 'mongoose';

interface IFile {
  uuid: string;
  products: {
    id: number;
    url: string;
  }[];
}

interface CreateFileProps {
  uuid: string;
}

const fileSchema = new Schema<IFile>({
  uuid: String,
  products: [{ id: Number, url: String }],
});

const FileModel = model<IFile>(
  'File',
  fileSchema,
  process.env.MONGODB_FILES_COLLECTION,
);

const createNewFile = ({ uuid }: CreateFileProps) => {
  return new FileModel({
    uuid,
    products: [],
  });
};

export { FileModel, createNewFile, IFile };
