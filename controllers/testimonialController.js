import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    // Validación desde el servidor
    const { nombre, correo, mensaje } = req.body;
    const errores = [];
    if(nombre.trim() === ''){
        errores.push({mensaje: 'Nombre vacío'});
    } else if (correo.trim() === '') {
        errores.push({mensaje: 'Correo vacío'});
    } else if (mensaje.trim() === '') {
        errores.push({mensaje: 'Mensaje vacío'});
    }

    if(errores.length > 0) {
        //Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        //Mostrar vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        // Almacenarlo en la base de datos
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });

            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
};

export {
    guardarTestimonial
}