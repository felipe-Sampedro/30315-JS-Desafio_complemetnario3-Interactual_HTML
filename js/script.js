
console.log('PRESTAMOS')
alert("MUEVE LOS PARAMETROS Monto del Credito, Tasa Interes y Plazo PARA CALCULAR TU CUOTA MENSUAL A PAGAR!!! \n RECUERDA QUE DEBES SER MASYOR DE EDAD PARA SOLICITAR UN CREDITO")

let tasa_interes_EM=0
let periodo=0

// funciones para conversion de parametros
function conversion_tasa_interes(tasa_interes_EA){
	let tasa_interes_EM = Math.pow((1 + (tasa_interes_EA/100)),(1/12))-1
	return tasa_interes_EM
}

function años_en_meses(años){
	let periodo = años*12
	return periodo
}

// cambio formato resultado
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2
  })


//funciones para cada uno de los periodos "k" del credito segun el plazo dado en meses

function anualidadPK(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK.toFixed(0)
}

function numPK(periodoPK){
	let numeradorPK = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK)))-1
	return numeradorPK
}

function denPK(periodoPK){
	let denominadorPK = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK))
	return denominadorPK
}


function PK(numeradorPK , denominadorPK){
	let PK = (anualidadPK() * numeradorPK) / denominadorPK
	return PK.toFixed(0)
}



//funciones para cada uno de los periodos "k-1" del credito segun el plazo dado en meses

function anualidadPK_1(){
	let monto_prestamo = document.getElementById("prestamo").value;
	let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
	let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

	let resPK_1=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
	return resPK_1.toFixed(0)
}

function numPK_1(periodoPK_1){
	let numeradorPK_1 = (Math.pow((1+conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1)))-1
	return numeradorPK_1
}

function denPK_1(periodoPK_1){
	let denominadorPK_1 = conversion_tasa_interes(document.getElementById("interes").value) * Math.pow((1 + conversion_tasa_interes(document.getElementById("interes").value)),(años_en_meses(document.getElementById("plazo").value)-periodoPK_1+1))
	return denominadorPK_1
}


function PK_1(numeradorPK_1 , denominadorPK_1){
	let PK_1 = (anualidadPK_1() * numeradorPK_1) / denominadorPK_1
	return PK_1.toFixed(0)
}


// Funcion constructora de objetos con cada uno de los parametros calculados para cada mes 

class Cada_Periodo {
	constructor (k,numPK,denPK,PK,numPK_1,denPK_1,PK_1,abono_capital,cobro_interes){
		this.serie = k;
		this.numeradork = numPK;
		this.denominadork = denPK;
		this.capitalPK = PK;
		this.numeradorPK_1k = numPK_1;
		this.denominadorPK_1k = denPK_1;
		this.capitalPK_1 = PK_1;
		this.abonos=abono_capital
		this.cobro = cobro_interes
	}

	// Metodo que calcula del monto total pagado cada mes, cuanto se va al abono de capital
	abono_capital(){
		this.abonos= parseInt(this.capitalPK_1) - parseInt(this.capitalPK)
	}

	// Metodo que calcular del monto toal pagado cada mes, cuanto se va a pago de intereses generados
	pago_intereses(){
		this.cobro = anualidadPK() - this.abonos
	}

}

// Array vacio para utilizar propiedad push y cargarlos con los objetos creados de la funcion cosntructora
const Plan_pagos=[]

// creacion de objetos con cada uno de los parametros de los 5 primeros meses

for (let i = 1; i <= 5; i++){
	switch(i){
		case 1:
			Plan_pagos.push(resultado1 = new Cada_Periodo(i,numPK(i).toFixed(2),denPK(i).toFixed(2),PK(numPK(i),denPK(i)),numPK_1(i).toFixed(2),denPK_1(i).toFixed(2),PK_1(numPK_1(i),denPK_1(i)),0,0));
			resultado1.abono_capital()
			resultado1.pago_intereses()
			console.log(resultado1)
			console.log(`en el mes ${i} se pagaron ${resultado1.abonos} pesos como abono a capital y ${resultado1.cobro} pesos en abono a intereses`)
			break
		case 2:
			Plan_pagos.push(resultado2 = new Cada_Periodo(i,numPK(i).toFixed(2),denPK(i).toFixed(2),PK(numPK(i),denPK(i)),numPK_1(i).toFixed(2),denPK_1(i).toFixed(2),PK_1(numPK_1(i),denPK_1(i)),0,0));
			resultado2.abono_capital()
			resultado2.pago_intereses()
			console.log(resultado2)
			console.log(`en el mes ${i} se pagaron ${resultado2.abonos} pesos como abono a capital y ${resultado2.cobro} pesos en abono a intereses`)
			break
		case 3:
			Plan_pagos.push(resultado3 = new Cada_Periodo(i,numPK(i).toFixed(2),denPK(i).toFixed(2),PK(numPK(i),denPK(i)),numPK_1(i).toFixed(2),denPK_1(i).toFixed(2),PK_1(numPK_1(i),denPK_1(i)),0,0));
			resultado3.abono_capital()
			resultado3.pago_intereses()
			console.log(resultado3)
			console.log(`en el mes ${i} se pagaron ${resultado3.abonos} pesos como abono a capital y ${resultado3.cobro} pesos en abono a intereses`)
			break
		case 4:
			Plan_pagos.push(resultado4 = new Cada_Periodo(i,numPK(i).toFixed(2),denPK(i).toFixed(2),PK(numPK(i),denPK(i)),numPK_1(i).toFixed(2),denPK_1(i).toFixed(2),PK_1(numPK_1(i),denPK_1(i)),0,0));
			resultado4.abono_capital()
			resultado4.pago_intereses()
			console.log(resultado4)
			console.log(`en el mes ${i} se pagaron ${resultado4.abonos} pesos como abono a capital y ${resultado4.cobro} pesos en abono a intereses`)
			break
		case 5:
			Plan_pagos.push(resultado5 = new Cada_Periodo(i,numPK(i).toFixed(2),denPK(i).toFixed(2),PK(numPK(i),denPK(i)),numPK_1(i).toFixed(2),denPK_1(i).toFixed(2),PK_1(numPK_1(i),denPK_1(i)),0,0));
			resultado5.abono_capital()
			resultado5.pago_intereses()
			console.log(resultado5)
			console.log(`en el mes ${i} se pagaron ${resultado5.abonos} pesos como abono a capital y ${resultado5.cobro} pesos en abono a intereses`)
			break
	}
}

