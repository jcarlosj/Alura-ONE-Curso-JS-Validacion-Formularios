const $inputs = document.querySelectorAll( 'input' );
const ageToBeOlder = 18

console.log( $inputs );

$inputs.forEach( input => {
    input.addEventListener( 'blur', event => {
        validateDataSet( event.target );       // Valida si la fecha del usuario pertenece a un mayor de edad
    });
});


function validateDataSet( input ) {
    const type = input.dataset.type;

    console.log( input.validity );

    // Valida si el tipo de campo a validar existe
    if( fieldValidators[ type ] )
        fieldValidators[ type ] ( input );

    // Valida si el valor del campo es valido
    if( input.validity.valid )
        input.parentElement.classList.remove( 'input-container--invalid' );
    else
        input.parentElement.classList.add( 'input-container--invalid' );

}

const fieldValidators = {
    "input-birth": ( input ) => validateDate( input )
}

function validateDate( input ) {
    const
        dateValue = input.value
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