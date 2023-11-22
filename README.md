# Página web proyecto Sistemas Programables

Está página web forma parte del proyecto final de sistemas programables de la carrera de Ingeniería en Sistemas computacionales. Su función controlar el movimiento del carrito a traves del protocolo MQTT.

## Integrantes

- Aldana Pérez José Samuel
- Manrique Galván Omar Manuel
- Guerrero Durán César Antonio

## Cómo funciona

La página se conecta a un broker MQTT creado en [EMQX Cloud](https://www.emqx.com/en/cloud). Al presionar los botones se publican mensajes a los topics `Carrito/botones`, el cual está suscrito la placa ESP32 del carrito y dependiendo el mensaje recibido, actuan sus motores.

### Funciones

- Avanzar
- Retroceder
- Girar a la izquierda
- Girar a la derecha
- Detenerse

### Paquetes utilizados

- [mqtt](https://www.npmjs.com/package/mqtt)
