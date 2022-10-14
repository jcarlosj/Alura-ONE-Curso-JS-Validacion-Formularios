import { AGE_TO_BE_OLDER } from './constants.js';
import { showErrorMessage } from './errors.js';


const fieldValidators = {
    "input-birth": ( input ) => validateDate( input )
}

export function validateDataSet( input ) {
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

function validateDate( input ) {
    const dateValue = input.value;
    let message = '';

    if( isOlder( new Date( dateValue ) ) )
        message = `Debes tener al menos ${ AGE_TO_BE_OLDER }  años de edad.`;

    // setCustomValidity: define el mensaje de validación personalizado para el elemento seleccionado con el mensaje especifico
    input.setCustomValidity( message );

}

function isOlder( userDate ) {
    const
        currentDate = new Date(),
        userDatePlus18Years = new Date(
            userDate.getUTCFullYear() + AGE_TO_BE_OLDER,
            userDate.getUTCMonth(),
            userDate.getUTCDate()
        );
        
    return currentDate < userDatePlus18Years;
}