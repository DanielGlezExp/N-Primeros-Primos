
'use strict';

const {performance} = require('perf_hooks');

/**
 * Esta función comprueba si los argumetos por línea de comandos son correctos
 * @return {boolean} True if command line arguments are valid. False otherwise
 */
const comrpobarArgumentos = () => {
  const AMOUNT_OF_ARGUMENTS = 3;
  if (process.argv.length === AMOUNT_OF_ARGUMENTS) {
    const FIRST_ARGUMENT = parseInt(process.argv[2]);
    if (isNaN(FIRST_ARGUMENT)) {
      console.log('ERROR. Formato incorrecto del primer argumento');
      return false;
    } else if (FIRST_ARGUMENT <= 0) {
      console.log('ERROR. El argumento dado debe ser un entero ' +
          'mayor que 0');
      return false;
    }
    return true;
  } else {
    console.log('ERROR. Este programa necesita al menos un argumento');
    console.log('Este programa mostrara los primeros n primos' + 
        ' (n is el argumento dado por línea de comandos) usando diferentes metodos');
    return false;
  }
}


/**
 * Esta funcion comprueba si un numero es primo, recorriendo desde 2 hasta n
 * @param {number} numeroAnalizar - El numero que queremos saber si es primo
 * @return {boolean} True si el numero es primo. False en caso contrario
 */
const esPrimo = (numeroAnalizar, arrayPrimosCalculados) => {
  const maxPossibleDivisor = numeroAnalizar;
  for (let numeroActual = 2; numeroActual < maxPossibleDivisor; numeroActual++) {
    if ((numeroAnalizar % numeroActual) === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Esta funcion comprueba si un numero es primo, recorriendo desde 2 hasta raiz de n
 * @param {number} numeroAnalizar - El numero que queremos saber si es primo
 * @return {boolean} True si el numero es primo. False en caso contrario
 */
const esPrimoRaiz = (numeroAnalizar, arrayPrimosCalculados) => {
  const maxPossibleDivisor = Math.sqrt(numeroAnalizar);
  for (let numeroActual = 2; numeroActual <= maxPossibleDivisor; numeroActual++) {
    if ((numeroAnalizar % numeroActual) === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Esta funcion comprueba si un numero es primo, recorriendo desde 2 hasta raiz de n (solo los primos)
 * @param {number} numeroAnalizar - El numero que queremos saber si es primo
 * @return {boolean} True si el numero es primo. False en caso contrario
 */
const esPrimoDinamico = (numeroAnalizar, arrayPrimosCalculados) => {
  const maxPossibleDivisor = Math.sqrt(numeroAnalizar);
  for (let indiceActual = 0; arrayPrimosCalculados[indiceActual] <= maxPossibleDivisor; indiceActual++) {
    if ((numeroAnalizar % arrayPrimosCalculados[indiceActual]) === 0) {
      return false;
    }
  }
  return true;
}



/**
 * Este metodo usa process.stdout.write para mostrar 
 * los primeros cantidadPrimos primos
 * @param {number} cantidadPrimos - Cantidad de primos para enseñar
 * @return {undefined} 
 */
const mostrarPrimos = (cantidadPrimos) => {
  let arrayPrimosCalculados = [ ];
  let numeroActual = 2;
  while (cantidadPrimos > 0) {
    if (esPrimo(numeroActual)) {
      arrayPrimosCalculados.push(numeroActual);
      cantidadPrimos--;
    }
    numeroActual++;
  }
  //console.log(arrayPrimosCalculados);
}

/**
 * Este metodo usa process.stdout.write para mostrar 
 * los primeros cantidadPrimos primos (raiz)
 * @param {number} cantidadPrimos - Cantidad de primos para enseñar
 * @return {undefined} 
 */
const mostrarPrimosRaiz = (cantidadPrimos) => {
  let arrayPrimosCalculados = [ ];
  let numeroActual = 2;
  while (cantidadPrimos > 0) {
    if (esPrimoRaiz(numeroActual)) {
      arrayPrimosCalculados.push(numeroActual);
      cantidadPrimos--;
    }
    numeroActual++;
  }
  //console.log(arrayPrimosCalculados);
}

/**
 * Este metodo usa process.stdout.write para mostrar 
 * los primeros cantidadPrimos primos
 * @param {number} cantidadPrimos - Cantidad de primos para enseñar
 * @return {undefined} 
 */
const mostrarPrimosDinamico = (cantidadPrimos) => {
  let arrayPrimosCalculados = [ ];
  let numeroActual = 2;
  while (cantidadPrimos > 0) {
    if (esPrimoDinamico(numeroActual, arrayPrimosCalculados)) {
      arrayPrimosCalculados.push(numeroActual);
      cantidadPrimos--;
    }
    numeroActual++;
  }
  //console.log(arrayPrimosCalculados);
}





// Main
if (comrpobarArgumentos()) {
  console.log("Modelo bruto, comprobando los divisores desde 2 hasta n: ")
  const tiempoComienzo = performance.now();
  const MAX_INPUT = parseInt(process.argv[2]);
  mostrarPrimos(MAX_INPUT);
  const tiempoFinal = performance.now();
  console.log (`El algoritmo tardó: ${Math.round(100 * (tiempoFinal - tiempoComienzo)) / 100000} segundos en ejecutarse`);
  console.log(" ");

  console.log("Comprobando los divisores desde 2 hasta raiz de n: ")
  const tiempoComienzoRaiz = performance.now();
  mostrarPrimosRaiz(MAX_INPUT);
  const tiempoFinalRaiz = performance.now();
  console.log (`El algoritmo tardó: ${Math.round(100 * (tiempoFinalRaiz - tiempoComienzoRaiz)) / 100000} segundos en ejecutarse`);
  console.log(" ");

  console.log("Comprobando los divisores desde 2 hasta raiz de n (solo los primos): ")
  const tiempoComienzoDinamico = performance.now();
  mostrarPrimosDinamico(MAX_INPUT);
  const tiempoFinalDinamico = performance.now();
  console.log (`El algoritmo tardó: ${Math.round(100 * (tiempoFinalDinamico - tiempoComienzoDinamico)) / 100000} segundos en ejecutarse`);
  console.log(" ");
}