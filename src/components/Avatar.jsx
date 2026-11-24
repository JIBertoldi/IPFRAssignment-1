
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

	const avatarClass = `avatar ${active ? "active" : ""}`;

	return (
		<label
			htmlFor={inputId}
			className={avatarClass}
			style={{ width, height }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<img
				src={image || defaultAvatar}
				alt="Foto de perfil"
				className="avatar-image"
			/>

			{editable && (
				<>
					<span className={`avatar-edit ${isHovered ? "visible" : ""}`}>
						Edit
					</span>

					<div className={`avatar-stats ${isHovered ? "visible" : ""}`}>
						<div className="avatar-stat wins">
							<span>WINS</span>
							<span className="stat-value">{stats.wins}</span>
						</div>

						<div className="avatar-stat draws">
							<span>DRAWS</span>
							<span className="stat-value">{stats.draws}</span>
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
