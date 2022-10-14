import { validateDataSet } from './validate.js';

export const ageToBeOlder = 18;

const $inputs = document.querySelectorAll( 'input' );

// console.log( $inputs );

$inputs.forEach( input => {
    input.addEventListener( 'blur', event => {
        validateDataSet( event.target );       // Valida si la fecha del usuario pertenece a un mayor de edad
    });
});
