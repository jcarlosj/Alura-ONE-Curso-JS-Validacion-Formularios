const $inputs = document.querySelectorAll( 'input' );
const ageToBeOlder = 18

console.log( $inputs );

$inputs.forEach( input => {
    input.addEventListener( 'blur', event => {
        validateDataSet( event.target );       // Valida si la fecha del usuario pertenece a un mayor de edad
    });
});

const fieldValidators = {
    "input-birth": ( input ) => validateDate( input )
}

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
        customError: `Debes tener al menos ${ ageToBeOlder } años de edad`
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


function validateDataSet( input ) {
    const typeInput = input.dataset.type;

    console.log( input.validity );

    // Valida si el tipo de campo a validar existe
    if( fieldValidators[ typeInput ] )
        fieldValidators[ typeInput ] ( input );

    // Valida si el valor del campo es valido
    if( input.validity.valid ) {
        input.parentElement.classList.remove( 'input-container--invalid' );
        input.parentElement.querySelector( '.input-message-error' ).innerHTML = '';
    }
    else {
        input.parentElement.classList.add( 'input-container--invalid' );
        input.parentElement.querySelector( '.input-message-error' ).innerHTML = showErrorMessage( typeInput, input );
    }

}

function showErrorMessage( typeInput, input ) {
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


function validateDate( input ) {
    const
        dateValue = input.value,
        message = '';

    console.log( `validateDate!` );

    if( isOlder( new Date( dateValue ) ) )
        message = `Debes tener al menos ${ ageToBeOlder } años de edad.`;

    // setCustomValidity: define el mensaje de validación personalizado para el elemento seleccionado con el mensaje especifico
    input.setCustomValidity( message );

}

function isOlder( userDate ) {
    const
        currentDate = new Date(),
        userDatePlus18Years = new Date(
            userDate.getUTCFullYear() + ageToBeOlder,
            userDate.getUTCMonth(),
            userDate.getUTCDate()
        );
        
    return currentDate < userDatePlus18Years;
}