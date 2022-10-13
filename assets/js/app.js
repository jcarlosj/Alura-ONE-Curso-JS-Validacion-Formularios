const $inputBirth = document.querySelector( '[data-birth]' );
const ageToBeOlder = 18


$inputBirth.addEventListener( 'blur', event => {
    
    // Valida si la fecha del usuario pertenece a un mayor de edad
    validateDate( event.target );
});

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