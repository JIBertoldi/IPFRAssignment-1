import { useId, useState } from "react";
import defaultAvatar from "../assets/default-avatar.jpg";

export default function Avatar({
	active = false,
	editable = true,
	image,
	stats = { wins: 0, draws: 0 },
	onImageChange,
	width = 150,
	height = 150,
}) {
	const inputId = useId();
	const [isHovered, setIsHovered] = useState(false);

	return (
		<label
			htmlFor={inputId}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				display: "block",
				position: "relative",
				width,
				height,
				borderRadius: "50%",
				overflow: "hidden",
				cursor: editable ? "pointer" : "default",
				background: "#e5e7eb",
				border: `2px solid ${active ? "#facc15" : "#9ca3af"}`,
			}}
		>
			<img
				src={image || defaultAvatar}
				alt="Foto de perfil"
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/>

			{editable && isHovered && (
				<span
					style={{
						position: "absolute",
						inset: 0,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						background: "rgba(0, 0, 0, 0.4)",
						backdropFilter: "blur(4px)",
						color: "#fff",
						fontWeight: "600",
						textAlign: "center",
						textTransform: "uppercase",
						letterSpacing: "0.05em",
					}}
				>
					<span>
						Edit
						<span
							style={{
								display: "block",
								marginTop: "0.35rem",
								fontSize: "0.9rem",
								textTransform: "none",
								letterSpacing: "normal",
								whiteSpace: "nowrap",
							}}
						>
							Wins: {stats.wins}
							<br />
							Draws: {stats.draws}
						</span>
					</span>
				</span>
			)}

			{editable && (
				<input
					id={inputId}
					type="file"
					accept="image/*"
					onChange={onImageChange}
					hidden
				/>
			)}
		</label>
	);
}