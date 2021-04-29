

let creaSeccionRegiones = () => {
  let main = document.getElementById('main');
  let seccionRegiones = document.createElement('section');
  let button = document.createElement('button')
  button.textContent = 'Agregar Region'
  seccionRegiones.id = 'seccion-regiones';
  let titulo = document.createElement('h2');
  titulo.textContent = 'Regiones';
  main.appendChild(seccionRegiones);
  seccionRegiones.appendChild(titulo);
  seccionRegiones.appendChild(button);
  button.addEventListener('click',(e)=>{
    e.stopPropagation()
          Agregar(e, 'region', 'regiones');
  })
  seccionRegiones.className = 'seccion-companias'
  titulo.className = 'tituloCompanias';
  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };


  fetch("http://localhost:3000/regiones", requestOptions)
    .then(response => response.json())
    .then(result => {




      let conteNuevaRegion = document.createElement("div");
      let nuevaRegion = document.createElement("h2");
      seccionRegiones.appendChild(conteNuevaRegion);
      conteNuevaRegion.appendChild(nuevaRegion);
      nuevaRegion.innerHTML = "Agregar Region";
      nuevaRegion.style.cursor = "pointer";
      // conteNuevaRegion.addEventListener("click", newRegion); AUN NO EXISTE

      for (i = 0; i < result.length; i++) {
        let conteReg = document.createElement("div");
        let regiones = document.createElement("h3");
        seccionRegiones.appendChild(conteReg);
        // seccionRegiones.appendChild(regiones);
        conteReg.setAttribute("id", "regiones" + result[i].id_region);
        conteReg.setAttribute("class", "region");
        regiones.textContent = result[i].nombre;


        let conR = document.createElement("div");
        let editar = document.createElement("h4");
        let eliminar = document.createElement("h4");
        let agregarPais = document.createElement("h4");
        conteReg.appendChild(regiones);
        conteReg.appendChild(conR);

        editar.addEventListener('click', (e) => {
          Editar(e, 'regiones')
          e.stopPropagation()

        })

        conR.appendChild(editar);
        conR.appendChild(eliminar);
        conR.appendChild(agregarPais);
        editar.setAttribute("id", "editar-region" + result[i].id_region);
        eliminar.setAttribute("id", "eliminar-region" + result[i].id_region);
        editar.textContent = "Editar";
        editar.setAttribute("class", "editar");
        editar.style.cursor = "pointer";

        let id_region = result[i].id_region;
        let nombreRegion = result[i].name;

        eliminar.textContent = "Eliminar";
        eliminar.setAttribute("class", "eliminar");
        eliminar.style.cursor = "pointer";
        eliminar.addEventListener("click", (e) => {
          e.stopPropagation()
          Eliminar('regiones', id_region);
        });

        agregarPais.innerHTML = "Agregar Pais";
        agregarPais.style.cursor = "pointer";
        agregarPais.setAttribute("id", "agregarPais" + id_region);
        agregarPais.setAttribute("class", "agregarpais");
        agregarPais.addEventListener("click", function (e) {
          e.stopPropagation()
          Agregar(e, 'pais', 'paises', e.target.parentNode.parentNode.id);
        });

        let idReg = result[i].id_region;
        // getPaises(idReg);
        conteReg.addEventListener('click', () => {
          console.log(idReg)
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);

          var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };


          fetch(`http://localhost:3000/paises/${idReg}`, requestOptions)
            .then(response => response.json())
            .then(result => {
              console.log(result)
              if (result.region.length > 0) {
                creaPaises(result, idReg, seccionRegiones)
              }

            })
            .catch(err => console.error(err))
        })
      }

    })
    .catch(error => console.log(error));
}

