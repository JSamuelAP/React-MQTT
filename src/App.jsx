import { useState } from "react";
import mqtt from "mqtt";
import "./App.css";

function App() {
	const [isConnected, setIsConnected] = useState(false);
	let client;

	const handleConnect = () => {
		client = mqtt.connect(import.meta.env.VITE_MQTT_BROKER, {
			clientId: "emqx_react_" + Math.random().toString(16).substring(2, 8),
			username: import.meta.env.VITE_MQTT_USER,
			password: import.meta.env.VITE_MQTT_PASS,
		});

		if (client) {
			client.on("connect", () => {
				console.log("Connected to MQTT broker");
				setIsConnected(true);
			});
			client.on("error", (err) => {
				console.error("Connection error: ", err);
				client.end();
				setIsConnected(false);
			});
			client.on("reconnect", () => {
				console.warn("Reconnected");
				setIsConnected(true);
			});
		}
	};

	const publishMessage = (message = "") => {
		client.publish("Carrito/botones", message, {}, (error) => {
			if (error) console.err("Publish error: ", error);
			else console.log("Mensaje enviado: " + message);
		});
	};

	handleConnect();

	return (
		<>
			<header>
				<h1>MQTT EMQX</h1>
			</header>
			<main>
				<section>
					{isConnected ? <h2>Carrito</h2> : <h2>Conectando...</h2>}
					<div className="botones">
						<button
							onClick={() => publishMessage("adelante")}
							disabled={!isConnected}
						>
							Avanzar
						</button>
						<button
							onClick={() => publishMessage("atras")}
							disabled={!isConnected}
						>
							Retroceder
						</button>
						<button
							onClick={() => publishMessage("izquierda")}
							disabled={!isConnected}
						>
							Girar a la izquierda
						</button>
						<button
							onClick={() => publishMessage("derecha")}
							disabled={!isConnected}
						>
							Girar a la derecha
						</button>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
