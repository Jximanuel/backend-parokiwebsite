import mongoose, { Schema, Document } from "mongoose";

export interface IJadwal extends Document {
  namaJadwal: string;
  tanggal: Date;
  jam: string;
  imageUrl?: string;
  imagePublicId?: string;
}

const JadwalParokiSchema = new Schema<IJadwal>(
  {
    namaJadwal: {
      type: String,
      required: true,
    },

    tanggal: {
      type: Date,
      required: true,
    },

    jam: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    imagePublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IJadwal>(
  "JadwalParoki",
  JadwalParokiSchema
);
