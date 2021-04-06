const urlraiz = 'https://pruebanuvola.herokuapp.com/';

  // funciones estadisticas
  const getMostrarCantidadClienteHabitacion = () => {

    var arrX = [];
    var arrY = [];
    $.ajax({
        url: urlraiz+'servicio/getMostrarCantidadClienteHabitacion',
        type:'GET',
        dataType : 'json',
        beforeSend:function(){
            block('Cargando graficas');
        },
        success:function(res){
            if(res.length > 0){
                $.each(res,function(i,item){
                    arrX.push(item.nombrehab);
                    arrY.push(item.countcliente)
                })
                var data = [
                    {
                        x: arrX,
                        y: arrY,
                        type: 'bar',
                        marker:{
                            color:'#154360'
                        }
                    }
                ];

                var layout = {
                    title: 'Grafica de barras',
                    font:{
                      family: 'Raleway, sans-serif'
                    },
                    xaxis: {
                      tickangle: -45
                    },
                    yaxis: {
                      zeroline: false,
                      gridwidth: 2
                    },
                    bargap :0.05
                  };
                  var config = {responsive: true}
                Plotly.newPlot('graficabarras', data, layout,config);
            }
        },
        complete:function(){
            
        }
    })

  }

  getMostrarCantidadClienteHabitacion();

  const getMostrarCantidadManerapagoHabitacion = () => {

    var arrX = [];
    var arrY = [];
    $.ajax({
        url: urlraiz+'servicio/getMostrarCantidadManerapagoHabitacion',
        type:'GET',
        dataType : 'json',
        success:function(res){
            if(res.length > 0){
                $.each(res,function(i,item){
                    arrX.push(item.nombremp);
                    arrY.push(item.countManerapago)
                })
                var data = [
                    {
                        values: arrY,
                        labels: arrX,
                        type: 'pie'
                    }
                ];
                var layout = {
                    height: 380,
                    width: 320,
                    title: 'Grafica de torta',
                    font:{
                      family: 'Raleway, sans-serif'
                    },
                    xaxis: {
                      tickangle: -45
                    },
                    yaxis: {
                      zeroline: false,
                      gridwidth: 2
                    },
                    bargap :0.05
                };
                var config = {responsive: true}
                Plotly.newPlot('graficaTorta', data, layout, config);
            }
        },
        complete:function(){
            
        }
    })

  }

  getMostrarCantidadManerapagoHabitacion();

  const getAcumuladoVentasPorMesServicios = () => {
    var arrX = [];
    var arrY = [];
    $.ajax({
        url: urlraiz+'servicio/getAcumuladoVentasPorMesServicios',
        type:'GET',
        dataType : 'json',
        success:function(res){
            if(res.length > 0){
                $.each(res,function(i,item){
                    arrX.push(item.valorser);
                    arrY.push(item.mes)
                })


                var trace1 = {
                    x: arrY,
                    y: arrX,
                    type: 'scatter'
                  };

                  var layout = {
                    title: 'Grafica linear',
                    font:{
                      family: 'Raleway, sans-serif'
                    }
                  };
                  var config = {responsive: true}
                 
                  
                  var data = [trace1];
                  
                  Plotly.newPlot('graficaLinea', data, layout, config);
            }
        },
        complete:function(){
            unBlock();
        }
    })
  }

  getAcumuladoVentasPorMesServicios();

