const key = 'wu9XZ9FNAh&xB%Ta&w4lRR2198gL!td!xk';

 function generador(length = 10){
    let result = '';
    for (let i = 0; i <= length; i++) {
        result += key.charAt(Math.floor(Math.random() * key.length));
        
    }
    return result;
}

const pass = generador(20);

export default pass;