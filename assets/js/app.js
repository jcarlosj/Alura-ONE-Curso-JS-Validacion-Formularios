const $inputs = document.querySelectorAll( 'input' );
const ageToBeOlder = 18

console.log( $inputs );

$inputs.forEach( input => {
    input.addEventListener( 'blur', event => {
        validateDate( event.target );       // Valida si la fecha del usuario pertenece a un mayor de edad
    });
});


function validateDataSet( element ) {
    const type = element.dataset.type;

    // Valida si el tipo de campo a validar existe
    if( fieldValidators[ type ] )
        fieldValidators[ type ] ( element );

}

const fieldValidators = {
    "input-birth": ( element ) => validateDate( element )
}

function validateDate( inputElement ) {
    const
        dateValue = inputElement.value
        message = '';

    if( isOlder( new Date( dateValue ) ) )
        message = `Debes tener al menos ${ ageToBeOlder } años de edad.`;

    // setCustomValidity: define el mensaje de validación personalizado para el elemento seleccionado con el mensaje especifico
    inputElement.setCustomValidity( message );

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