import express from 'express';
import { paginaInicio, 
        paginaNosotros, 
        paginaViajes, 
        paginaTestimoniales, 
        paginaDetalladaViaje 
} from '../controllers/pagController.js';
import {
        guardarTestimonial
} from '../controllers/testimonialController.js'

const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:viaje', paginaDetalladaViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;