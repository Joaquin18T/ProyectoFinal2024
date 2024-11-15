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

    public function obtenerMantenimientoPorId($params = []): array
    {
        try {
            $sp = parent::execQ("SELECT * FROM tareas_mantenimiento where idtm = ?");
            $sp->execute(array(
                $params['idtm']
            ));
            return $sp->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            die($e->getMessage());
        }
    } // INTEGRADO ✔

    public function verificarMantenimientoEjecutado($params = []): array
    {
        try {
            $sp = parent::execQ("CALL verificarMantenimientoEjecutado(?)");
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

    public function registrar_mar($params = []): bool
    {
        try {
            $status = false;
            $sp = parent::execQ("CALL registrar_mar(?,?,?)");
            $status = $sp->execute(
                array(
                    $params['idtm'],
                    $params['idactivo'],
                    $params['idusuario']
                )
            );
            return $status;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    } // INTEGRADO ✔

    public function actualizarMantenimiento($params = []): bool
    {
        try {
            $status = false;
            $sp = parent::execQ("CALL actualizarMantenimiento(?,?,?,?,?)");
            $status = $sp->execute(
                array(
                    $params['idtm'],
                    $params['descripcion'],
                    $params['fechafinalizado'],
                    $params['horafinalizado'],
                    $params['tiempoejecutado']
                )
            );
            return $status;
        } catch (Exception $e) {
            die($e->getMessage());
        }
    } // INTEGRADO ✔
}
