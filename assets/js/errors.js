import { AGE_TO_BE_OLDER } from './constants.js';


const typeErrors = [ 'valueMissing', 'typeMismatch', 'patternMismatch', 'customError' ];

const errorMessages = {
    'input-name': {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    'input-email': {
        valueMissing: 'El campo email no puede estar vacio',
        typeMismatch: 'El correo no es válido'
    },
    'input-password': {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMissing: 'El campo contraseña debe tener entre 6 a 12 caracteres, debe contener una letra minúscula, una mayúscula, un número, NO puede contener caracteres especiales.'
    },
    'input-birth': {
        valueMissing: 'El campo fecha nacimiento no puede estar vacio',
        customError: `Debes tener al menos ${ AGE_TO_BE_OLDER } años de edad`
    },
    'input-phone': {
        valueMissing: 'El campo teléfono no puede estar vacio'
    },
    'input-address': {
        valueMissing: 'El campo dirección no puede estar vacio'
    },
    'input-city': {
        valueMissing: 'El campo ciudad no puede estar vacio'
    },
    'input-state': {
        valueMissing: 'El campo estado no puede estar vacio'
    }
}


export function showErrorMessage( typeInput, input ) {
    let message = '';

    console.group( `type: ${ typeInput }` );

    /** Itera todos los tipos de errores que hemos considerado */
    typeErrors.forEach( typeError => {
        // console.log( `${ typeError }: ${ input.validity[ typeError ] }` );                                              // Mostrará todos los tipos de errores y sus errores
        console.log( `${ input.validity[ typeError ] ? `${ typeError }: ${ input.validity[ typeError ] }` : '' }` );    // Mostrará solo los tipos de errores que contiene el elemento

        // Verifica si existe este tipo de error en el elemento input
        if( input.validity[ typeError ] )
            message = errorMessages[ typeInput ][ typeError ];

    });

    console.groupEnd();

    return message;
}