Plan_pagos.join('--')
console.log(Plan_pagos)


const amortizacion = document.querySelector('.resultado')
const limpiar = document.querySelector('.resetear')
limpiar.onclick = () => {amortizacion.innerText=""}


// funcion principal para calculo de cuota mensual a pagar del credito
function anualidad(){
	
	edad=parseInt(prompt("cual es tu edad?"))
	if (edad>=18){
		let monto_prestamo = document.getElementById("prestamo").value;
		let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
		let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);

		let res=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
		document.getElementById("resultado_final").innerHTML = formatter.format(res)
		}
	else{
		alert("no tienes edad suficiente para solicitar un credito!!")
		alert("Te haremos unas preguntas que te ayudaran a sumar puntos para calificar de todas maneras para el credito")
		for (let i=1 ;i<=3;i++){
			switch (i){
				case 1:
					let trabajo=0
					while (trabajo !== "SI" && trabajo !== "si" && trabajo !== "Si" &&  trabajo !== "sI" && trabajo !== "NO" && trabajo !== "no" && trabajo !== "No" && trabajo !== "nO"){
						trabajo = prompt("¿Actualmente trabajas y puedes demotrar ingresos? SI o NO")
						if(trabajo !== "SI" && trabajo !== "si" && trabajo !== "Si" &&  trabajo !== "sI" && trabajo !== "NO" && trabajo !== "no" && trabajo !== "No" && trabajo !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(trabajo)
					}	
					if (trabajo == "SI" || trabajo == "si" || trabajo == "Si" ||  trabajo == "sI"){
						edad = edad+3
						console.log(edad)
						console.log(trabajo)
					}
					break
				case 2:
					let amparo=0
					while(amparo !== "SI" && amparo !== "si" && amparo !== "Si" &&  amparo !== "sI" && amparo !== "NO" && amparo !== "no" && amparo !== "No" && amparo !== "nO"){
						amparo = prompt("Tienes alguien que te ampare financieramente? SI o NO")
						if(amparo !== "SI" && amparo !== "si" && amparo !== "Si" &&  amparo !== "sI" && amparo !== "NO" && amparo !== "no" && amparo !== "No" && amparo !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(amparo)
					}
					if (amparo == "SI" || amparo == "si" || amparo == "Si" ||  amparo == "sI"){
						edad = edad+2
						console.log(edad)
						console.log(amparo)
					}
					break
				case 3:
					let historial=0
					while(historial !== "SI" && historial !== "si" && historial !== "Si" &&  historial !== "sI" && historial !== "NO" && historial !== "no" && historial !== "No" && historial !== "nO"){
						historial=prompt("Tienes hitorial crediticio? SI o NO")
						if(historial !== "SI" && historial !== "si" && historial !== "Si" &&  historial !== "sI" && historial !== "NO" && historial !== "no" && historial !== "No" && historial !== "nO"){
							alert("Solo puedes responder SI o NO")
						}
						console.log(historial)
					}
					if (historial == "SI" || historial == "si" || historial == "Si" ||  historial == "sI"){
						edad = edad+1
						console.log(edad)
						console.log(historial)
					}
					break
				}
			if(edad>=18){
				i=4
			}
		}
		if(edad>=18){
			alert("Aunque no cumples la mayoria de edad, tienes los requisitos para acceder al credito")
			let monto_prestamo = document.getElementById("prestamo").value;
			let tasa_interes = conversion_tasa_interes(document.getElementById("interes").value);
			let Numero_cuotas = años_en_meses(document.getElementById("plazo").value);
	
			let res=((tasa_interes * Math.pow(( 1 + tasa_interes),Numero_cuotas))/((Math.pow((1+tasa_interes),Numero_cuotas))-1))*monto_prestamo;
			document.getElementById("resultado_final").innerHTML = formatter.format(res)
		}
		else{
			alert("lo sentimos, aunque tienes puntos extras no es suficiente, no podemos darte el credito")
		}

	}

}






// para mostrar el valor seleccionados en los inputs de rango
const prestamo = document.querySelector('#prestamo')
const output = document.querySelector('.prestamo-output')

output.textContent = prestamo.value

prestamo.addEventListener('input', function() {
  output.textContent = prestamo.value
});



const interes = document.querySelector('#interes')
const output2 = document.querySelector('.interes-output')

output2.textContent = interes.value

interes.addEventListener('input', function() {
  output2.textContent = interes.value
});


const plazo = document.querySelector('#plazo')
const output3 = document.querySelector('.plazo-output')

output3.textContent = plazo.value

plazo.addEventListener('input', function() {
  output3.textContent = plazo.value
});