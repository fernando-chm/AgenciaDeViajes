import { Viajes } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (solicitud, respuesta) => {
    //Consultar 3 viajes del modelo de Viaje

    const promiseDB = [];
    promiseDB.push( Viajes.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll() );

    try {
        const resultadoPromise = await Promise.all(promiseDB);
        respuesta.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultadoPromise[0],
            testimoniales: resultadoPromise[1]
        });
    } catch (error) {
        console.log(error);
    }
};

const paginaNosotros = (solicitud, respuesta) => {
    respuesta.render('nosotros', {
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (solicitud, respuesta) => {
    //Consultar BD
    const viajes = await Viajes.findAll();

    respuesta.render('viajes', {
        pagina: 'Viajes',
        viajes
    });
};

const paginaTestimoniales = async (solicitud, respuesta) => {
    try {
        const testimoniales = await Testimonial.findAll();
        respuesta.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
};

// Mostrar pagina detallada de cada viaje por slug
const paginaDetalladaViaje = async (req, res) => {
    const { viaje } = req.params;

    try {
        const resultado = await Viajes.findOne({ where: { slug: viaje } });
        // console.log(resultado)
        res.render('viaje', {
            pagina: 'Información sobre el Viaje',
            resultado
        })
    } catch (error) {
        console.log(error)
    }
};

export {
    paginaInicio, 
    paginaNosotros, 
    paginaViajes, 
    paginaTestimoniales,
    paginaDetalladaViaje
}