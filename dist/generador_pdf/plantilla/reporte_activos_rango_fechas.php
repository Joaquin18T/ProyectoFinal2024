<?php

require_once './vendor/autoload.php';

use Spipu\Html2Pdf\Html2Pdf;

// recoger el contenido del otro ficher
ob_start();
require_once 'r_activos_registrados_rango_fecha.php';
$html = ob_get_clean();

$html2pdf = new Html2Pdf('P', 'A4', 'es', true, 'UTF-8', 10);
$html2pdf->writeHTML($html);
$html2pdf->output();