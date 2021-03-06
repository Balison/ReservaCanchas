<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php require_once 'inc/inclusion_bootstrap.php'; ?>
    </head>
    <body>
        <?php require_once 'inc/cabecera_vistas.php'; ?>
        <div class="container well">
            <h2 style="padding: 0px; margin: 0px; border: 0px">XCode Grafico Reporte de Canchas Populares</h2><br>
            <div class="row">
                <div class="col-sm-7"></div>
                <div class="col-sm-1"><h5><strong>Gestion</strong></h5></div>
                <div class="col-sm-4">
                    <select class="form-control" id="select_gestion" name="tipo_cancha">
                        <?php foreach ($gestiones as $gestion): ?>
                            <option value="<?php echo $gestion->gestion; ?>"><?php echo $gestion->gestion; ?></option>
                        <?php endforeach; ?>
                        <!--<option value="2014">2014</option>-->
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <canvas id="canvas" height="350" width="1100"></canvas>
                </div>
                <div class="col-md-12">
                    <h3>Total : <span id="total"></span></h3>
                </div>
                <div id="tabla_reportes" class="col-md-12">
                
                </div>
                
                
            </div>
        </div>
        
        <?php require_once 'inc/inclusion_jquery.php'; ?>
        <script src="<?php echo base_url(); ?>assets/js/Chart.min.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/graficos_reporte_canchas.js"></script>
        <script src="<?php echo base_url(); ?>assets/js/notificaciones.js"></script>
    </body>
</html>
