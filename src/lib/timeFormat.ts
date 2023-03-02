function formatDateAmPm(date: Date): string {
	const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const weekDay = weekdays[date.getDay()];

	let hour = date.getHours();
	const isPM = hour >= 12;
	hour = hour % 12 || 12;
	const minute = String(date.getMinutes()).padStart(2, '0');
	const second = String(date.getSeconds()).padStart(2, '0');
	const period = isPM ? 'PM' : 'AM';
	return `${day}/${month}/${year} : ${weekDay} : ${hour}:${minute} ${period} `;
}

export function timeSince(timestamp: number) {
	const d: any = new Date(timestamp);
	const diff = (Date.now() - d) / 1000;
	if (diff < 60) return diff < 3 ? 'Just now' : `${Math.floor(diff)}s ago`;
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	if (diff < 172800) return 'Yesterday';
	const date = new Date(timestamp);
	return formatDateAmPm(date);
}
