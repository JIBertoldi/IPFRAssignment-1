
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

			{editable && (
				<>
					<span
						style={{
							position: "absolute",
							inset: 0,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							paddingBottom: "35%",
							boxSizing: "border-box",
							background: isHovered
								? "rgba(0, 0, 0, 0.4)"
								: "rgba(0, 0, 0, 0)",
							backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
							color: "#fff",
							fontWeight: "600",
							textAlign: "center",
							textTransform: "uppercase",
							letterSpacing: "0.05em",
							opacity: isHovered ? 1 : 0,
							transition: "all 300ms ease",
							pointerEvents: "none",
						}}
					>
						Edit
					</span>
					<div
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							right: 0,
							height: "35%",
							display: "flex",
							transform: isHovered
								? "translateY(0)"
								: "translateY(100%)",
							transition: "transform 300ms ease",
							borderTop: `2px solid ${active ? "#facc15" : "#9ca3af"}`,
							color: "black",
							textAlign: "center",
							pointerEvents: "none",
						}}
					>
						<div
							style={{
								flex: 1,
								background: "#00ff00",
								fontSize: "0.75rem",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "600",
								borderRight: `1px solid ${active ? "#facc15" : "#9ca3af"}`,
								paddingLeft: "1rem",
							}}
						>
							<span>WINS</span>
							<span style={{ alignSelf: "flex-end", marginRight: "0.5rem" }}>{stats.wins}</span>
						</div>

						<div
							style={{
								flex: 1,
								background: "#ffdf00",
								fontSize: "0.75rem",
								borderLeft: `1px solid ${active ? "#facc15" : "#9ca3af"}`,
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								fontWeight: "600",
								paddingRight: "1rem",
							}}
						>
							<span>DRAWS</span>
							<span style={{ alignSelf: "flex-start", marginLeft: "0.5rem" }}>{stats.draws}</span>
						</div>
					</div>
				</>
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