function creaPaises(result, idReg) {


  let seccionRegiones = document.getElementById('seccion-regiones')
  let ul = document.createElement('ul')
  ul.id = `ulRegion${idReg}`
  // conteReg.insertBefore(ul, document.getElementById(`region${idReg+1}`));
  if (document.getElementById(`ulRegion${idReg}`)) {

    document.getElementById(`ulRegion${idReg}`).remove()

  } else {

    seccionRegiones.insertBefore(ul, document.getElementById(`regiones${idReg + 1}`));
    let resultado = result.region

    for (i = 0; i < resultado.length; i++) {

      let li = document.createElement('li');
      li.className = 'pais'
      let h4 = document.createElement('h4');
      let editarh5 = document.createElement('h5');
      let eliminar5 = document.createElement('h5');
      let agregarh5 = document.createElement('h5');
      let idPais = resultado[i].id_pais
      editarh5.addEventListener('click', (e) => {
        e.stopPropagation()
        Editar(e, 'paises')
      })
      eliminar5.addEventListener("click", (e) => {
        e.stopPropagation()

        Eliminar('paises', idPais);
      });
      agregarh5.addEventListener("click", function (e) {

        Agregar(e, 'ciudad', 'ciudades', e.target.parentNode.parentNode.id);
      });
      let span = document.createElement('span');
      editarh5.textContent = 'Editar';
      eliminar5.textContent = 'Eliminar';
      agregarh5.textContent = 'Agregar ciudad';
      h4.textContent = resultado[i].nombre
      li.appendChild(h4)
      li.appendChild(span)
      span.appendChild(editarh5)
      span.appendChild(eliminar5)
      span.appendChild(agregarh5)
      ul.appendChild(li)
      li.id = `paises${resultado[i].id_pais}`
      let idNecesario = resultado[i].id_pais

      let ulRegionPrueba = `ulRegion${idReg}`
      // nuevo aca more
      li.addEventListener('click', () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };


        fetch(`http://localhost:3000/ciudades/${idNecesario}`, requestOptions)
          .then(response => response.json())
          .then(result => {

            let ul = document.createElement('ul')
            ul.id = `ulPais${idNecesario}`
            // conteReg.insertBefore(ul, document.getElementById(`region${idReg+1}`));
            if (document.getElementById(`ulPais${idNecesario}`)) {

              document.getElementById(`ulPais${idNecesario}`).remove()

            } else {

              document.getElementById(`ulRegion${idReg}`).insertBefore(ul, document.getElementById(`paises${idNecesario + 1}`));

              let resultado = result.region

              for (i = 0; i < result.length; i++) {
                let li = document.createElement('li');
                li.className = 'ciudad'
                let h4 = document.createElement('h4');
                let editarh5 = document.createElement('h5');
                let eliminar5 = document.createElement('h5');
                let span = document.createElement('span');
                editarh5.textContent = 'Editar';
                eliminar5.textContent = 'Eliminar';
                let idCiudad = result[i].id_ciudad
                editarh5.addEventListener('click', (e) => {
                  e.stopPropagation()
                  Editar(e, 'ciudades')
                })
                eliminar5.addEventListener("click", (e) => {
                  e.stopPropagation()

                  Eliminar('ciudades', idCiudad);
                });
                h4.textContent = result[i].nombre
                li.appendChild(h4)
                li.appendChild(span)
                span.appendChild(editarh5)
                span.appendChild(eliminar5)
                ul.appendChild(li)
                console.log('esasdasdasdasdasdasda')
                console.log(result[i].id_ciudad)
                console.log('esasdasdasdasdasdasda')
                li.id = `ciudades${result[i].id_ciudad}`
              }
            }

            // hasta aca
          })
          .catch(err => console.error(err))
      })
      // nuevo hasta aca more


    }
  }
}

function Eliminar(where, id) {

  var myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  var requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };


  fetch(`http://localhost:3000/${where}/${id}`, requestOptions)
    .then(response => response.json())
    .then(result => {
      document.getElementById('seccion-regiones').remove()
      creaSeccionRegiones()

    })
    .catch(err => console.error(err))

}

