import * as Yup from "yup"
import { Request, Response } from "express"
import mongoose from "mongoose"
import jadwalModels from "../models/jadwal.models"


const jadwalValidate  = Yup.object().shape({
    namaJadwal: Yup.string().required(),
    tanggal : Yup.string().required(),
    jam : Yup.string().required(),
    
}) 

export default {
    async buatJadwal (req: Request, res: Response){
       try {
         await jadwalValidate.validate(req.body, { abortEarly: false})


         const { namaJadwal, tanggal, jam} = req.body

         if(!req.file){
            return res.json({ msg: "masukan gambar"})

         }

         const imageUrl  = req.file.path
         const imagePublicId = req.file.filename


         const create = await jadwalModels.create({
            namaJadwal,
            tanggal,
            jam,
            imageUrl,
            imagePublicId

         })

         return res.status(200).json({ msg: "jadwal berhasil diupload", data: create})

       } catch (error) {
          return res.status(400).json({ msg: "jadwal gagal diupload", error: error})
       }

    },

    async getAllJadwal ( req: Request , res: Response,) {
      try {
         const getAll = await jadwalModels.find().sort({tanggal : 1})
         if(!getAll){
            return res.status(400).json ({msg: "belum ada jadwal"})
         }

         return res.status(200).json({
            msg: "data berhasil dibaca",
            data: getAll,
            total : getAll.length
         })
      } catch (error) {
         return res.status(400).json ({msg: "gagal memuat jadwal"})
      }
    },


   async deleteJadwal (req : Request, res: Response){
      try {
         const deleteJadwal = await jadwalModels.findByIdAndDelete(req.params.id)
         if(!deleteJadwal) {
            return res.status(400).json({ msg: "data tidak ditemukan"})
         }

         return res.status(200).json({msg: "data berhasil dihapus"})
        
      } catch (error) {
         return res.status(400).json ({msg: "gagal menghapus jadwal"})
      }
   },


   async uppdateJadwal(req: Request, res: Response) { 
  try {
    await jadwalValidate.validate(req.body, { abortEarly: false });

    const { namaJadwal, tanggal, jam } = req.body;

    if (!req.file) {
      return res.status(400).json({ msg: "gambar harus diupload" });
    }

    const updateData: any = {
      namaJadwal,
      tanggal,
      jam,
      imageUrl: req.file.path,
      imagePublicId: req.file.filename
    };

    const updated = await jadwalModels.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "data tidak ditemukan" });
    }

    return res.status(200).json({
      msg: "jadwal berhasil diupdate",
      data: updated
    });

  } catch (error) {
    return res.status(500).json({
      msg: "server error",
      error
    });
  }
   }

}