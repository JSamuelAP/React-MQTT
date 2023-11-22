import { useState } from "react";
import mqtt from "mqtt";
import {
	IconArrowUp,
	IconArrowLeft,
	IconArrowRight,
	IconArrowDown,
	IconPlayerStop,
} from "@tabler/icons-react";
import Header from "./components/Header";
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
			<Header />
			<main>
				<section className="botones">
					{isConnected ? <h2>Carrito</h2> : <h2>Conectando...</h2>}
					<div className="botones__grid">
						<div className="botones__row">
							<button
								onClick={() => publishMessage("adelante")}
								disabled={!isConnected}
								title="adelante"
							>
								<IconArrowUp />
							</button>
						</div>
						<div className="botones__row">
							<button
								title="izquierda"
								onClick={() => publishMessage("izquierda")}
								disabled={!isConnected}
							>
								<IconArrowLeft />
							</button>
							<button
								onClick={() => publishMessage("detener")}
								disabled={!isConnected}
								title="detener"
							>
								<IconPlayerStop />
							</button>
							<button
								onClick={() => publishMessage("derecha")}
								disabled={!isConnected}
								title="derecha"
							>
								<IconArrowRight />
							</button>
						</div>
						<div className="botones__row">
							<button
								onClick={() => publishMessage("atras")}
								disabled={!isConnected}
								title="atras"
							>
								<IconArrowDown />
							</button>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default App;