function Editar(e, where) {
  let span = document.createElement('span')
  let inputText = document.createElement('input')
  let aceptar = document.createElement('i')
  aceptar.classList.add('fas', 'fa-check-circle')

  let cancelar = document.createElement('i')
  cancelar.classList.add('fas', 'fa-times-circle')
  inputText.type = "text";
  let value = e.target.parentNode.parentNode.firstChild.textContent
  inputText.value = value
  span.appendChild(inputText)
  span.appendChild(aceptar)
  span.appendChild(cancelar)
  e.target.parentNode.parentNode.insertBefore(span, e.target.parentNode.parentNode.children[1])

  e.target.parentNode.parentNode.firstChild.remove()
  inputText.addEventListener('click', (e) => {
    e.stopPropagation()
  })

  cancelar.addEventListener('click', (e) => {
    e.stopPropagation()
    let h3 = document.createElement('h3')
    h3.textContent = value
    e.target.parentNode.parentNode.insertBefore(h3, e.target.parentNode.parentNode.children[1])
    e.target.parentNode.parentNode.firstChild.remove()
  })

  aceptar.addEventListener('click', (e) => {
    e.stopPropagation()
    // if(where=='regions'){
    //   let id = e.target.parentNode.parentNode.id
    // }else
    // {
    //   console.log(e.target.parentNode.parentNode.id)
    // }
    let id = e.target.parentNode.parentNode.id
    console.log(e.target.parentNode.parentNode)


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    let newData = e.target.parentNode.firstChild.value
    var raw = JSON.stringify({ "nombre": newData });

    var requestOptions = {
      method: 'PATCH',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    fetch(`http://localhost:3000/${where}/${id.slice(where.length, id.length)}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
      })
      .catch(err => console.error(err))

    let h3 = document.createElement('h3')
    h3.textContent = newData
    e.target.parentNode.parentNode.insertBefore(h3, e.target.parentNode.parentNode.children[1])
    e.target.parentNode.remove()
  })

}

function Agregar(e, label, where, id) {

  let ventana = document.createElement('div');
  let popUp = document.createElement('div');
  let tituloEditar = document.createElement('h3');
  let form = document.createElement('div');
  let contenedorInput = document.createElement('div');
  let nombre_paisInput = document.createElement('input');


  let nombre_paisLabel = document.createElement('label');

  let btnConfirmar = document.createElement('button');
  let btnCerrar = document.createElement('i');

  document.getElementById('main').appendChild(ventana);

  ventana.appendChild(popUp);
  popUp.appendChild(tituloEditar);
  popUp.appendChild(btnCerrar);
  popUp.appendChild(form);
  form.appendChild(contenedorInput);
  contenedorInput.appendChild(nombre_paisLabel);
  contenedorInput.appendChild(nombre_paisInput);


  form.appendChild(btnConfirmar);

  nombre_paisLabel.textContent = 'Nombre del ' + label;




  ventana.id = 'ventana-editar-compania';

  tituloEditar.textContent = 'Agregar ' + where;
  tituloEditar.className = 'titulo-editar-compania';

  btnCerrar.className = 'fas fa-times';
  btnCerrar.id = 'btn-cerrar-editar-compania';

  ventana.className = 'ventana';
  popUp.className = 'popUp-editar';
  form.className = 'form-editar';
  contenedorInput.className = 'contenedor-input';
  nombre_paisInput.className = 'input-editar';

  nombre_paisInput.id = 'input-id_pais-editar-compania';


  btnConfirmar.className = 'btn-confirmar-editar';
  btnConfirmar.id = 'btn-confirmar-editar';

  nombre_paisLabel.className = 'label-editar';


  btnConfirmar.textContent = 'Confirmar';



  console.log('entro al else');
  console.log(where)
  console.log(id)
  btnConfirmar.addEventListener('click', () => {

    console.log('HIZO CLICK');
    let nombre = nombre_paisInput.value;


    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

   
    if (where == 'paises') {
      id = id.slice(8, id.length)
      var raw = JSON.stringify({ "id_region": id, "nombre": nombre });
    } else if (where == 'ciudades') {
      id = id.slice(6, id.length)
      var raw = JSON.stringify({ "id_pais": id, "nombre": nombre });
    } else {
      var raw = JSON.stringify({"nombre": nombre });
    }


    console.log(raw);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(`http://localhost:3000/${where}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        ventana.remove()
        console.log(result);
        document.getElementById('seccion-regiones').remove()
        creaSeccionRegiones()
      })
      .catch(error => console.log('error', error));


  });




  btnConfirmar.textContent = 'Confirmar';

  document.getElementById('btn-cerrar-editar-compania').addEventListener('click', () => {
    document.getElementById('ventana-editar-compania').remove();
  });




}