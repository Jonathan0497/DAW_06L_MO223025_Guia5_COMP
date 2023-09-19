let myChart;

document.getElementById('generarGrafico').addEventListener('click', function() {
    const dataSelect = document.getElementById('data-select').value;
    const colorSelect = document.getElementById('color-select').value;
    const orientationSelect = document.getElementById('orientation-select').value;

    const data = getData(dataSelect);
    const orientation = orientationSelect === 'vertical' ? 'v' : 'h';

    createChart(orientation, data, colorSelect);
});

document.getElementById('limpiarGrafico').addEventListener('click', function() {
    if (myChart) {
        Plotly.purge('myChart');
        myChart = null;
    }

    // Resetear los valores de los selectores
    document.getElementById('data-select').value = 'navegador';
    document.getElementById('color-select').value = 'purple';
    document.getElementById('orientation-select').value = 'vertical';
});

function createChart(orientation, data, color) {
    const trace = {
        x: orientation === 'v' ? data.labels : data.values,
        y: orientation === 'v' ? data.values : data.labels,
        type: 'bar',
        orientation: orientation,
        marker: {
            color: color
        }
    };

    const layout = {
        title: data.label,
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50
        }
    };

    const config = {
        displayModeBar: false
    };

    myChart = Plotly.newPlot('myChart', [trace], layout, config);
}

function getData(selection) {
    const data = {
        navegador: {
            label: 'Navegadores mas usados',
            labels: ['Chrome', 'Firefox', 'Safari', 'Edge'],
            values: [80, 50, 40, 25]
        },
        sistema_operativo: {
            label: 'Sistemas Operativos mas usados',
            labels: ['Windows', 'MacOS', 'Linux'],
            values: [100, 50, 10]
        }
    };

    return data[selection];
}
