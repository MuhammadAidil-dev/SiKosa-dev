import { Router } from "express";
import { getAllPsychologist, getDoctorProfile } from "../controllers/user.controller";

const publicRoutes = Router();

publicRoutes.get("/psikolog/all", getAllPsychologist);
publicRoutes.get("/psikolog/:id", getDoctorProfile);

export default publicRoutes;
