import { useState } from "react";

const Camara = () => {
	const [ip, setIp] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const fetchFoto = async (e) => {
		e.preventDefault();
		if (!ip.trim()) return;
		setLoading(true);

		try {
			const response = await fetch(`http://${ip.trim()}/imagen.jpg`);
			if (!response.ok) throw new Error("Error al hacer la petición");

			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("image"))
				throw new Error("La respuesta no es una imagen");

			setImageUrl(URL.createObjectURL(await response.blob()));
			setError("");
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="camara">
			<h2>ESP32-CAM</h2>
			<form onSubmit={fetchFoto}>
				<div>
					<label>
						<span>IP ESP32-CAM:</span>
						<br />
						<input
							type="text"
							placeholder="192.168.1.10"
							value={ip}
							onChange={(e) => setIp(e.target.value)}
							className="camara__input-ip"
						/>
					</label>
				</div>
				<button disabled={!ip.trim()} className="camara__boton">
					Tomar foto
				</button>
			</form>
			<div className="camara__resultado">
				{loading && <p>Cargando...</p>}
				{imageUrl && (
					<img
						src={imageUrl}
						alt="Foto tomada con ESP32-Cam"
						className="camara__foto"
					/>
				)}
				{error && <p className="camara__error">{error}</p>}
			</div>
		</section>
	);
};

export default Camara;
