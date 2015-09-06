<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php require_once 'inc/inclusion_bootstrap.php'; ?>
    </head>
    <body>
        <header role="navigation" class="navbar navbar-default navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <img src="<?php echo base_url(); ?>assets/img/logo_app.png" width="40" height="40">
            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <a href="#" class="btn" style="padding-top: 14px;">XCodeRC</a>
        </div>
    </div>

</header>
        <div class="container well">
            <h2>XCode Iniciar Sesion</h2><br>
            <div class="row">
                <div class="col-sm-6">
                    <img class="img-rounded img-responsive" src="<?php echo base_url(); ?>assets/img/imagen_cancha.jpg" width="500" height="">
                </div>
                <div class="col-sm-6">
                    <?php require_once 'inc/mensaje_alerta.php';?>
                    <form class="form-horizontal" enctype="multipart/form-data" method="POST" action="<?php echo base_url(); ?>index.php/Welcome/solicitud_sesion">
                        <div class="form-group">
                            <label class="control-label col-sm-3">Nombre de usuario:</label>
                            <div class="col-sm-9">
                                <input type="text" title="Debe empezar con letra y contener solo letras o numeros, minima longitud de 3" pattern="^[a-zA-Z][a-zA-Z0-9 ]{1,}[a-zA-Z0-9]$" required class="form-control" name="nombre_usuario" id="nombre_usuario" placeholder="Nombre de usuario">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label col-sm-3">Carnet Identidad:</label>
                            <div class="col-sm-9">
                                <input type="password" title="Solo se permiten numeros" pattern="[0-9]*" inputmode="numeric" required class="form-control" name="ci" id="ci">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-3 col-sm-9">
                                <input type="submit" class="btn btn-primary" value="Iniciar Sesion">
                                <input type="reset" class="btn btn-default" value="Limpiar">
                            </div>
                        </div>
                    </form>
                    <div class="form-group">
                        <div class="col-sm-offset-3 col-sm-9">
                            <a href="<?php echo base_url()?>index.php/Welcome/vista_registro">Aun no estas registrado? Registrate!</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php require_once 'inc/inclusion_jquery.php'; ?>
    </body>
</html>
