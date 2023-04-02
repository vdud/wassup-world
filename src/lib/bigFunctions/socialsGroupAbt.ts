export const copyLink = () => {
	navigator.clipboard.writeText(window.location.href);
};
export const shareViaEmail = () => {
	const subject = encodeURIComponent('Check out this link');
	const body = encodeURIComponent(`I thought you might be interested in this: ${window.location.href}`);
	window.open(`mailto:?subject=${subject}&body=${body}`);
};

export const shareViaWhatsApp = () => {
	const text = encodeURIComponent(`Wassup! check out this link of a group-chat on wassup.world, here; ${window.location.href}`);
	window.open(`https://api.whatsapp.com/send?text=${text}`);
};

export const shareViaMessageApp = () => {
	const text = encodeURIComponent(`Wassup! check out this link of a group-chat on wassup.world, here; ${window.location.href}`);
	const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

	if (isIOS) {
		window.location.href = `sms:&body=${text}`;
	} else {
		window.open(`sms:?body=${text}`);
	}
};
