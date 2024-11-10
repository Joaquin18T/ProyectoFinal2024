<?php

require_once 'ExecQuery.php';

class TareasMantenimiento extends ExecQuery
{
    public function obtenerMantenimientosActivo($params = []): array
    {
        try {
            $sp = parent::execQ("CALL obtenerMantenimientosActivo(?)");
            $sp->execute(array(
                $params['idactivo']
            ));
            return $sp->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    } // INTEGRADO ✔

    public function registrarTareaMantenimiento($params = []): int
    {
        try {
            $sp = parent::execQ("CALL registrarTareaMantenimiento(@idtm,?,?)");
            $sp->execute(
                array(
                    $params['idtarea'],
                    $params['descripcion']
                )
            );
            $response = parent::execQuerySimple("SELECT @idtm as idtm")->fetch(PDO::FETCH_ASSOC);
            return (int) $response['idtm'];
        } catch (Exception $e) {
            die($e->getMessage());
        }
    } // INTEGRADO ✔
}
