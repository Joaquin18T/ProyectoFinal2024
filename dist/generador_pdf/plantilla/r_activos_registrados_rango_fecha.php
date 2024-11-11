<!-- Secciones del documento PDF -->
<page backtop="10mm" backbottom="7mm">
    <page_header style="margin-bottom: 20px;">
        <span>Sigemapre</span>
    </page_header>
    
    <page_footer>
        <div class="text-end bg-primary">page [[page_cu]]/[[page_nb]]</div>
    </page_footer>
</page>

<style>
        /* Estilos generales */
        page_header {
  margin-bottom: 20px; /* Puedes ajustar el valor según sea necesario */
} 
        body {
            font-family: Arial, sans-serif;
            color: #333;
            line-height: 1.5;
            margin: 0;
            /* Eliminar márgenes del body */
            padding: 20px;
        }

        /* Título principal */
        h1 {
            color: #000;
            font-weight: bold;
            font-size: 24px;
            margin-bottom: 20px;
            max-width: 80%;
            word-wrap: break-word;
            overflow-wrap: break-word;
            display: inline-block;
        }

        /* Información general alineada a la derecha */
        .info-general {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
            margin-bottom: 20px;
        }

        .info-general p {
            margin: 5px 0;
            font-size: 14px;
        }

        .info-general p strong {
            color: #333;
        }

        /* Sección de tablas */
        h2 {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 20px;
        }

        /* Estilos específicos para cada tabla */
        .table-range {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        .table-assets {
            width: 100%;
            /* Asegura que ocupe todo el ancho */
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        /* Ancho fijo para columnas */
        th,
        td {
            padding: 8px;
            text-align: left;
            border: 1px solid #000;
        }

        .table-range th,
        .table-range td {
            width: 25%;
        }

        .table-range th {
            background-color: #f2f2f2;
            font-weight: bold;
            color: #000;
        }

        /* ****************** TABÑA ASSETS ***************************** */
        .table-assets th {
            background-color: #f2f2f2;
            font-weight: bold;
            color: #000;
        }


        #c-identificacion {
            width: 10%;
        }

        #c-descripcion {
            width: 25%;
        }

        #c-marca {
            width: 10%;
        }

        .td-desc {
            width: 5%;
        }

        .td-marca {
            width: 14%;
        }

        .td-area {
            width: 20%;
        }
    </style>

        <br>
    <!-- Título principal del reporte -->
    <h1>INFORME DE ACTIVOS REGISTRADOS POR RANGO DE FECHA</h1>
    <hr>
    <!-- Sección de descripción general alineada a la derecha -->
    <div class="info-general">
        <p><strong>N° reporte:</strong> N0002391</p>
        <p><strong>Generado el:</strong> 20/11/2024</p>
        <p><strong>Generado por:</strong> Joaquin Phoenix</p>
    </div>

    <!-- Tabla de rango de fechas -->
    <h2>Rango de fechas</h2>
    <table class="table-range">
        <tr>
            <th>Fecha de Inicio</th>
            <td>01/01/2024</td>
            <th>Fecha de Fin</th>
            <td>31/12/2024</td>
        </tr>
    </table>

    <!-- Tabla de activos registrados -->
    <h2>Activos registrados</h2>
    <table class="table-assets">
        <tr>
            <th id="c-identificacion">Id.</th>
            <th id="c-descripcion">Descripcion</th>
            <th id="c-marca">Marca</th>
            <th>Subcategoria</th>
            <th id="c-area">Área</th>
            <th>Fecha</th>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Departamento de TI</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Área Administrativa</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Área Administrativa</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Área Administrativa</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Area contable</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Area contable</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-006</td>
            <td class="td-desc">Camion de carga pesada</td>
            <td class="td-marca">Mercedes Benz</td>
            <td>Camiones</td>
            <td class="td-area">Logística y Transporte</td>
            <td>30/12/2023</td>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Departamento de TI</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Área Administrativa</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Área Administrativa</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Área Administrativa</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Area contable</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Area contable</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-006</td>
            <td class="td-desc">Camion de carga pesada</td>
            <td class="td-marca">Mercedes Benz</td>
            <td>Camiones</td>
            <td class="td-area">Logística y Transporte</td>
            <td>30/12/2023</td>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Departamento de TI</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Área Administrativa</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Área Administrativa</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Área Administrativa</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-001</td>
            <td>Computadora Portátil</td>
            <td>HP</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>10/02/2023</td>
        </tr>
        <tr>
            <td>EQ-002</td>
            <td>Impresora Multifuncional</td>
            <td>Canon</td>
            <td>Oficina</td>
            <td>Area contable</td>
            <td>05/05/2023</td>
        </tr>
        <tr>
            <td>EQ-003</td>
            <td>Proyector LED</td>
            <td>Epson</td>
            <td>Electrónica</td>
            <td>Area contable</td>
            <td>18/07/2023</td>
        </tr>
        <tr>
            <td>EQ-004</td>
            <td>Teléfono IP</td>
            <td>Cisco</td>
            <td>Telecomunicaciones</td>
            <td>Area contable</td>
            <td>23/09/2023</td>
        </tr>
        <tr>
            <td>EQ-005</td>
            <td>Router de Red</td>
            <td>TP-Link</td>
            <td>Redes</td>
            <td>Area contable</td>
            <td>30/11/2023</td>
        </tr>
        <tr>
            <td>EQ-006</td>
            <td class="td-desc">Camion de carga pesada</td>
            <td class="td-marca">Mercedes Benz</td>
            <td>Camiones</td>
            <td class="td-area">Logística y Transporte</td>
            <td>30/12/2023</td>
        </tr>
        <!-- Agregar más filas según sea necesario -->
    </table>
